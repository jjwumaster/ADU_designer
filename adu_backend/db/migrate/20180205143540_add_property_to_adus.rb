class AddPropertyToAdus < ActiveRecord::Migration[5.1]
  def change
    add_reference :adus, :property, foreign_key: true
  end
end
