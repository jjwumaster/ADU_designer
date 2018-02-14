

class CreateAdus < ActiveRecord::Migration[5.1]
  def change
    create_table :adus do |t|
      t.string :polygon

      t.timestamps
    end
  end
end
