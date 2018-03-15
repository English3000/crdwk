class AddColumnToInteractions < ActiveRecord::Migration[5.1]
  def change
    add_column :interactions, :like, :boolean
    remove_index :interactions, [:idea_id, :user_id, :collab]
    add_index :interactions, [:idea_id, :user_id]
  end
end
