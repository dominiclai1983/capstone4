json.order do
  json.id @order.id
  json.order_date @order.order_date
  json.shipping_date @order.shipping_date
  json.status @order.status
  json.payment_status @order.payment_status
  json.tracking_number @order.tracking_number
  json.address_1 @order.address.address_1
end
