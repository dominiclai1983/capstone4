json.cart_detail do
  json.price @cart_detail.price
  json.quantity @cart_detail.quantity
  json.product_id @cart_detail.product_id
  json.title @cart_detail.product.title
end
