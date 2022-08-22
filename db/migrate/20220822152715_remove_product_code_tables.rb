class RemoveProductCodeTables < ActiveRecord::Migration[6.1]
  def change
    drop_table :product_codes
  end
end
