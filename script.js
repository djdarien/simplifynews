// Your GNews API Key (Replace with your actual GNews API key)
const API_KEY = '0345e3b7fa12b27f6a7b5290c23bd202';

// Default query set to Tesla for landing page
let currentQuery = 'Tesla';

// Map friendly category names to optimized GNews queries
const categoryQueries = {
  "Tesla Model 3": "Tesla Model 3",
  "Tesla Model Y": "Tesla Model Y",
  "Tesla Model S": "Tesla Model S",
  "Tesla Model X": "Tesla Model X",
  "Cybertruck": "Tesla Cybertruck",
  "Tesla Autopilot": "Tesla Autopilot",
  "Tesla FSD": "Tesla Full Self Driving",
  "Rivian": "Rivian electric truck",
  "Lucid Motors": "Lucid Air EV",
  "BYD EV": "BYD electric vehicle",
  "Volkswagen EV": "Volkswagen ID.4 OR VW EV",
  "Ford EV": "Ford Mustang Mach-E OR F-150 Lightning",
  "Tesla Supercharger": "Tesla Supercharger network",
  "EV Charging Stations": "electric vehicle charging stations",
  "Battery Technology": "EV battery technology",
  "Solid State Batteries": "solid state battery EV",
  "EV incentives": "EV tax credit OR electric vehicle incentives",
  "EV Market": "global EV market",
  "Sustainability": "sustainable transportation EV",
  "EV Infrastructure": "EV infrastructure OR charging grid",
};

// Function to update the current category and fetch news
function updateCategory(query) {
  currentQuery = categoryQueries[query] || query;
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
    console.log("Fetched data:", data); // Debugging

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
        img.src = article.image || 'https://via.placeholder.com/300?text=EV+News';
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
      newsContainer.innerHTML = '<p>No news available for this category.</p>';
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
