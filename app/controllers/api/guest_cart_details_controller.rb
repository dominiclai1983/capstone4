class Api::GuestCartDetailsController < ApplicationController

  def create

      global_id = GlobalID::Locator.locate_signed(cookies[:guest_cart])
      #if !session[:ecommerce_cart_id]
        guest_cart = GuestCart.create
        global_id = guest_cart.to_signed_global_id
        cookies[:guest_cart] = global_id.to_s
        #session[:ecommerce_cart_id] = global_id.to_s
        #@id = guest_cart.id
      #else
        #@id = global_id
      #end

=begin
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
=end
  end


  def get_order_details_by_global_id
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