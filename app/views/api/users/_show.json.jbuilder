json.users do
  json.set! user.id do
    json.partial! 'api/sessions/user.json.jbuilder', user: user, current: current
  end
end

json.ideas do
  user.ideas.each do |idea|
    json.set! idea.id do
      json.partial! 'api/sessions/idea.json.jbuilder', idea: idea
    end
  end
end
