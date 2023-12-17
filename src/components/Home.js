// // src/components/Home.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Home = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Fetch posts from your MongoDB using Node.js and Express (not provided here)
//     // You may use axios to make HTTP requests
//     axios.get('/api/posts').then((response) => {
//       setPosts(response.data);
//     });
//   }, []);

//   return (
//     <div>
//       {/* Header with logo */}
//       <header>
//         <div>Logo</div>
//       </header>

//       {/* User info section */}
//       <section>
//         <div>
//           <img src="Signup_Page.png" alt="Profile" />
//           <span>Username</span>
//         </div>
//       </section>

//       {/* Post feed */}
//       <section>
//         {posts.map((post) => (
//           <div key={post._id}>
//             <img src={post.imageUrl} alt="Post" />
//             <div>
//               {/* Like and comment options */}
//               <button>Like</button>
//               <button>Comment</button>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Bottom navigation */}
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

// export default Home;


// src/components/Home.js
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    // Simulate fetching more data (you would replace this with an actual API call)
    setTimeout(() => {
      const newPosts = Array.from({ length: 5 }, (_, index) => ({
        id: posts.length + index + 1,
        username: `user${index + 1}`,
        imageUrl: `image${index + 1}.jpg`,
        likes: Math.floor(Math.random() * 20),
        comments: [],
      }));

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length > 0);
    }, 1000);
  };

  useEffect(() => {
    // Initial load of posts (you would replace this with an actual API call)
    fetchMoreData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <section className="post-feed">
        {posts.map((post) => (
          <div key={post.id} className="post">
            {/* ... (same content as in the previous example) */}
          </div>
        ))}
      </section>
    </InfiniteScroll>
  );
};

export default Home;
