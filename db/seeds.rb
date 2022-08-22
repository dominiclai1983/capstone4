# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

product_codes =
  ProductCode.create(
    [{ code: "A101", desc: "Bracelet" }, { code: "A102", desc: "Earrings" }]
  )

products =
  Product.create(
    [
      {
        title: "A Large Bracelet",
        description: "A Large Bracelet",
        sku: "B101",
        price: 19.33,
        quantity: 20,
        product_code_id: 1
      },
      {
        title: "A Medium Bracelet",
        description: "A Medium Bracelet",
        sku: "B102",
        price: 16.55,
        quantity: 40,
        product_code_id: 1
      },
      {
        title: "A Small Bracelet",
        description: "A Small Bracelet",
        sku: "B103",
        price: 13.44,
        quantity: 40,
        product_code_id: 1
      }
    ]
  )
  users =
  User.create(
    [
      {
        username: "test",
        email: "test@test.com",
        password: "password",
        password_confirmation: "password",
        is_admin: true
      },
      {
        username: "mimi",
        email: "mimi@test.com",
        password: "password",
        password_confirmation: "password",
        is_admin: true
      },
      {
        username: "kiki",
        email: "kiki@test.com",
        password: "password",
        password_confirmation: "password",
        is_admin: true
      }
    ]
  )
