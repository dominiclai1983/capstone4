class Api::AddressesController < ApplicationController
  def create
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)

    user_id = session.user.id

    if session
      begin
        @address =
          Address.create(
            {
              user_id: user_id,
              first_name: params[:address][:first_name],
              last_name: params[:address][:last_name],
              billing_email: params[:address][:billing_email],
              phone_number: params[:address][:phone_number],
              address_1: params[:address][:address_1],
              address_2: params[:address][:address_2],
              district: params[:address][:district],
              region: params[:address][:region],
              is_billing: params[:address][:is_billing]
            }
          )
        render "api/addresses/show", status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    else
      render json: { authenticated: false }, status: :bad_request
    end
  end

  def index
    if session
      @addresses = session.user.addresses.where(remove: false)
      render "api/addresses/index"
    else
      render json: { addresses: [] }
    end
  end

  def edit_address_by_address_id
    if session
      @address = Address.find_by(id: params[:id])

      if @address and @address.update(address_params)
        render "api/addresses/show"
        #TODO: the show.jbuilder is still not completed
      else
        render json: { success: false }
      end
    else
      render json: { success: false }
    end
  end

=begin
  def edit_billing_address
    if session 
      if any_billing_address?
        @billing_address = session.user.addresses.find_by(is_billing: true)


  def edit_shipping_address_only_by_id
    if session
      if any_billing_address?
        billing_address = session.user.addresses.find_by(is_billing: true)
        billing_address.destroy
      end

      @address = Address.find_by(id: params[:id])
      if @address and @address.update(address_params)
        render "api/addresses/show"
        #TODO: the show.jbuilder is still not completed
      else !@address and @address.create(address_params);
        render "api/addresses/show"
      else
        render json: { success: false }
      end
    else
      render json: { success: false }
    end
  end
=end

  private

  def address_params
    params
      .require(:address)
      .permit(
        :first_name,
        :last_name,
        :billing_email,
        :phone_number,
        :address_1,
        :address_2,
        :district,
        :region,
        :is_billing
      )
      .merge(user_id: session.user.id)
  end

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end

  def any_billing_address?
    addresses = session.user.addresses
    addresses.each { |item| return true if item.is_billing }
    return false
  end
end
