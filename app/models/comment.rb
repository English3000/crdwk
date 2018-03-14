class Comment < ApplicationRecord
  validates :body, :user_id, presence: true

  belongs_to :user
  belongs_to :idea
  belongs_to :parent, #may trigger validation
    primary_key: :id,
    foreign_key: :comment_id,
    class_name: :Comment
  has_many :replies,
    primary_key: :id,
    foreign_key: :comment_id,
    class_name: :Comment
end
