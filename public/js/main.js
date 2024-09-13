
const firebaseConfig = {
  apiKey: "AIzaSyAxNYPEz7ioOKltTewyNus25olatTUmcAo",
  authDomain: "blog-cedf5.firebaseapp.com",
  projectId: "blog-cedf5",
  storageBucket: "blog-cedf5.appspot.com",
  messagingSenderId: "301414894189",
  appId: "1:301414894189:web:6eb5c404b23fcc85824d64",
  measurementId: "G-260RNXEM6V"
};

firebase.initializeApp(firebaseConfig);

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      window.location.href = '/dashboard';
    })
    .catch((error) => {
      console.error('Error signing in:', error);
    });
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      window.location.href = '/dashboard';
    })
    .catch((error) => {
      console.error('Error signing up:', error);
    });
});
