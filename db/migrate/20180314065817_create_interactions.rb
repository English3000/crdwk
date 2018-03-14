class CreateInteractions < ActiveRecord::Migration[5.1]
  def change
    create_table :interactions do |t|
      t.integer :user_id, null: false
      t.integer :coworker_id
      t.integer :idea_id
      t.boolean :collab #false = like/pending, true = request/collaborators
      t.integer :comment_id
      #add project_id, org_id in future migration
      t.timestamps
    end
    add_index :interactions, [:coworker_id, :user_id], unique: true
    add_index :interactions, [:idea_id, :user_id, :collab], unique: true
    add_index :interactions, [:comment_id, :user_id], unique: true
  end
end
