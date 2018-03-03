class AddAttachmentCoverPhotoToIdeas < ActiveRecord::Migration[5.1]
  def self.up
    change_table :ideas do |t|
      t.attachment :cover_photo
    end
  end

  def self.down
    remove_attachment :ideas, :cover_photo
  end
end
