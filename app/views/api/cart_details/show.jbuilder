json.cart_detail do
  json.id @cart_detail.id
  json.price @cart_detail.price
  json.quantity @cart_detail.quantity
  json.product_id @cart_detail.product_id
end
