json.user do
  json.user_id @user.id
  json.username @user.username
  json.email @user.email
end

json.orders do
  json.array! @user.orders do |order|
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
