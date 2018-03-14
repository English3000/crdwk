class AddColumnToIdeas < ActiveRecord::Migration[5.1]
  def change
    add_column :ideas, :idea_id, :integer
    add_index :ideas, :idea_id
  end
end
