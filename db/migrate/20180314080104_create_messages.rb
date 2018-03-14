class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :name
      t.text :body, null: false
      t.integer :user_id, null: false
      t.integer :coworker_id, null: false
      t.integer :message_id

      t.timestamps
    end
    add_index :messages, :user_id
    add_index :messages, :coworker_id
    add_index :messages, :message_id
  end
end
