json.ideas do
  json.set! @idea.id do
    json.partial! 'api/ideas/idea', idea: @idea
  end
end
