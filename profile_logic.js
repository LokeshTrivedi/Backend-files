const userData = {
    username: 'john_doe',
    fullname: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '123-456-7890',
    profilePicture: '/Signup_Page', // Placeholder image
    posts: [
        'https://placekitten.com/400/300', // Placeholder post image 1
        'https://placekitten.com/300/400'  // Placeholder post image 2
    ]
};

// Populate placeholders with user data
document.getElementById('username-placeholder').innerText = userData.username;
document.getElementById('fullname-placeholder').innerText = userData.fullname;
document.getElementById('email-placeholder').innerText = userData.email;
document.getElementById('mobile-placeholder').innerText = userData.mobile;
document.getElementById('profile-picture').src = userData.profilePicture;

// Dynamically add posts
const postsContainer = document.getElementById('posts-container');
userData.posts.forEach(post => {
    const imgElement = document.createElement('img');
    imgElement.src = post;
    imgElement.alt = 'Post Image';
    postsContainer.appendChild(imgElement);
});
