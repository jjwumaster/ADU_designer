class PropertySerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :city, :zip, :lat, :long
  has_many :adus
  belongs_to :user
end
