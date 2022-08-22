class AddTablesToProject < ActiveRecord::Migration[6.1]
  def change
    create_table :guest_carts do |t|
      t.timestamps
    end

    create_table :guest_cart_details do |t|
      t.decimal :price, precision: 10, scale: 2
      t.decimal :total, precision: 10, scale: 2
      t.integer :quantity
      t.timestamps

      t.belongs_to :guest_cart, index: true, foreign_key: true
      t.belongs_to :product, index: true, foreign_key: true
    end

    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.boolean :is_admin, default: false
      t.integer :current_cart
      t.timestamps
    end

    #create_table : do |t|
    #  t.timestamps
    #end

  end
end
