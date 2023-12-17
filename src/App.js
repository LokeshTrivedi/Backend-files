// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;


// // src/App.js
// // import './App.css';
// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Home from './components/Home';

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         {/* Add routes for other pages */}
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;


// // src/App.js
// import React from 'react';
// import Home from './components/Home';
// import './App.css';

// const App = () => {
//   return (
//     <div className="app">
//       <header>
//         <div>Instagram</div>
//       </header>
//       <Home />
//       <nav>
//         <ul>
//           <li>Home</li>
//           <li>Search</li>
//           <li>Chat</li>
//           <li>Notification</li>
//           <li>Profile</li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default App;

// src/App.js
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Profile from './components/Profile'; 
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data after successful login
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          credentials: 'include', // Include credentials (cookies) in the request
        });

        if (response.ok) {
          const user = await response.json();
          setUserData(user);
        } else {
          // Handle error, redirect to login, etc.
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Check if the user is logged in (you might have a more sophisticated check)
    const isLoggedIn = document.cookie.includes('connect.sid');
    if (isLoggedIn) {
      fetchUserData();
    }
  }, []);

  return (
    <div className="app">
      <header>
        <div>MITS Hub</div>
      </header>
      <Home />
      <nav>
        <ul>
          <li>Home</li>
          <li>Search</li>
          <li>Chat</li>
          <li>Notification</li>
          <li>Profile</li>
        </ul>
      </nav>
    </div>
  );
};

export default App;