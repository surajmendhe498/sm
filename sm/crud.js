// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// const port = 3000;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/crud-example', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('Could not connect to MongoDB', err));

// // Define the schema and model for items (books)
// const itemSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     author: { type: String, required: true }
// });

// const Item = mongoose.model('Item', itemSchema);

// app.use(express.json()); // Handle JSON data in HTTP requests

// // Create an item
// app.post('/items', async (req, res) => {
//     try {
//         const { title, author } = req.body;

//         // Create and save the new item
//         const newItem = new Item({ title, author });
//         const savedItem = await newItem.save();

//         res.status(201).json(savedItem);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get all items
// app.get('/items', async (req, res) => {
//     try {
//         const items = await Item.find();
//         res.status(200).json(items);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get a single item by ID
// app.get('/items/:id', async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id);
//         if (!item) return res.status(404).json({ message: 'Item not found' });

//         res.status(200).json(item);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Update an item by ID
// app.put('/items/:id', async (req, res) => {
//     try {
//         const { title, author } = req.body;

//         const updatedItem = await Item.findByIdAndUpdate(
//             req.params.id,
//             { title, author },
//             { new: true } // Return the updated document
//         );

//         if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

//         res.status(200).json(updatedItem);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Delete an item by ID
// app.delete('/items/:id', async (req, res) => {
//     try {
//         const deletedItem = await Item.findByIdAndDelete(req.params.id);
//         if (!deletedItem) return res.status(404).json({ message: 'Item not found' });

//         res.status(200).json({ message: 'Item deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://127.0.0.1:${port}/`);
// });

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
