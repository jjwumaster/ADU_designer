class PropertySerializer < ActiveModel::Serializer
  attributes :id, :portland_id, :address
  has_many :adus
  has_many :user_properties
  has_many :users, through: :user_properties
end
