json.id user.id
json.name user.name
json.profile_pic asset_path(user.profile_pic.url(:original))
json.ideas do
  json.array! user.ideas.order(updated_at: :desc).pluck(:id)
end
