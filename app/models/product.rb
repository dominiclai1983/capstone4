class Product < ApplicationRecord
  has_one_attached :image do |attachable|
    attachable.variant :thumb, resize_to_limit: [300, 300]
  end

  has_one :code

  validates_uniqueness_of :sku

  validates :title, presence: true, length: { minimum: 3, maximum: 208 }
  validates :description, presence: true, length: { minimum: 8, maximum: 500 }
  validates :sku, presence: true, length: { minimum: 1, maximum: 64 }
  validates :price,
            presence: true,
            numericality: {
              greater_than_or_equal_to: 0
            },
            format: {
              with: /\A\d{1,3}(\.\d{1,2})?\z/
            }
  validates :quantity,
            presence: true,
            numericality: {
              greater_than_or_equal_to: 0
            }
end