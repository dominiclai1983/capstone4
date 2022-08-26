class GuestCartDetail < ApplicationRecord
  belongs_to :guest_cart
  belongs_to :product
end
