class Api::SessionsController < ApplicationController
  #below methods are for user login
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

  #below methods are for the admin section
  def admin
    @admin = User.find_by(email: params[:user][:email])

    if @admin.is_admin and @admin.authenticate(params[:user][:password])
      session = @admin.sessions.create
      cookies.permanent.signed[:ecommerce_admin_session_token] = {
        value: session.token,
        httponly: true
      }
      render "api/sessions/create", status: :created
    else
      render json: { success: false }, status: :bad_request
    end
  end

  def admin_auth
    token = cookies.signed[:ecommerce_admin_session_token]
    admin_session = Session.find_by(token: token)

    if admin_session
      @user = admin_session.user
      render "api/sessions/authenticated", status: :ok
    else
      render json: { authenticated: false }, status: :bad_request
    end
  end

  def admin_destory
    token = cookies.signed[:ecommerce_admin_session_token]
    session = Session.find_by(token: token)

    render json: { success: true }, status: :ok if session and session.destroy
  end
end
