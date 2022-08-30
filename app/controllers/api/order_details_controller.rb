class Api::OrderDetailsController < ApplicationController
  def create
    if session
      cart_details =
        CartDetail.where(cart_id: params[:cart_detail][:cartid], remove: false)
      @order =
        Order.create(
          { user_id: session.user.id, address_id: [:order][:address_id] }
        )
      cart_details.map do |item|
        order_detail =
          OrderDetail.create(
            {
              order_id: @order.id,
              product_id: item.product_id,
              quantity: item.quantity,
              total: item.total,
              price: item.price
            }
          )
      end
      render json: { order_conversion: true, order_id: @order.id }, status: :ok
    else
      render json: { authenticated: true }, status: :bad_request
    end
  end

  private

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end
end
