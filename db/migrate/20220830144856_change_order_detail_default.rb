class ChangeOrderDetailDefault < ActiveRecord::Migration[6.1]
  def change
    change_column_default :order_details, :remove, from: false, to: true
  end
end
