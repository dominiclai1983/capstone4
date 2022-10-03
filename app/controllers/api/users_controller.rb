class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render "api/users/create", status: :created
    else
      render json: { success: false }, status: :bad_request
    end
  end

  def index
    if params[:email]
      @user = User.find_by(email: params[:email])
      render "api/users/show", status: :ok
      return render json: { error: "not_found" }, status: :not_found if !@user
    elsif params[:username]
      @user = User.find_by(username: params[:username])
      render "api/users/show", status: :ok
      return render json: { error: "not_found" }, status: :not_found if !@user
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

  def edit_password
    if session
      @user = session.user

      if @user and @user.authenticate(params[:user][:password])
        @user.password = params[:user][:new_password]
        @user.password_confirmation = params[:user][:new_password]
        render "api/users/password" if @user.save
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
        render "api/users/remove", status: :created
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
      :password_confirmation,
      :new_password,
      :new_password_confirmation
    )
  end

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end

  def admin_session
    token = cookies.signed[:ecommerce_admin_session_token]
    admin_session = Session.find_by(token: token)
  end

  def is_admin?
    session.user.is_admin?
  end
end
