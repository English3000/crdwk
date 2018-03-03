class Idea < ApplicationRecord
  validates :name, :body, :user_id, :active, presence: true

  has_attached_file :cover_photo, default_url: ''
  validates_attachment_content_type :cover_photo, content_type: /\Aimage\/.*\Z/

  belongs_to :user
  # has_many :comments
  # has_many :likes
  # has_many :requests
end
