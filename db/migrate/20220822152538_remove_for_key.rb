class RemoveForKey < ActiveRecord::Migration[6.1]
  def change
    remove_reference :products, :product_code, foreign_key: true
  end
end
