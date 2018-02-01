class CreateProperties < ActiveRecord::Migration[5.1]
  def change
    create_table :properties do |t|
      t.string :name
      t.string :address
      t.string :city
      t.integer :zip
      t.float :lat
      t.float :long
      t.timestamps
    end
  end
end
