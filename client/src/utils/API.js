import axios from "axios";

export default {

  articleSearch: function(title, startYear, endYear) {
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    let search = "api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=" + title;

    if (startYear) {
      search += "&begin_date" + startYear + '0101';
    }

    if (endYear) {
      search += "&end_date" + endYear + "1231";
    }

    console.log(queryURL+ search)
    return axios.get(queryURL + search)
      
  },
  parseArticle: function(response) {
    const docs = response.data.response.docs;
    const articles = [];
    docs.forEach(a => {
      articles.push({
        title: a.headline.main,
        date: a.pub_date,
        url: a.web_url
      })
    })
    return articles;

  },
  // need to change this to articlesearch
  getArticle: function(id) {
    return axios.get("/api/saved/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/saved/" + id);
  },
  // Saves a book to the database
  saveArticle: function(article) {
    return axios.post("/api/saved", article);
  }
};
