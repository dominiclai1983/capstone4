class OrderDetail < ApplicationRecord
  belongs_to :order
  belongs_to :product

  validates :order, presence: true
  validates :product, presence: true
  validates :price, presence: true
  validates :quantity, presence: true, numericality: { only_integer: true }
end
