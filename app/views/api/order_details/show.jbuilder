json.order_detail do
  json.id @order_detail.id
  json.price @order_detail.price
  json.quantity @order_detail.quantity
  json.product_id @order_detail.product_id
end
