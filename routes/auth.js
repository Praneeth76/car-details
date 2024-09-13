const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const bcrypt = require('bcrypt');

router.get('/login', (req, res) => {

  res.render('login', { title: 'Login', errorMessage: '' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up', errorMessage: '' });
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.render('signup', { title: 'Sign Up', errorMessage: 'Invalid email format' });
  }

  try {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (!snapshot.empty) {
      return res.render('signup', { title: 'Sign Up', errorMessage: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection('users').doc(email).set({
      email,
      password: hashedPassword,
    });

    res.redirect('/auth/login');

  } catch (err) {
    console.error('Error during signup:', err);
    res.render('signup', { title: 'Sign Up', errorMessage: 'Server error, please try again.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await db.collection('users').doc(email).get();
    if (!userDoc.exists) {
      return res.render('login', { title: 'Login', errorMessage: 'Incorrect email or password' });
    }

    const user = userDoc.data();
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.redirect('/dashboard');
    } else {
      return res.render('login', { title: 'Login', errorMessage: 'Incorrect email or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.render('login', { title: 'Login', errorMessage: 'Server error, please try again.' });
  }
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;
