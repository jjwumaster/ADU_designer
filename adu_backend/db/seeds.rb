# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Property.destroy_all
Adu.destroy_all

Property.create(
  name: "Home",
  address: "30 Melbourne Rd",
  city: "Great Neck",
  zip: 11021,
  lat: 41.0,
  long: 45.0)
