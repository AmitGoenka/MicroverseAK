// Display list of DBs
show dbs

// Create and switch to db
use <db name>

// Insert a row
db.events.insertOne({ "title": "title 1", "description": "desc 1", "date": "date 1" })
db.users.insertOne({ "username": "Amit", "password": "micro", "email": "amit@amit.com", "fullName": "Amit G" })

// Insert many rows
db.events.insertMany([{ "title": "title 1", "description": "desc 1", "date": "date 1" }, { "title": "title 2", "description": "desc 2", "date": "date 2" }, { "title": "title 3", "description": "desc 3", "date": "date 3" }, { "title": "title 4", "description": "desc 4", "date": "date 4" }, { "title": "title 5", "description": "desc 5", "date": "date 5" }])

 // Display all rows
db.events.find()

// Show tables/collections
show collections

// Clear Screen
cls

// Delete
db.events.deleteOne({"title": "title 1"})

// Update a record
db.events.update({"title": "title 3"},{$set: {"description": "micro event"}, $currentDate: {"date": true}})

// Get Indexes
db.events.getIndexes()

// 1 Ascending, -1 Descending
db.events.createIndex({"date": 1})

// --- Index Section ---
// Get Indexes:
db.events.getIndexes()
// Search Entries:
db.events.find({"title": "title 1"})
// Get Execution Plan:
db.events.find({"title": "title 1"}).explain("executionStats")
// Create Index:
db.events.createIndex( {"title": 1} )
// Get Execution Plan Again:
db.events.find({"title": "title 1"}).explain("executionStats")
