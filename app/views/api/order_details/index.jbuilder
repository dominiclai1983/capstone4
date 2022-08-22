json.order_details do
  json.array! @order_details do |order_detail|
    json.id order_detail.id
    json.price order_detail.price
    json.quantity order_detail.quantity
    json.product_id order_detail.product_id
    json.title order_detail.product.title
  end
end
