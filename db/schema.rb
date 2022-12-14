# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_09_10_045657) do

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.integer "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "billing_email"
    t.string "phone_number"
    t.string "address_1"
    t.string "address_2"
    t.string "district"
    t.string "region"
    t.boolean "is_billing"
    t.boolean "remove", default: false
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_addresses_on_user_id"
  end

  create_table "cart_details", force: :cascade do |t|
    t.decimal "price", precision: 10, scale: 2
    t.decimal "total", precision: 10, scale: 2
    t.integer "quantity"
    t.boolean "remove", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "cart_id"
    t.integer "product_id"
    t.index ["cart_id"], name: "index_cart_details_on_cart_id"
    t.index ["product_id"], name: "index_cart_details_on_product_id"
  end

  create_table "carts", force: :cascade do |t|
    t.boolean "remove", default: false
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_carts_on_user_id"
  end

  create_table "charges", force: :cascade do |t|
    t.string "checkout_session_id"
    t.string "currency"
    t.decimal "amount"
    t.boolean "complete", default: false
    t.integer "cart_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["cart_id"], name: "index_charges_on_cart_id"
  end

  create_table "codes", force: :cascade do |t|
    t.string "code"
    t.string "desc"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "guest_cart_details", force: :cascade do |t|
    t.decimal "price", precision: 10, scale: 2
    t.decimal "total", precision: 10, scale: 2
    t.integer "quantity"
    t.boolean "remove", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "guest_cart_id"
    t.integer "product_id"
    t.index ["guest_cart_id"], name: "index_guest_cart_details_on_guest_cart_id"
    t.index ["product_id"], name: "index_guest_cart_details_on_product_id"
  end

  create_table "guest_carts", force: :cascade do |t|
    t.boolean "remove", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "order_details", force: :cascade do |t|
    t.decimal "price", precision: 10, scale: 2
    t.decimal "total", precision: 10, scale: 2
    t.integer "quantity"
    t.boolean "remove", default: true
    t.integer "order_id"
    t.integer "product_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_order_details_on_order_id"
    t.index ["product_id"], name: "index_order_details_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.datetime "order_date"
    t.datetime "shipping_date"
    t.boolean "status", default: false
    t.boolean "payment_status", default: false
    t.boolean "dispatch_confirm", default: false
    t.string "tracking_number"
    t.decimal "shipping_fee", precision: 10, scale: 2
    t.decimal "order_total", precision: 10, scale: 2
    t.integer "user_id"
    t.integer "address_id"
    t.integer "charge_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["address_id"], name: "index_orders_on_address_id"
    t.index ["charge_id"], name: "index_orders_on_charge_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "sku"
    t.decimal "price", precision: 10, scale: 2
    t.integer "quantity"
    t.integer "available"
    t.integer "reserved"
    t.integer "code_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["code_id"], name: "index_products_on_code_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "token"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.boolean "is_admin", default: false
    t.integer "current_cart"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "addresses", "users"
  add_foreign_key "cart_details", "carts"
  add_foreign_key "cart_details", "products"
  add_foreign_key "carts", "users"
  add_foreign_key "charges", "carts"
  add_foreign_key "guest_cart_details", "guest_carts"
  add_foreign_key "guest_cart_details", "products"
  add_foreign_key "order_details", "orders"
  add_foreign_key "order_details", "products"
  add_foreign_key "orders", "addresses"
  add_foreign_key "orders", "charges"
  add_foreign_key "orders", "users"
  add_foreign_key "products", "codes"
  add_foreign_key "sessions", "users"
end
