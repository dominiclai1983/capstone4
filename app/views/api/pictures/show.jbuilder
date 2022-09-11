json.picture do
  json.id @picture.id
  if @picture.attachment.attached?
    json.image url_for(@picture.attachment)
    json.thumb url_for(@picture.attachment.variant(resize_to_limit: [100, 100]))
  end
end
