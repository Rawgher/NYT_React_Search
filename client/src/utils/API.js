import axios from "axios";

export default {

  articleSearch: function(title, startYear, endYear) {
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    let search = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931" + title;

    if (startYear) {
      search += "&begin_date" + startYear + '0101';
    }

    if (endYear) {
      search += "&end_date" + endYear + "1231";
    }

    return axios.get(queryURL + search)
      
  },
  // need to change this to articlesearch
  getArticle: function() {
    return axios.get("/api/saved/");
  },
  // Gets the book with the given id
  getSaved: function(articleObj) {
    return axios.get("/api/saved/", articleObj);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete(`/api/saved/${id}`);
  },
  // Saves a book to the database
  saveArticle: function(article) {
    return axios.post("/api/saved", article);
  }
};
