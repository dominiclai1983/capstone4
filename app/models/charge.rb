class Charge < ApplicationRecord
  belongs_to :cart

  validates :checkout_session_id, presence: true
  validates :currency, presence: true
  validates :amount, presence: true
end
