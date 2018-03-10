json.ideas do
  ideas.each do |idea|
    json.set! idea.id do
      json.partial! 'api/ideas/idea.json.jbuilder', idea: idea
    end
  end
end
