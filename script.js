// Your GNews API Key (Replace with your actual GNews API key)
const API_KEY = '0345e3b7fa12b27f6a7b5290c23bd202';
let currentQuery = 'technology';

// Function to update the current category and fetch news
function updateCategory(query) {
  currentQuery = query;
  fetchNews();
}

// Function to fetch news articles from GNews API
async function fetchNews() {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(currentQuery)}&token=${API_KEY}&lang=en&max=20`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // For debugging

    newsContainer.innerHTML = '';
    if (data && data.articles && data.articles.length > 0) {
      data.articles.forEach((article) => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        // Article Image with clickable link
        const imageLink = document.createElement('a');
        imageLink.href = article.url || '#';
        imageLink.target = '_blank';
        imageLink.className = 'image-link';
        const img = document.createElement('img');
        img.src = article.image || 'https://via.placeholder.com/300';
        img.alt = article.title;
        imageLink.appendChild(img);
        newsCard.appendChild(imageLink);

        // Article Title
        const title = document.createElement('h2');
        title.textContent = article.title;
        newsCard.appendChild(title);

        // Article Description
        const description = document.createElement('p');
        description.textContent = article.description || 'No description available.';
        newsCard.appendChild(description);

        // Read More Link
        const readMore = document.createElement('a');
        readMore.href = article.url || '#';
        readMore.target = '_blank';
        readMore.className = 'read-more';
        readMore.textContent = 'Read More';
        newsCard.appendChild(readMore);

        // Share Button
        const shareBtn = document.createElement('button');
        shareBtn.textContent = 'Share';
        shareBtn.onclick = () => shareArticle(article.title, article.url);
        newsCard.appendChild(shareBtn);

        // Append the news card to the container
        newsContainer.appendChild(newsCard);
      });
    } else {
      newsContainer.innerHTML = '<p>No news available.</p>';
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
  }
}

// Function to share an article using the Web Share API
function shareArticle(title, url) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: url,
      })
      .catch((err) => console.error('Error sharing:', err));
  } else {
    alert('Sharing not supported on this browser.');
  }
}

// Function to toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Function to toggle side navigation
function toggleSidenav() {
  const sidenav = document.getElementById('sidenav');
  sidenav.classList.toggle('open');
}

// Initialize by fetching the default category news
window.onload = fetchNews;