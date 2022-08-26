class GuestCart < ApplicationRecord
  has_many :guest_cart_details
  has_many :products, through: :guest_cart_details
end
