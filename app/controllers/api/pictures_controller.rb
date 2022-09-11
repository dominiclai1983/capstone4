class Api::PicturesController < ApplicationController
  require "mini_magick"

  def create
    @picture = Picture.new(picture_params)

    if @picture.save
      render "api/pictures/show", status: :created
    else
      render json: { success: false }, status: :bad_request
    end
  end

  def index
    @picture = Picture.where(product_id: params[:id])

    if @picture
      render "api/orders/index", status: :ok
    else
      render json: { products: [] }
    end
  end

  private

  def picture_params
    params.require(:picture).permit(:product_id, :ranking, :attachment)
  end
end
