#this has been deprecated. keep the code to ensure the app running first
json.product_code do
  json.product_code_id @product_code.id
  json.code @product_code.code
  json.desc @product_code.desc
end
