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

ActiveRecord::Schema.define(version: 20180206194634) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "adus", force: :cascade do |t|
    t.string "polygon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "property_id"
    t.index ["property_id"], name: "index_adus_on_property_id"
  end

  create_table "api_queries", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "properties", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "city"
    t.integer "zip"
    t.float "lat"
    t.float "long"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_properties_on_user_id"
  end

  create_table "suggestions", force: :cascade do |t|
    t.string "query"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "adus", "properties"
  add_foreign_key "properties", "users"
end
