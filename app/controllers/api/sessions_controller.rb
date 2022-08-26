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
end
