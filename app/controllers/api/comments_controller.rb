class Api::CommentsController < ApplicationController
  def destroy
    @comment = Comment.find_by(id: params[:id])
    @comment = @comment.destroy
    render partial: 'comments', locals: {comments: [@comment]}
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render partial: 'comments', locals: {comments: [@comment]}
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def update
    @comment = Comment.find_by(id: params[:id])
    if @comment.update_attributes(comment_params)
      render partial: 'comments', locals: {comments: [@comment]}
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :user_id, :idea_id, :comment_id)
  end
end
