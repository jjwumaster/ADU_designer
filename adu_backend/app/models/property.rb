class Property < ApplicationRecord
  has_many :user_properties
  has_many :users, through: :user_properties
  has_many :adus

  # validates :property_id, uniqueness: true
end
