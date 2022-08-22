class Api::CartDetailsController < ApplicationController
  #the following is good code for login
  def create
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)

    if session
      if !session.user.current_cart
        @cart = Cart.create({ user_id: session.user.id })
        session.user.update_attribute(:current_cart, @cart.id)
        @id = @cart.id
      else
        @id = session.user.current_cart
      end
    end

    total = params[:cart_detail][:quantity] * params[:cart_detail][:price]

    begin
      @cart_detail =
        CartDetail.create(
          {
            cart_id: @id,
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

  def get_order_details_by_cart_id
    if session
      @order_details = CartDetail.where(cart_id: params[:cart])
      render "api/cart_details/index", status: :ok
    else
      render json: { order_details: [] }
    end 
  end

  private

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end

  def cart_detail_params
    params.require(:cart_detail).permit(:product_id, :price, :quantity)
  end

  def current_cart?
    session.user.current_cart?
  end
end