class Api::PicturesController < ApplicationController
=begin 
  def create
    @picture = Picture.create(picture_params)

    if @picture.save
      render "api/pictures/show", status: :created
    else
      render json: { success: false }, status: :bad_request
    end
  end
=end
  def create
    image = MiniMagick::Image.new(params[:attachment])
    image.resize "400x400"
    @picture = Picture.create()
    @picture.attachments.attach(image)
    if @picture.save
      render "api/pictures/show", status: :created
    else
      render json: { success: false }, status: :bad_request
    end
  end
  def show
  end

  private

  def picture_params
    params.require(:picture).permit(:attachment)
  end
end
