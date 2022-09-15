class Api::ProductsController < ApplicationController
  def index
    #keep this one for the list of product. DO NIT MIX UP THE ROUTE ANYMORE!
    if params[:query]
      @products =
        Product
          .where("title LIKE ?", "%" + params[:query] + "%")
          .page(params[:page])
          .per(6)
      render "api/products/index", status: :ok
    else
      @products = Product.order(created_at: :desc).page(params[:page]).per(6)
      render "api/products/index", status: :ok
      if !@products
        return render json: { error: "not_found" }, status: :not_found
      end
    end
  end

  def show
    #keep this one for single product. DO NOT MIX UP THE ROUTE ANYMOR!
    @product = Product.find_by(sku: params[:sku])
    @code = Code.find(@product.code_id)
    return render json: { error: "not_found" }, status: :not_found if !@product

    render "api/products/show", status: :ok
  end

  def find_product_by_product_code
    @products =
      Product
        .joins(:code)
        .where(code: { desc: params[:category] })
        .page(params[:page])
        .per(6)
    if !@products
      return(render json: { error: "not_found" }, status: :not_found)
    end
    render "api/products/index", status: :ok
  end

  def create
    #if session and is_admin?
    @product = Product.new(product_params)

    if @product.save
      render "api/products/create", status: :ok
    else
      render json: { products: [] }
    end
    #else
    #  render json: { products: [] }
    #end
  end

  def edit_by_sku
    if session and is_admin?
      @product = Product.find_by(sku: params[:sku])

      if @product and @product.update(product_params)
        render "api/products/show"
      else
        render json: { success: false }
      end
    else
      render json: { success: false }
    end
  end

  private

  def product_params
    params.require(:product).permit(
      :title,
      :description,
      :sku,
      :price,
      :quantity,
      :code_id,
      :attachment
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
