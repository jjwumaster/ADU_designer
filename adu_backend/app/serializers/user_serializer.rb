class UserSerializer < ActiveModel::Serializer
  attributes :id, :email
  has_many :properties
  has_many :adus, through: :properties
end
