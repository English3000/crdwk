class CreateIdeas < ActiveRecord::Migration[5.1]
  def change
    create_table :ideas do |t|
      t.string :name, null: false
      t.text :body, null: false
      t.integer :user_id, null: false
      t.boolean :active, null: false, default: true

      t.timestamps
    end

    add_index :ideas, :name
    add_index :ideas, :user_id
  end
end
