class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:user][:email])

    if @user and @user.authenticate(params[:user][:password])
      session = @user.sessions.create
      cookies.permanent.signed[:ecommerce_session_token] = {
        value: session.token,
        httponly: true
      }
      render "api/sessions/create", status: :created
    else
      render json: { success: false }, status: :bad_request
    end


  end

  def authenticated
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)

    if session
      @user = session.user
      render "api/sessions/authenticated", status: :ok
    else
      render json: { authenticated: false }, status: :bad_request
    end

  end

  def destroy
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)

    render json: { success: true }, status: :ok if session and session.destroy
  end

  private

=begin
  def convert_guest_cart_to_cart
    @id = cookies.signed[:guest_cart]

    if @id?
      @guest_cart_details = GuestCartDetail.where(guest_cart_id: @id)
      @cart = Cart.create({ user_id: session.user.id })
      session.user.update_attribute(:current_cart, @cart.id)
      @cart_details = @guest_cart_details.map do |item|
        CartDetail.new(
          {
            cart_id: @cart.id,
            product_id: item.product_id,
            price: item.price,
            quantity: item.quantity,
            total: item.total
          }
        )
      end
      if @cart_details.save
        render 'api/cart_details/index', status: :created
      else
        render json: {
          error: "cannot change cart"
        },
        status: :bad_request
      end
    else
      render json: {
        error: "cannot change cart"
      },
      status: :bad_request
    end
  end
=end
end