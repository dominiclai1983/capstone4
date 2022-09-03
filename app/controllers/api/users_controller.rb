class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render "api/users/create", status: :created
    else
      render json: { success: false }, status: :bad_request
    end
  end

  def show
    if session
      @user = session.user
      render "api/users/create"
    else
      render json: { success: false }, status: :bad_request
    end
  end
  #TODO: test the edit_password method
  def edit_password
    if session
      @user = session.user

      if @user and @user.authenticate(params[:user][:password])
        @user.password = BCrypt::Password.create(params[:user][:new_password])
        render "api/users/password"
      else
        render json: { success: false }, status: :bad_request
      end
    else
      render json: { success: false }, status: :bad_request
    end
  end

  def remove_current_cart
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
    order = Order.find_by(id: params[:order_id])

    if session
      @user = session.user
      if @user && @user.update_attribute(:current_cart, nil) &&
           order.update_attribute(:dispatch_confirm, true)
        puts "{ cart_removal: true, dispatch_confirm: true }"
      else
        puts "{ cart_removal: false }"
      end
    else
      puts "{ authenticated: false }"
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email,
      :password,
      :username,
      :password_confirmation
    )
  end

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end
end
