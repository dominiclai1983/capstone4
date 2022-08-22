class AddNewCodeTable < ActiveRecord::Migration[6.1]
  def change
    create_table :codes do |t|
      t.string :code
      t.string :desc
      t.timestamps
    end
  end
end
