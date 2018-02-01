class Property < ApplicationRecord
  belongs_to :user
  has_many :Adus
end
