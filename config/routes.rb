Rails.application.routes.draw do
  root to: "static_pages#index"

  get "/login"                => "static_pages#index"
  get "/signup"               => "static_pages#index"
  get "/bracelet"             => "static_pages#index"
  get "/earrings"             => "static_pages#index"
  get "/product/:sku"         => "static_pages#index"
  get "/account"              => "static_pages#index"
  get "/cart"                 => "static_pages#index"

  get "/checkout"             => "static_pages#checkout"
  get "/checkout/final"       => "static_pages#checkout"
  get "/checkout/payment"     => "static_pages#checkout"
  get "/checkout/success"     => "static_pages#checkout"

  get "/account"              => "static_pages#index"

  get "/admin"                => "static_pages#admin"
  get "/admin/home"           => "static_pages#admin"
  get "/admin/home/customer"  => "static_pages#admin"

  namespace :api do
    resources :users, only: %i[create index]
    resources :order_details, only: [:create]
    #prettier auto format
    #including a .prettierignore to opt out a file

    #charge api
    post "/charges/mark_complete"       => "charges#mark_complete"
    post "/charges"                     => "charges#create"

    post "/charges_intent/mark_complete" => "charges#mark_complete_intent"
    post "/charges_intent"               => "charges#create_intent"
    get "/charges_intent"                => "charges#get_charge_by_client_secret"

    #order_detail api
    post "/order_details"           => "order_details#create"
    get "/order_details/:order"     => "order_details#get_order_details_by_order_id"

    #cart api
    get "/carts"                    => "carts#create"

    #cart_detail api
    post "/cart_details"            => "cart_details#create"
    get "/cart_details/:cart"       => "cart_details#get_cart_details_by_cart_id"
    put "/cart_details/:cartid"     => "cart_details#inactive_item_in_cart"
    put "/cart_details_quantity"    => "cart_details#change_quantity_in_cart"
    get "/conversion"               => "cart_details#convert_guest_cart_to_cart"

    #guest_cart_detail api
    post "/guest_cart_details"          => "guest_cart_details#create"
    get "/guest_cart_details"           => "guest_cart_details#get_guest_cart_details_by_cart_id"
    put "/guest_cart_details/:cartid"   => "guest_cart_details#inactive_item_in_guest_cart"
    put "/guest_cart_details_quantity"  => "guest_cart_details#change_quantity_in_guest_cart"

    #order api
    get "/orders"                   => "orders#index"
    post "/orders"                  => "orders#create"
    get "/orders/:id"               => "orders#get_order_by_order_id"
    post "/orders/:id"              => "orders#edit_order_by_order_id"
    post "/orders/tracking/:id"     => "orders#report_tracking_number_by_order_id"
    #get "/orders_month"             => "orders#get_order_by_month"

    #product api
    get "/products"                 => "products#index"
    get "/products/:sku"            => "products#show"
    get "/products/:code/cat"       => "products#find_product_by_product_code"
    post "/products"                => "products#create"
    post "/products/:sku"           => "products#edit_by_sku"

    #product code api
    post "/product_codes"           => "product_codes#create"
    get "/product_codes/:desc"      => "product_codes#find_product_code_by_desc"

    #product code api
    post "/codes"                   => "codes#create"
    get "/codes/:desc"              => "codes#find_product_code_by_desc"

    #address api
    post "/addresses"               => "addresses#create"
    get "/addresses"                => "addresses#index"
    post "/addresses/:id"           => "addresses#edit_address_by_address_id"

    #session api
    post "/sessions"                => "sessions#create"
    get "/authenticated"            => "sessions#authenticated"
    delete "/sessions"              => "sessions#destroy"
    post "/admins"                  => "sessions#admin"
    get "/admin_auth"               => "sessions#admin_auth"
    delete "/admins"                => "sessions#admin_destory"

    #user api
    post "/remove_current_cart"     => "users#remove_current_cart"
  end
end
