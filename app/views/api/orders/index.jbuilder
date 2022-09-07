json.orders do
  json.array! @orders do |order|
    json.id order.id
    json.order_date order.order_date
    json.status order.status
    json.order_total order.order_total
  end
end
