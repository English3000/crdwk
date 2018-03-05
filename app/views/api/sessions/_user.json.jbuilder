json.currentUser do
  json.extract! user, :id, :name, :session_token
end

json.user do
  json.partial! 'api/users/user.json.jbuilder', user: user
end
