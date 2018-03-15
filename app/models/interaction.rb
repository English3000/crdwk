class Interaction < ApplicationRecord
  validates :collab, :like, inclusion: [true, false] #
  validates :idea_id, uniqueness: {scope: [:user_id, :collab]}
end
