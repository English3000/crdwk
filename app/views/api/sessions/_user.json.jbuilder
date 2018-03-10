json.currentUser do
  json.extract! user, :id, :name, :session_token
end

json.partial! 'api/sessions/index.json.jbuilder', users: [user], ideas: user.ideas
