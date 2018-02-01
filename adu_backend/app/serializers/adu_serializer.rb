class AduSerializer < ActiveModel::Serializer
  attributes :id, :polygon
  belongs_to :property
end
