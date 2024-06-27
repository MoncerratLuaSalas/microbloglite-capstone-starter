"use strict"

document.addEventListener("DOMContentLoaded", function() {
  const postForm = document.getElementById('postForm');
  const postsList = document.getElementById('postsList');
  const currentUser = 'LeBronIsKing';  // Replace this with the method to get the current logged-in user's username

  // Fetch and display previous posts
  function fetchPosts() {
    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxlQnJvbklzS2luZyIsImlhdCI6MTcxOTUwNjU3MSwiZXhwIjoxNzE5NTkyOTcxfQ.m2eXxderSgsgTB4rpv3rCaDFPtwJ47d0susN_z60TpQ',
      }
    })
    .then(response => response.json())
    .then(data => {
      postsList.innerHTML = '';
      data
        .filter(post => post.username === currentUser)  // Filter posts by the current user
        .forEach(post => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';
          listItem.textContent = post.text;
          postsList.appendChild(listItem);
        });
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  }

  // Fetch posts on page load
  fetchPosts();

  postForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const postText = document.getElementById('postText').value;
    
    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxlQnJvbklzS2luZyIsImlhdCI6MTcxOTUwNjU3MSwiZXhwIjoxNzE5NTkyOTcxfQ.m2eXxderSgsgTB4rpv3rCaDFPtwJ47d0susN_z60TpQ',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: postText
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert('Post successfully posted!');
      // Fetch posts again to include the new post
      fetchPosts();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('There was an error posting your message. Please try again.');
    });
  });
});
