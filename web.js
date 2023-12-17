const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 5000;

// mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    username: String,
    password: String,
    mobile: String,
    // Add fields for profile information and posts
    profile: {
      name: String,
      profilePicture: {
        data: Buffer,
        contentType: String
      },
      posts: [{
        image: {
          data: Buffer,
          contentType: String
        }
      }]
    }
});

const User = mongoose.model('User', userSchema);

const loginDetailSchema = new mongoose.Schema({
    username: String,
    systemInfo: String,
    ipAddress: String,
    timestamp: { type: Date, default: Date.now }
});

const LoginDetail = mongoose.model('LoginDetail', loginDetailSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, '/')));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/signup', async (req, res) => {
    const { fullname, email, username, password, mobile } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        fullname,
        email,
        username,
        password: hashedPassword,
        mobile,
      });

      // Create a separate database for each user
      const userDbName = `user_${username}`;
      const userDbConnection = mongoose.createConnection(`mongodb://localhost:27017/${userDbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
      const UserInUserDb = userDbConnection.model('User', userSchema);

      await newUser.save();

      // Save the user's profile in their separate database
      const userInUserDb = new UserInUserDb({
        username,
        profile: {
          name: fullname
        }
      });

      await userInUserDb.save();

      res.redirect('/login.html');
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        // MongoDB duplicate key error (code 11000) for unique constraint
        res.send('Email or username is already in use');
      } else {
        res.send('Error during signup');
      }
    }
});

app.post('/login', async (req, res) => {
    const { 'phone-email': identifier, password } = req.body;
    const systemInfo = req.headers['user-agent'];
    const ipAddress = req.connection.remoteAddress;

    try {
      let user;

      if (isEmail(identifier)) {
        user = await User.findOne({ email: identifier });
      } else {
        user = await User.findOne({ username: identifier });
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const loginDetail = new LoginDetail({
          username: user.username,
          systemInfo,
          ipAddress,
        });

        await loginDetail.save();

        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        res.send('Invalid login credentials');
      }
    } catch (error) {
      console.error(error);
      res.send('Error during login');
    }
});

// New route for updating user profile
app.post('/update-profile', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);

    // Update profile information
    user.profile.name = req.body.name;

    // Update profile picture
    if (req.file) {
      user.profile.profilePicture.data = req.file.buffer;
      user.profile.profilePicture.contentType = req.file.mimetype;
    }

    await user.save();

    res.send('Profile updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating profile');
  }
});

// New route for posting a picture
app.post('/post-picture', upload.single('image'), async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId);

    // Add a new post
    user.profile.posts.push({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    await user.save();

    res.send('Picture posted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error posting picture');
  }
});

app.get('/profile', (req, res) => {
  if (req.session.user) {
      res.sendFile(path.join(__dirname, 'profile.html'));
  } else {
      res.redirect('/login');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

function isEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
