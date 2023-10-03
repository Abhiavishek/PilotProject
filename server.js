

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const username = encodeURIComponent("avi");
const password = encodeURIComponent("Abhi@123456");

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = `mongodb+srv://${username}:${password}@cluster0.91jm7nr.mongodb.net/`;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const Task = mongoose.model('Task', taskSchema);


app.use(express.static(path.join(__dirname, "./src/build")));

app.get("*", function(req, res){
  res.sendFile(path.join(__dirname, "./src/build/index.html"));
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = new Task({ title, description, status });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndRemove(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
