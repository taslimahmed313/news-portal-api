const loadNewsCategories = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayNewsCategories(data.data.news_category));
}
const displayNewsCategories = newses =>{
    console.log(newses);
    const newsContainer = document.getElementById("news-container");
    newses.forEach(news => {
        console.log(news)
        const newsSpan = document.createElement('span');
        newsSpan.classList.add('mx-3')
        newsSpan.innerHTML = `
            <span>${news.category_name}</span>
        `;
        newsContainer.appendChild(newsSpan);
    });
}
loadNewsCategories();