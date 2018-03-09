class Api::IdeasController < ApplicationController
  def show
    @idea = Idea.find_by(id: params[:id])
    if @idea && params[:visited]
      render :show
    elsif @idea
      render template: 'application/idea'
    else
      redirect_to '/' #change?
    end
  end
end
