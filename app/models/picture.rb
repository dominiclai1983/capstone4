class Picture < ApplicationRecord
  include ActiveModel::Serializers::JSON

  has_many_attached :attachment

  def attributes
    {
      "id" => nil,
      "updated_at" => nil,
      "created_at" => nil,
      "large_attachment_url_1" => nil
    }
  end

  def large_attachment_url(picture_number)
    Rails.application.routes.url_helpers.rails_representation_url(
      attachment[picture_number].variant(resize_to_limit: [400, 400]).processed,
      only_path: true
    )
  end

  def large_attachment_url_1
    large_attachment_url(0)
  end
end
