class CartDetail < ApplicationRecord
  belongs_to :cart
  belongs_to :product

  #validates :cart, presence: true
  #validates :product, presence: true
  #validates :price, presence: true
  #validates :quantity, presence: true, numericality: { only_integer: true }
end