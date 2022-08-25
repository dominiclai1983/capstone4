json.guest_cart_detail do
  json.id @guest_cart_detail.id
  json.price @guest_cart_detail.price
  json.quantity @guest_cart_detail.quantity
  json.product_id @guest_cart_detail.product_id
  json.title @guest_cart_detail.product.title
end
