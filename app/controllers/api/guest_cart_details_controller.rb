class Api::GuestCartDetailsController < ApplicationController

  def create
    @id = cookies.signed[:guest_cart]

    if !@id
      guest_cart = GuestCart.create
      cookies.signed[:guest_cart] = {value: guest_cart.id, expires: 30.days}
      @id = guest_cart.id
    end

    total = params[:guest_cart_detail][:quantity] * params[:guest_cart_detail][:price]

    begin
      @guest_cart_detail =
        GuestCartDetail.create(
          {
            guest_cart_id: @id,
            product_id: params[:guest_cart_detail][:product_id],
            price: params[:guest_cart_detail][:price],
            quantity: params[:guest_cart_detail][:quantity],
            total: total
          }
        )
      render "api/guest_cart_details/show", status: :created
    rescue ArgumentError => e
      render json: { error: e.message }, status: :bad_request
    end

  end

#TODO: this is not a completed method. we just extract the order id from cookies. 
  def get_order_details_by_global_id
    @id = cookies.signed[:guest_cart]

    if @id
      @guest_cart_details = GuestCartDetail.where(guest_cart_id: @id)
      render "api/guest_cart_details/index", status: :ok
    else
      render json: { authenticated: false }, status: :bad_request
    end
  end

  private

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end

  def cart_detail_params
    params.require(:guest_cart_detail).permit(:product_id, :price, :quantity)
  end
end