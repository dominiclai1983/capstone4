class AddForKeyAgain < ActiveRecord::Migration[6.1]
  def change
    add_reference :products, :code, foreign_key: true
  end
end
