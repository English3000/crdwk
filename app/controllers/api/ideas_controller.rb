class Api::IdeasController < ApplicationController
  def show
    @idea = Idea.find_by(id: params[:id])
    if @idea && params[:visited]
      render partial: 'ideas.json.jbuilder', locals: {ideas: [@idea]}
    elsif @idea
      render template: 'application/idea'
    else
      redirect_to '/' #change?
    end
  end

  def create
    @idea = Idea.new(idea_params)
    if @idea.save
      render partial: 'ideas.json.jbuilder', locals: {ideas: [@idea]}
    else
      render json: @idea.errors.full_messages, status: 422
    end
  end

  def update
    @idea = Idea.find_by(id: params[:id])
    if @idea.update_attributes(idea_params)
      render partial: 'ideas.json.jbuilder', locals: {ideas: [@idea]}
    else
      render json: @idea.errors.full_messages, status: 422
    end
  end

  private
  def idea_params
    params.require(:idea).permit(:id, :name, :body, :active, :cover_photo,
                                 :user_id)
  end
end
