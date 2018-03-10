json.extract! user, :id, :name, :profile_pic
json.ideas do
  json.array! user.idea_ids
end
