class Order < ApplicationRecord
  belongs_to :user
  belongs_to :address
  belongs_to :charge

  has_many :order_details
  has_many :products, through: :order_details
end
