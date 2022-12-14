json.total_pages @products.total_pages
json.next_page @products.next_page

json.products do
  json.array! @products do |product|
    json.id product.id
    json.title product.title
    json.description product.description
    json.sku product.sku
    json.price product.price
    json.quantity product.quantity
    json.reserved product.reserved
    json.created_at product.created_at
    if product.attachment.attached?
      json.grid_image url_for(
                        product.attachment.variant(resize_and_pad: [650, 650])
                      )
      json.thumb url_for(product.attachment.variant(resize_and_pad: [50, 50]))
    end
  end
end
