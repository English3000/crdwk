class Api::CommentsController < ApplicationController
  def destroy
    #
  end

  def create
    #
  end

  def update
    #
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :user_id, :idea_id, :comment_id)
  end
end
