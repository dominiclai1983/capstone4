json.users do
  json.array! @users do |user|
    json.id order.id
    json.order_date order.order_date
    json.status order.status
    json.order_total order.order_total
    json.tracking_number order.tracking_number
    json.shipping_fee order.shipping_fee
    json.order_total order.order_total
    json.address_1 order.address.address_1
  end
end
