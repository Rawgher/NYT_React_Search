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

    return axios.get(queryURL + search).then(function(response) {
      if (response.data.response.docs.length > 0) {
        let results = [];

        for (let i = 0; i < 5; i++) {
          let doc = response.data.response.docs[i];
          let article = {
            title: doc.headline.main,
            url: doc.web_url,
            date: doc.pub_date.split("T")[0]
          }

          results.push(article);
        }

        return results

      }

      else {
        return false
      }
    })


  },
  // Gets the book with the given id
  getSaved: function() {
    return axios.get("/api/saved/");
  },
  // Gets the book with the given id
  // getOne: function(id) {
  //   return axios.get("/api/saved/" + id);
  // },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveArticle: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
