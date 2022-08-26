class AddRemoveColOnAddress < ActiveRecord::Migration[6.1]
  def change
    add_column :addresses, :remove, :boolean, :default => false
    add_reference :orders, :address, index: true
  end
end
