const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const db = req.app.locals.db;
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = { username, password: hashedPassword };
    const result = await db.collection('users').insertOne(newUser);

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
};


const loginUser = async (req, res) => {
  const db = req.app.locals.db;
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      console.error('User not found');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.error('Invalid password');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ _id: user._id }, 'rq34ooq5nm20afa', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error.message); // Log error message
    res.status(500).json({ error: 'An error occurred during login', details: error.message });
  }
};

const getUser = async (req, res) => {
  const db = req.app.locals.db;
  const { username } = req.body;

  try {
    const user = await db.collection('users').findOne({ username });
    res.send(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const db = req.app.locals.db;
  const { username } = req.params;
  const update = req.body;

  try {
    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }
    const result = await db.collection('users').updateOne({ username }, { $set: update });
    res.status(201).send(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const db = req.app.locals.db;
  const username = req.params.username;

  try {
    // Delete the user from the database by username
    const result = await db.collection('users').deleteOne({ username });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User deleted successfully:', username);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
}

module.exports = { registerUser, loginUser, getUser, updateUser, deleteUser };


  