class Picture < ApplicationRecord
  has_one_attached :attachment

  belongs_to :product
end
