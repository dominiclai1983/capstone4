json.cart_details do
  json.array! @cart_details do |cart_detail|
    json.id cart_detail.id
    json.price cart_detail.price
    json.quantity cart_detail.quantity
    json.product_id cart_detail.product_id
    json.title cart_detail.product.title
  end
end
