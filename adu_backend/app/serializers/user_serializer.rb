class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest
  has_many :properties
  has_many :adus, through: :properties
end
