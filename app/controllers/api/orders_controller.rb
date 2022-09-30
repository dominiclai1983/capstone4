class Api::OrdersController < ApplicationController
  def create
    if !session
      return render json: { error: "user not logged in" }, status: :unauthorized
    end

    @order =
      Order.create(
        { user_id: session.user.id, address_id: [:order][:address_id] }
      )
    if @order.save
      render "api/orders/create", status: :created
    else
      render json: { success: false }, status: :bad_request
    end
  end

  def index
    if session
      @orders = session.user.orders.page(params[:page]).per(25)
      render "api/orders/index"
      #if there is query params ?month=[:month]
    elsif (params[:month] && params[:year])
      month = params[:month].to_i
      year = params[:year].to_i
      day = Time.days_in_month(month, year)

      date = DateTime.new(year, month, 1)
      range = (date)..(date + day.days)

      @orders =
        Order.where(order_date: range, status: true, payment_status: true)

      render "api/orders/index"
    elsif params[:admin_checker]
      @orders = Order.all.order(order_date: :desc).page(params[:page]).per(25)
      render "api/orders/index"
    else
      render json: { orders: [] }
    end
  end

  def admin_index
    if !admin_session
      return render json: { error: "user not logged in" }, status: :unauthorized
    elsif params[:pending]
      @orders =
        Order
          .where(tracking_number: nil)
          .order(order_date: :desc)
          .page(params[:page])
          .per(25)
      render "api/orders/index"
    elsif params[:cancelled]
      @orders =
        Order
          .where(status: false)
          .order(order_date: :desc)
          .page(params[:page])
          .per(25)
      render "api/orders/index"
    elsif params[:orderID]
      @orders = Order.where(id: params[:orderID]).page(params[:page]).per(25)
      render "api/orders/index"
    elsif params[:sku]
      @orders =
        Order
          .joins(:products)
          .where(products: { sku: params[:sku] })
          .page(params[:page])
          .per(25)
      render "api/orders/index"
    elsif params[:email]
      @orders = Order.where(email: params[:email]).page(params[:page]).per(25)
      render "api/orders/index"
    else
      @orders = Order.all.order(order_date: :desc).page(params[:page]).per(25)
      render "api/orders/index"
    end
  end

  def edit_order_by_order_id
    if session and is_admin?
      @order = Order.find_by(id: params[:id])

      if !@order.status and @order.update(order_params)
        render "api/orders/show", status: :ok
      else
        render json: { order: [] }
      end
    else
      render json: { order: [] }
    end
  end

  #TODO:complete this method
  def report_tracking_number_by_order_id
    if session and is_admin?
      @order = Order.find(params[:id])
      #status = @order.status
      #payment_status = @order.payment_status

      #if !status and

      now = DateTime.current

      if @order.update(
           {
             tracking_number: params[:order][:tracking_number],
             status: true,
             shipping_date: now
           }
         )
        render "api/orders/show", status: :ok
      else
        render json: { order: [] }
      end
    else
      render json: { order: [] }
    end
  end

  private

  def order_params
    params.require(:order).permit()
  end

  def session
    token = cookies.signed[:ecommerce_session_token]
    session = Session.find_by(token: token)
  end

  def is_admin?
    session.user.is_admin?
  end

  def admin_session
    token = cookies.signed[:ecommerce_admin_session_token]
    session = Session.find_by(token: token)
  end
end
