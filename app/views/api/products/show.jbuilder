json.product do
  json.product_id @product.id
  json.title @product.title
  json.description @product.description
  json.sku @product.sku
  json.price @product.price
  json.quantity @product.quantity
  json.reserved @product.reserved
  json.code_id @product.code_id
  json.code @code.code
  json.desc @code.desc
  if @product.attachment.attached?
    json.large_image url_for(
                       @product.attachment.variant(resize_and_pad: [860, 700])
                     )
  else
    json.large_image nil
  end
end
