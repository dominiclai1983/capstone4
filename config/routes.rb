Rails.application.routes.draw do
  root to: "static_pages#index"

  get "/login"                => "static_pages#index"
  get "/signup"               => "static_pages#index"
  get "/bracelet"             => "static_pages#index"
  get "/earrings"             => "static_pages#index"
  get "/product/:sku"         => "static_pages#index"
  get "/account"              => "static_pages#index"
  get "/cart"                 => "static_pages#index"

  namespace :api do
    resources :users, only: %i[create index]
    resources :order_details, only: [:create]
    #prettier auto format
    #including a .prettierignore to opt out a file

    #charge api
    post    "/charge/mark_complete" => "charges#mark_complete"
    post    "/charges"              => "charges#create"

    #order_detail api
    post    "/order_details"        => "order_details#create"
    get     "/order_details/:order" => "order_details#get_order_details_by_order_id"

    #cart_detail api
    post    "/cart_details"         => "cart_details#create"
    get     "/cart_details/:cart"   => "cart_details#get_order_details_by_cart_id"

    #guest_cart_detail api
    post    "/guest_cart_details"   => "guest_cart_details#create"
    get     "/guest_cart_details"   => "guest_cart_details#get_order_details_by_global_id"

    #order api
    get     "/orders"               => "orders#index"
    post    "/orders"               => "orders#create"
    get     "/orders/:id"           => "orders#get_order_by_order_id"
    post    "/orders/:id"           => "orders#edit_order_by_order_id"
    post    "/orders/tracking/:id"  => "orders#report_tracking_number_by_order_id"

    #product api 
    get     "/products"             => "products#index"
    get     "/products/:sku"        => "products#show"
    get     "/products/:code/cat"   => "products#find_product_by_product_code"
    post    "/products"             => "products#create"
    post    "/products/:sku"        => "products#edit_by_sku"

    #product code api
    post    "/product_codes"        => "product_codes#create"
    get     "/product_codes/:desc"  => "product_codes#find_product_code_by_desc"

        #product code api
    post    "/codes"                => "codes#create"
    get     "/codes/:desc"          => "codes#find_product_code_by_desc"

    #address api
    post    "/addresses"            => "addresses#create"
    get     "/addresses"            => "addresses#index"
    post    "/addresses/:id"        => "addresses#edit_address_by_address_id"

    #session api
    post    "/sessions"             => "sessions#create"
    get     "/authenticated"        => "sessions#authenticated"
    delete  "/sessions"             => "sessions#destroy"
  end
end