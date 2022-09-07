json.codes do
  json.array! @codes do |code|
    json.id code.id
    json.code code.code
    json.desc code.desc
  end
end
