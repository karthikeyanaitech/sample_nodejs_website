const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// 🔗 MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// 🧩 Schema
const User = mongoose.model('User', {
  name: String
});

// ➕ Add user
app.post('/add-user', async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json({ message: "User saved" });
});

// 📥 Get users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// 🚀 Start server
app.listen(3000, '0.0.0.0', () => {
  console.log("Server running on port 3000");
});
