# could make this _data.json.jbuilder partial
json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! 'api/sessions/user', user: user, current: false
    end
  end
end

json.ideas do
  @ideas.each do |idea|
    json.set! idea.id do
      json.partial! 'api/sessions/idea', idea: idea
    end
  end
end
