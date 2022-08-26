class User < ApplicationRecord
  has_many :sessions
  has_many :orders
  has_many :addresses
  has_one :carts

  has_secure_password
  #remember to make the proper association. otherwise, it would not be able to read.

  validates :username, presence: true, length: { minimum: 3, maximum: 64 }
  validates :password, presence: true, length: { minimum: 8, maximum: 64 }
  validates :email, presence: true, length: { minimum: 5, maximum: 500 }

  validates_uniqueness_of :username
  validates_uniqueness_of :email
end
