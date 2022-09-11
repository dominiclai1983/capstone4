json.picture do
  json.id @picture.id
  if @picture.attachments.attached?
    json.image url_for(@picture.attachments[0])
    json.thumb url_for(@picture.attachments[0].variant(:thumb).processed)
  end
end
