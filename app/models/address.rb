class Address < ApplicationRecord
  belongs_to :user

  validates :user, presence: true
  validates :first_name, presence: true, length: { maximum: 120 }
  validates :last_name, presence: true, length: { maximum: 120 }
  validates :phone_number, presence: true, length: { maximum: 120 }
  validates :address_1, presence: true, length: { maximum: 120 }
  validates :district, presence: true, length: { maximum: 120 }
  validates :region, presence: true, length: { maximum: 120 }
end