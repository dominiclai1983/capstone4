class AddKeyToProduct < ActiveRecord::Migration[6.1]
  def change
    add_reference :products, :product_code, foreign_key: true
  end
end
