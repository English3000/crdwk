json.extract! comment, :id, :body, :user_id, :idea_id, :comment_id, :updated_at
json.replies do
  json.array! comment.replies.order(created_at: :desc).pluck(:id)
end
