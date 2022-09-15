class AddAllTablesAtOnce < ActiveRecord::Migration[6.1]
  def change
    create_table :guest_carts do |t|
      t.boolean :remove, default: false
      t.timestamps
    end

    create_table :guest_cart_details do |t|
      t.decimal :price, precision: 10, scale: 2
      t.decimal :total, precision: 10, scale: 2
      t.integer :quantity
      t.boolean :remove, default: false
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

    create_table :sessions do |t|
      t.string :token
      t.belongs_to :user, index: true, foreign_key: true
      t.timestamps
    end

    create_table :codes do |t|
      t.string :code
      t.string :desc
      t.timestamps
    end

    create_table :products do |t|
      t.string :title
      t.string :description
      t.string :sku
      t.decimal :price, precision: 10, scale: 2
      t.integer :quantity
      t.integer :available
      t.integer :reserved
      t.belongs_to :code, index: true, foreign_key: true
      t.timestamps
    end

    create_table :orders do |t|
      t.datetime :order_date
      t.datetime :shipping_date
      t.boolean :status, default: false
      t.boolean :payment_status, default: false
      t.boolean :dispatch_confirm, default: false
      t.string :tracking_number
      t.decimal :shipping_fee, precision: 10, scale: 2
      t.decimal :order_total, precision: 10, scale: 2
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :address, index: true, foreign_key: true
      t.belongs_to :charge, index: true, foreign_key: true
      t.timestamps
    end

    create_table :order_details do |t|
      t.decimal :price, precision: 10, scale: 2
      t.decimal :total, precision: 10, scale: 2
      t.integer :quantity
      t.boolean :remove, default: true
      t.belongs_to :order, index: true, foreign_key: true
      t.belongs_to :product, index: true, foreign_key: true
      t.timestamps
    end

    create_table :charges do |t|
      t.string :checkout_session_id
      t.string :currency
      t.decimal :amount
      t.boolean :complete, default: false
      t.belongs_to :cart, index: true, foreign_key: true
      t.timestamps
    end

    create_table :carts do |t|
      t.boolean :remove, default: false
      t.belongs_to :user, index: true, foreign_key: true
      t.timestamps
    end

    create_table :cart_details do |t|
      t.decimal :price, precision: 10, scale: 2
      t.decimal :total, precision: 10, scale: 2
      t.integer :quantity
      t.boolean :remove, default: false
      t.timestamps
      t.belongs_to :cart, index: true, foreign_key: true
      t.belongs_to :product, index: true, foreign_key: true
    end

    create_table :addresses do |t|
      t.string :first_name
      t.string :last_name
      t.string :billing_email
      t.string :phone_number
      t.string :address_1
      t.string :address_2
      t.string :district
      t.string :region
      t.boolean :is_billing
      t.boolean :remove, default: false
      t.belongs_to :user, index: true, foreign_key: true
      t.timestamps
    end
  end
end
