json.guest_cart_details do
  json.array! @guest_cart_details do |guest_cart_detail|
    json.id guest_cart_detail.id
    json.price guest_cart_detail.price
    json.quantity guest_cart_detail.quantity
    json.product_id guest_cart_detail.product_id
    json.title guest_cart_detail.product.title
  end
end