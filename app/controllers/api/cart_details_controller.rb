class Api::CartDetailsController < ApplicationController
  def create
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)

    if session
      if !session.user.current_cart
        cart = Cart.create({ user_id: session.user.id })
        session.user.update_attribute(:current_cart, cart.id)
        id = cart.id
      else
        id = session.user.current_cart
      end
    end

    total = params[:cart_detail][:quantity] * params[:cart_detail][:price]

    begin
      @cart_detail =
        CartDetail.create(
          {
            cart_id: id,
            product_id: params[:cart_detail][:product_id],
            price: params[:cart_detail][:price],
            quantity: params[:cart_detail][:quantity],
            total: total
          }
        )
      render "api/cart_details/show", status: :created
    rescue ArgumentError => e
      render json: { error: e.message }, status: :bad_request
    end
  end

  def get_cart_details_by_cart_id
    if session
      @cart_details = CartDetail.where(cart_id: params[:cart], remove: false)
      render "api/cart_details/index", status: :ok
    else
      render json: { order_details: [] }, status: :bad_request
    end
  end

  def inactive_item_in_cart
    if session
      cart_detail = CartDetail.find_by(id: params[:cartid])
      if cart_detail.update(remove: true)
        render "api/cart_details/edit", status: :ok
      else
        render json: { success: false }
      end
    else
      render json: { success: false }
    end
  end

  def change_quantity_in_cart
    if session
      @cart_detail = CartDetail.find_by(id: params[:id])
      new_total = @cart_detail.price * params[:quantity]

      if @cart_detail.remove
        render json: { error: "Invalid Cart Item" }
      elsif @cart_detail.update(quantity: params[:quantity], total: new_total)
        render "api/cart_details/show", status: :ok
      else
        render json: { error: "Invalid Cart Item" }
      end
    else
      render json: { authenticated: false }, status: :bad_request
    end
  end

  def convert_guest_cart_to_cart
    guest_cart_id = cookies.signed[:guest_cart]

    if guest_cart_id
      guest_cart_details =
        GuestCartDetail.where(guest_cart_id: guest_cart_id, remove: false)
      #ensure the user is logged in
      if session
        cart = Cart.create({ user_id: session.user.id })
        session.user.update_attribute(:current_cart, cart.id)
        guest_cart_details.map do |item|
          cart_detail =
            CartDetail.create(
              {
                cart_id: cart.id,
                product_id: item.product_id,
                price: item.price,
                quantity: item.quantity,
                total: item.total
              }
            )
        end
        cookies.delete :guest_cart
      end
      render json: { cart_conversion: true }, status: :ok
    else
      render json: { error: "could not create cart" }, status: :bad_request
    end
  end

  private

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end

  def cart_detail_params
    params.require(:cart_detail).permit(:id, :product_id, :price, :quantity)
  end
end
