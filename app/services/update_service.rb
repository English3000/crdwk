class UpdateService # render doesn't work
  def write(item, item_params, path)
    if item.update_attributes(item_params)
      field = path.split('/').last.to_sym
      value = path.include?('sessions') ? item : [item]
      # hash = {field => value}
      # p hash
      ApplicationController.render partial: path, assigns: {field => value}
    else
      ApplicationController.render json: item.errors.full_messages, status: 422
    end
  end
end
