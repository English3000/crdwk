json.extract! user, :id, :name, :profile_pic
json.ideas do
  json.array! user.ideas, :id, :name, :cover_photo, :active
end
