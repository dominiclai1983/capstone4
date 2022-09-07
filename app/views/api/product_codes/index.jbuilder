json.product_codes do
  json.array! @product_codes do |product_code|
    json.id product_code.id
    json.price product_code.price
    json.quantity product_code.quantity
    json.product_id product_code.product_id
    json.title product_code.product.title
  end
end
