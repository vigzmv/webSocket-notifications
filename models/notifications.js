const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationsSchema = new Schema({
  image: String,
  name: String,
  action: String,
  content: String,
  read: Boolean,
});

module.exports = mongoose.model('Notifications', NotificationsSchema);
