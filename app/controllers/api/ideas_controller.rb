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
    unless params[:ids]
      @idea = Idea.find_by(id: params[:id])
      if @idea.update_attributes(idea_params)
        render partial: 'ideas.json.jbuilder', locals: {ideas: [@idea]}
      else
        render json: @idea.errors.full_messages, status: 422
      end
    else
      @ideas = Idea.where(id: params[:ids])
      @ideas.update_all(active: params[:idea][:active])
      render partial: 'ideas.json.jbuilder', locals: {ideas: @ideas}
    end
  end

  def destroy
    if params[:ids]
      @ideas = Idea.where(id: params[:ids])
      @ideas = @ideas.destroy_all
      render partial: 'ideas.json.jbuilder', locals: {ideas: @ideas}
    else
      @idea = Idea.find_by(id: params[:id])
      @idea = @idea.destroy
      render partial: 'ideas.json.jbuilder', locals: {ideas: [@idea]}
    end
  end

  private
  def idea_params
    params.require(:idea).permit(:id, :name, :body, :active, :cover_photo,
                                 :user_id, :idea_id)
  end
end
