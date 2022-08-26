json.address do
  json.id @address.id
  json.firstName @address.first_name
  json.lastName @address.last_name
  json.billingEmail @address.billing_email
  json.phoneNumber @address.phone_number
  json.address1 @address.address_1
  json.address2 @address.address_2
  json.district @address.district
  json.region @address.region
  json.isBilling @address.is_billing
end
