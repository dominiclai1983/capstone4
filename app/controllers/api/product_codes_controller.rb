class Api::ProductCodesController < ApplicationController
  #this has been deprecated. keep the file to ensure the app would run first!
  def create
    if session and is_admin?
      @product_code = ProductCode.new(product_code_params)
      if @product_code.save
        render "/api/product_code/create", status: :ok
      else
        render json: { product_codes: [] }
      end
    else
      render json: { product_codes: [] }
    end
  end

  def index
    @product_codes = ProductCode.all
    if !!@product_codes
      return render json: { error: "not_found" }, status: :not_found
    end
    render "api/product_codes/index", status: :ok
  end

  def find_product_code_by_desc
    @product_code = ProductCode.find_by(desc: params[:desc])
    if !@product_code
      return render json: { error: "not_found" }, status: :not_found
    end

    render "api/product_codes/show", status: :ok
  end

  private

  def product_code_params
    params.require(:product_code).permit(:code, :desc)
  end

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end

  def is_admin?
    session.user.is_admin?
  end
end
