class Api::ChargesController < ApplicationController
  skip_before_action :verify_authenticity_token,
                     only: %i[mark_complete mark_complete_intent]

  #this controller consisted both checkout session and payment intent from stripe

  def create
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
    if !session
      return(
        render json: { error: "user not logged in" }, status: :unauthorized
      )
    end

    order_details = OrderDetail.where(order_id: params[:id])
    if !order_details
      return render json: { error: "cannot find order" }, status: :not_found
    end

    total = (order_details.sum(:total) * 100).to_i
    mark_status

    session =
      Stripe::Checkout::Session.create(
        payment_method_types: ["card"],
        line_items: [
          {
            name: "Payment for Order#{params[:id]}",
            description: "Your payment for Order#{params[:id]} on the site.",
            amount: total, # amount in cents
            currency: "EUR",
            quantity: 1
          }
        ],
        success_url: "#{ENV["URL"]}/checkout/#{params[:id]}/success",
        cancel_url: "#{ENV["URL"]}#{params[:cancel_url]}"
      )

    order = Order.find_by(id: params[:id])

    @charge =
      order.charges.new(
        { checkout_session_id: session.id, currency: "EUR", amount: total }
      )

    if @charge.save
      render "api/charges/create", status: :created
    else
      render json: {
               error: "charge could not be created"
             },
             status: :bad_request
    end
  end

  def mark_complete
    # You can find your endpoint's secret in your webhook settings
    endpoint_secret = ENV["STRIPE_MARK_COMPLETE_WEBHOOK_SIGNING_SECRET"]
    payload = request.body.read
    event = nil
    # Verify webhook signature and extract the event
    # See https://stripe.com/docs/webhooks/signatures for more information.
    sig_header = request.env["HTTP_STRIPE_SIGNATURE"]
    begin
      event =
        Stripe::Webhook.construct_event(payload, sig_header, endpoint_secret)
    rescue JSON::ParserError => e
      # Invalid payload
      return head :bad_request
    rescue Stripe::SignatureVerificationError => e
      # Invalid signature
      return head :bad_request
    end
    # Handle the checkout.session.completed event
    if event["type"] == "checkout.session.completed"
      session = event["data"]["object"]
      # Fulfill the purchase, mark related charge as complete
      charge = Charge.find_by(checkout_session_id: session.id)
      return head :bad_request if !charge #|| !order_details
      charge.update({ complete: true })
      mark_payment_state
      mark_reserved
      mark_current_order
      return head :ok
    end
    return head :bad_request
  end

  def create_intent
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
    #Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
    if !session
      return(
        render json: { error: "user not logged in" }, status: :unauthorized
      )
    end

    data = JSON.parse(request.body.read)

    cart_details =
      CartDetail.where(cart_id: data["metadata"]["cart_id"], remove: false)
    if !cart_details
      return render json: { error: "cannot find cart" }, status: :not_found
    end
    total =
      (cart_details.sum(:total) * 100).to_i +
        (data["metadata"]["shipping_fee"] * 100).to_i

    payment_intent =
      Stripe::PaymentIntent.create(
        amount: total,
        currency: "HKD",
        automatic_payment_methods: {
          enabled: true
        },
        metadata: data["metadata"]
      )

    @charge =
      Charge.new(
        {
          checkout_session_id: payment_intent["client_secret"],
          cart_id: data["metadata"]["cart_id"],
          currency: "HKD",
          amount: total
        }
      )

    if @charge.save
      render "api/charges/create", status: :created
    else
      render json: {
               error: "charge could not be created"
             },
             status: :bad_request
    end
  end

  def mark_complete_intent
    endpoint_secret = ENV["STRIPE_MARK_COMPLETE_WEBHOOK_SIGNING_SECRET"]
    payload = request.body.read
    event = nil

    begin
      event =
        Stripe::Event.construct_from(JSON.parse(payload, symbolize_names: true))
    rescue JSON::ParserError => e
      # Invalid payload
      puts "⚠️  Webhook error while parsing basic request. #{e.message})"
      status 400
      return
    end

    # Check if webhook signing is configured.
    if endpoint_secret
      # Retrieve the event by verifying the signature using the raw body and secret.
      signature = request.env["HTTP_STRIPE_SIGNATURE"]
      begin
        event =
          Stripe::Webhook.construct_event(payload, signature, endpoint_secret)
      rescue Stripe::SignatureVerificationError
        puts "⚠️  Webhook signature verification failed. #{err.message})"
        status 400
      end
    end

    if event["type"] == "payment_intent.succeeded"
      payment_intent = event.data.object
      puts payment_intent
      metadata = payment_intent["metadata"]

      charge = Charge.find_by(checkout_session_id: payment_intent.client_secret)
      charge.update_attribute(:complete, true)
      charge.cart.update_attribute(:remove, true)

      #create an order
      @order =
        Order.create(
          {
            order_date: DateTime.now,
            status: true,
            payment_status: true,
            user_id: charge.cart.user.id,
            address_id: metadata["address_id"],
            shipping_fee: metadata["shipping_fee"],
            charge_id: charge.id,
            order_total: charge.amount
          }
        )
      #convert the cart line items into order line items
      cart_details =
        CartDetail.where(cart_id: metadata["cart_id"], remove: false)
      cart_details.map do |item|
        order_detail =
          OrderDetail.create(
            {
              order_id: @order.id,
              product_id: item.product_id,
              price: item.price,
              quantity: item.quantity,
              total: item.total
            }
          )
        #change the product quantity
        product = Product.find_by(id: item.product_id)
        new_reserved = (product.reserved.to_i + item.quantity.to_i)
        #ruby treats + is concatenation if not specific the variable is interger
        product.update_attribute(:reserved, new_reserved)
        new_available = product.quantity - new_reserved
        product.update_attribute(:available, new_available)
      end
      render json: { order_creation: "success" }
    else
      render json: { error: "cannot create order" }, status: :bad_request
    end
  end

  def get_charge_by_client_secret
    if !session
      return(
        render json: { error: "user not logged in" }, status: :unauthorized
      )
    end
    charge = Charge.find_by(checkout_session_id: params[:checkout_session_id])
    @order = Order.find_by(charge_id: charge.id)
    if @order
      render "api/orders/show", status: :created
    else
      render json: { error: "cannot find order" }, status: :bad_request
    end
  end

  private

  def mark_status
    order = Order.find(params[:id].to_i)
    order.update_attribute(:status, true)
  end

  def mark_payment_state
    order = Order.find(params[:id].to_i)
    order.update_attribute(:payment_status, true)
  end

  def mark_reserved
    order_details = OrderDetail.where(order_id: params[:id])
    order_details.map do |item|
      reserved = item.product.reserved + item.quantity
      item.product.update_attribute(:reserved, reserved)
    end
  end

  def mark_current_order
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)

    if session
      @user = session.user
      @user.update_attribute(:current_order, nil)
    end
  end
end
