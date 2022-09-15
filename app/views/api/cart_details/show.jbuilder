json.cart_detail do
  json.id @cart_detail.id
  json.price @cart_detail.price
  json.total @cart_detail.total
  json.quantity @cart_detail.quantity
  json.product_id @cart_detail.product_id
  json.title @cart_detail.product.title
  if @cart_detail.product.attachment.attached?
    json.thumb url_for(
                 @cart_detail.product.attachment.variant(
                   resize_and_pad: [50, 50]
                 )
               )
  else
    json.thumb nil
  end
end
