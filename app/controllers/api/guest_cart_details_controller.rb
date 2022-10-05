class Api::GuestCartDetailsController < ApplicationController
  def create
    if session
      #check session is login or not to ensure the user is NOT login
      render json: { authenticated: true }, status: :bad_request
    else
      id = cookies.signed[:guest_cart]

      if !id
        guest_cart = GuestCart.create
        cookies.signed[:guest_cart] = { value: guest_cart.id, expires: 30.days }
        id = guest_cart.id
      end
    end

    total =
      params[:guest_cart_detail][:quantity] * params[:guest_cart_detail][:price]

    begin
      @guest_cart_detail =
        GuestCartDetail.create(
          {
            guest_cart_id: id,
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

  def get_guest_cart_details_by_cart_id
    id = cookies.signed[:guest_cart]
    #ensure the guest_cart is still active
    #guest_cart = GuestCart.find(id)
    if !id
      @guest_cart_details =
        GuestCartDetail.where(guest_cart_id: id, remove: false)
      render "api/guest_cart_details/index", status: :ok
    else
      render json: { guest_cart_details: [] }, status: :bad_request
    end
  end

  def inactive_item_in_guest_cart
    if session
      #check session is login or not to ensure the user to not login
      render json: { authenticated: true }, status: :bad_request
    else
      guest_cart_detail = GuestCartDetail.find_by(id: params[:cartid])
      if guest_cart_detail.update(remove: true)
        render "api/guest_cart_details/edit", status: :ok
      else
        render json: { success: false }
      end
    end
  end

  def change_quantity_in_guest_cart
    @guest_cart_detail = GuestCartDetail.find_by(id: params[:id])
    new_total = @guest_cart_detail.price.to_f * params[:quantity]

    if @guest_cart_detail.remove
      render json: { error: "Invalid Cart Item" }
    elsif @guest_cart_detail.update(
          quantity: params[:quantity],
          total: new_total
        )
      render "api/guest_cart_details/show", status: :ok
    else
      render json: { error: "Invalid Cart Item" }
    end
  end

  private

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end

  def cart_detail_params
    params.require(:guest_cart_detail).permit(
      :id,
      :product_id,
      :price,
      :quantity
    )
  end
end
