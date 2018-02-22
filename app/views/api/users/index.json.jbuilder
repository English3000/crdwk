@users.each do |user|
  json.set! user.id do
    json.partial! 'api/sessions/user', user: user, current: false
  end
end
