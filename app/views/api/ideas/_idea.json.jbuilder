json.extract! idea, :id, :name, :body, :user_id, :idea_id, :active, :updated_at
json.cover_photo asset_path(idea.cover_photo.url(:original))
json.comments do
  json.array! idea.comments.order(created_at: :desc).pluck(:id)
end
json.child_id (idea.child ? idea.child.id : 0)
