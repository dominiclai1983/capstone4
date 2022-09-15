json.guest_cart_detail do
  json.id @guest_cart_detail.id
  json.price @guest_cart_detail.price
  json.total @guest_cart_detail.total
  json.quantity @guest_cart_detail.quantity
  json.product_id @guest_cart_detail.product_id
  json.title @guest_cart_detail.product.title
  if @guest_cart_detail.product.attachment.attached?
    json.thumb url_for(
                 @guest_cart_detail.product.attachment.variant(
                   resize_and_pad: [50, 50]
                 )
               )
  else
    json.thumb nil
  end
end
