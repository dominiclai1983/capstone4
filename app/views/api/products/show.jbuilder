json.product do
  json.product_id @product.id
  json.title @product.title
  json.description @product.description
  json.sku @product.sku
  json.price @product.price
  json.quantity @product.quantity
  json.reserved @product.reserved
  json.product_code_id @product.product_code_id
  json.code @product_code.code
  json.desc @product_code.desc
end
