json.id user.id
json.name user.name

if current
  json.session_token user.session_token
else
  json.ideas user.idea_ids
end
