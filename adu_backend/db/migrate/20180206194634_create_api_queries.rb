class CreateApiQueries < ActiveRecord::Migration[5.1]
  def change
    create_table :api_queries do |t|

      t.timestamps
    end
  end
end
