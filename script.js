// Your API Key (Replace with your NewsAPI key)
const API_KEY = 'dd96ba04230543e3987d7ad4e29c32f8';

let currentQuery = 'technology';

function updateCategory(query) {
  currentQuery = query;
  fetchNews();
}

async function fetchNews() {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = 'Loading...';

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${currentQuery}&language=en&apiKey=${API_KEY}`
    );
    const data = await response.json();

    newsContainer.innerHTML = '';
    data.articles.forEach((article) => {
      const newsCard = document.createElement('div');
      newsCard.className = 'news-card';

      const img = document.createElement('img');
      img.src = article.urlToImage || 'https://via.placeholder.com/300';
      img.alt = article.title;

      const title = document.createElement('h2');
      title.textContent = article.title;

      const description = document.createElement('p');
      description.textContent = article.description || 'No description available.';

      const readMore = document.createElement('a');
      readMore.href = article.url;
      readMore.target = '_blank';
      readMore.textContent = 'Read More';

      const shareBtn = document.createElement('button');
      shareBtn.textContent = 'Share';
      shareBtn.onclick = () => shareArticle(article.title, article.url);

      newsCard.appendChild(img);
      newsCard.appendChild(title);
      newsCard.appendChild(description);
      newsCard.appendChild(readMore);
      newsCard.appendChild(shareBtn);

      newsContainer.appendChild(newsCard);
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
  }
}

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

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

window.onload = fetchNews;