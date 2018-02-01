class User < ApplicationRecord
  has_many :properties
  has_many :adus, through: :properties
end
