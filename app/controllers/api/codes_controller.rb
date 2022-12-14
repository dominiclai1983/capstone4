class Api::CodesController < ApplicationController
  #this controller is about the product code
  def create
    if session and is_admin?
      @code = ProductCode.new(code_params)
      if @code.save
        render "/api/code/create", status: :ok
      else
        render json: { codes: [] }
      end
    else
      render json: { codes: [] }
    end
  end

  def find_product_code_by_desc
    @code = Code.find_by(desc: params[:desc])
    return render json: { error: "not_found" }, status: :not_found if !@code
    render "api/codes/show", status: :ok
  end

  def index
    @codes = Code.all
    return render json: { error: "not_found" }, status: :not_found if !@codes
    render "api/codes/index", status: :ok
  end

  private

  def code_params
    params.require(:code).permit(:code, :desc)
  end

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end

  def is_admin?
    session.user.is_admin?
  end
end
