class Idea < ApplicationRecord
  validates :name, :body, :user_id, presence: true
  validates :name, uniqueness: {scope: :user_id}
  validates :active, inclusion: [true, false]

  has_attached_file :cover_photo, default_url: ''
  validates_attachment_content_type :cover_photo, content_type: /\Aimage\/.*\Z/

  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :interactions, dependent: :destroy

  belongs_to :parent, #may trigger validation
    primary_key: :id,
    foreign_key: :idea_id,
    class_name: :Idea
  has_many :revisions,
    primary_key: :id,
    foreign_key: :idea_id,
    class_name: :Idea
end
