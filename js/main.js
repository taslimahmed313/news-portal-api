// Load News Categories.......................................................
const loadNewsCategories = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsCategories(data.data.news_category));
};

// Display News Categories......................................................
const displayNewsCategories = (newses) => {
  console.log(newses);
  const newsContainer = document.getElementById("news-container");
  newses.forEach((news) => {
    console.log(news);
    const newsSpan = document.createElement("span");
    newsSpan.classList.add("mx-3");
    newsSpan.innerHTML = `
            <span id="category" class="hover" onclick = "loadNewsDetails('${news.category_id}')">${news.category_name}</span>
        `;
    newsContainer.appendChild(newsSpan);
  });
};

// Load News Details.............................................................
const loadNewsDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data));
};

// Display News Details..........................................................
const displayNewsDetails = (newses) => {
  console.log(newses);

  //   'No News found' -message...............................................
  const newsMessage = document.getElementById("no-news-message");
  if (newses.length === 0) {
    newsMessage.classList.remove("d-none");
  } else {
    newsMessage.classList.add("d-none");
  }

  //   Finds and Sets a Single news
  const newsDetailsContainer = document.getElementById(
    "news-details-container"
  );
  newsDetailsContainer.textContent = "";
  newses.forEach((news) => {
    console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card", "mb-3", "px-2");
    newsDiv.innerHTML = `
  <div class="row g-0 d-flex align-items-center">
    <div class="col-md-3 col-4">
      <img src="${
        news.thumbnail_url
      }" class="img-fluid w-100 height-control rounded-start" alt="...">
    </div>
    <div class="col-md-9 col-8">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details.slice(0, 250)}...</p>
    <div class="d-flex align-items-center justify-content-between">
        <div>
        <div class="d-flex align-items-center">
        <div>
        <img class="img-thumbnail rounded-5 img-fluid img-size" src = "${
          news.author.img
        }">
        </div>
        <div class="ms-2">
        <p class="mb-0">${
          news.author.name ? news.author.name : "Mr. No Data"
        }</p>
        <p class="mb-0">${news.author.published_date.slice(0, 11)}</p></div>
        </div>
        </div> 

      <div><i class="fa-regular fa-eye"></i><span class="ms-2">${
        news.total_view ? news.total_view : "No view"
      }</span></div>
      <div>
      <i class="fa-regular fa-star-half-stroke"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      </div>
      <div>
      <i class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#newsModal" onclick = "loadNewsDetailsModal('${
        news._id
      }')"></i>
      </div>
      
      </div>
    </div>
    
    </div>
  </div>
    `;
    newsDetailsContainer.appendChild(newsDiv);
  });
};

// Load Modal News..............................................................
const loadNewsDetailsModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModalNewsDetails(data.data));
};

// Display Modal News...........................................................
const displayModalNewsDetails = (newses) => {
  // console.log(newses);
  newses.forEach((news) => {
    console.log(news);
    const newsModalTitle = document.getElementById("newsModalLabel");
    newsModalTitle.innerText = `${news.title}`;
    const newsModalDetails = document.getElementById("news-details-modal");
    newsModalDetails.innerText = `${news.details}`;
  });
};
// loadNewsDetailsModal();
loadNewsCategories();
