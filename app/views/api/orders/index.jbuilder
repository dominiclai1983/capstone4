json.total_pages @orders.total_pages
json.next_page @orders.next_page

json.orders do
  json.array! @orders do |order|
    json.id order.id
    json.order_date order.order_date
    json.order_details do
      json.array! order.order_details do |order_detail|
        json.order_details_id order_detail.id
        json.title order_detail.product.title
        json.sku order_detail.product.sku
        if order_detail.product.attachment.attached?
          json.thumb url_for(
                       order_detail.product.attachment.variant(
                         resize_and_pad: [50, 50]
                       )
                     )
        else
          json.thumb nil
        end
        json.price order_detail.price
        json.total order_detail.total
        json.quantity order_detail.quantity
        json.remove order_detail.remove
      end
    end
    json.status order.status
    json.order_total order.order_total
    json.tracking_number order.tracking_number
    json.shipping_fee order.shipping_fee
    json.order_total order.order_total
    json.address_1 order.address.address_1
  end
end
