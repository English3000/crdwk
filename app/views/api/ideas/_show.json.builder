json.partial! 'api/ideas/ideas.json.jbuilder', ideas: [idea]
json.partial! 'api/comments/comments.json.jbuilder', comments: idea.comments
