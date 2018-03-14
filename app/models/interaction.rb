class Interaction < ApplicationRecord
  validates :collab, inclusion: [true, false] #
  validates :idea_id, uniqueness: {scope: [:user_id, :collab]}
end
