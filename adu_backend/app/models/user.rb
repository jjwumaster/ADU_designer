class User < ApplicationRecord

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  has_secure_password

  has_many :user_properties
  has_many :properties, through: :user_properties
  has_many :adus, through: :properties
end
