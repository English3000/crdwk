# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180314080104) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "body", null: false
    t.integer "user_id", null: false
    t.integer "idea_id"
    t.integer "comment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id"], name: "index_comments_on_comment_id"
    t.index ["idea_id"], name: "index_comments_on_idea_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "ideas", force: :cascade do |t|
    t.string "name", null: false
    t.text "body", null: false
    t.integer "user_id", null: false
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "cover_photo_file_name"
    t.string "cover_photo_content_type"
    t.integer "cover_photo_file_size"
    t.datetime "cover_photo_updated_at"
    t.integer "idea_id"
    t.index ["idea_id"], name: "index_ideas_on_idea_id"
    t.index ["name"], name: "index_ideas_on_name"
    t.index ["user_id"], name: "index_ideas_on_user_id"
  end

  create_table "interactions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "coworker_id"
    t.integer "idea_id"
    t.boolean "collab"
    t.integer "comment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comment_id", "user_id"], name: "index_interactions_on_comment_id_and_user_id", unique: true
    t.index ["coworker_id", "user_id"], name: "index_interactions_on_coworker_id_and_user_id", unique: true
    t.index ["idea_id", "user_id", "collab"], name: "index_interactions_on_idea_id_and_user_id_and_collab", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.string "name"
    t.text "body", null: false
    t.integer "user_id", null: false
    t.integer "coworker_id", null: false
    t.integer "message_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coworker_id"], name: "index_messages_on_coworker_id"
    t.index ["message_id"], name: "index_messages_on_message_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "profile_pic_file_name"
    t.string "profile_pic_content_type"
    t.integer "profile_pic_file_size"
    t.datetime "profile_pic_updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name"
    t.index ["password_digest"], name: "index_users_on_password_digest"
  end

end
