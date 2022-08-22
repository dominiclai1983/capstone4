json.orders do
  json.array! @orders do |order|
    json.id order.id
    json.order_date order.order_date
    json.status order.status
    json.shipping_date order.shipping_date
    json.tracking_number order.tracking_number
  end
end
