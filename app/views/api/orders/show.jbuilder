json.order do
  json.order_id @order.id
  json.order_date @order.order_date
  json.status @order.status
  json.shipping_date @order.shipping_date
  json.tracking_number @order.tracking_number
  json.recipient_name @order.recipient_name
  json.shipping_address_1 @order.shipping_address_1
  json.shipping_address_2 @order.shipping_address_2
  json.postal_code @order.postal_code
  json.city @order.city
  json.country @order.country
  json.phone_number @order.phone_number
  json.payment_status @order.payment_status
end
