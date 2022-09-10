class Api::PicturesController < ApplicationController
  def create
    @picture = Picture.new(picture_params)

    if @picture.save
      url = @picture.large_attachment_url_1
      render json: { large_attachment_url_1: url }, status: :created
    else
      render json: { success: false }, status: :bad_request
    end
  end

  private

  def picture_params
    params.require(:picture).permit(attachment: [])
  end
end
