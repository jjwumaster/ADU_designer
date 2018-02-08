class User < ApplicationRecord

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  has_secure_password

  has_many :properties
  has_many :adus, through: :properties
end
