class Api::CartsController < ApplicationController
  def create
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)

    if session
      @cart = Cart.create({ user_id: session.user.id })
      session.user.update_attribute(:current_cart, @cart.id)
      render "api/carts/create", status: :created
    else
      render json: { success: false }, status: :bad_request
    end
  end
end
