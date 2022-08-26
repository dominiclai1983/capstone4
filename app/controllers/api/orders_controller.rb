class Api::OrdersController < ApplicationController
  def create
    if !session
      return render json: { error: "user not logged in" }, status: :unauthorized
    end

    if !session.user.current_order
      @order = Order.create({ user_id: session.user.id })
    else
      @order = session.user.current_order
    end

    if @order.save
      session.user.update_attribute(:current_order, @order.id)
      render "api/orders/create", status: :created
    else
      render json: { success: false }, status: :bad_request
    end
  end

  def index
    if session
      @orders = session.user.orders
      render "api/orders/index"
    else
      render json: { orders: [] }
    end
  end

  def edit_order_by_order_id
    if session and is_admin?
      @order = Order.find_by(id: params[:id])

      if !@order.status and @order.update(order_params)
        render "api/orders/show", status: :ok
      else
        render json: { order: [] }
      end
    else
      render json: { order: [] }
    end
  end

  def report_tracking_number_by_order_id
    if session and is_admin?
      @order = Order.find(params[:id])
      #status = @order.status
      #payment_status = @order.payment_status

      #if !status and

      now = DateTime.current

      if @order.update(
           {
             tracking_number: params[:order][:tracking_number],
             status: true,
             shipping_date: now
           }
         )
        render "api/orders/show", status: :ok
      else
        render json: { order: [] }
      end
    else
      render json: { order: [] }
    end
  end

  #TODO: deduct shipping quantity method

  private

  def order_params
    params.require(:order).permit()
  end

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end

  def is_admin?
    session.user.is_admin?
  end
end
