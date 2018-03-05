json.extract! user, :id, :name
json.ideas do
  json.array! user.ideas, :id, :name, :active
end
