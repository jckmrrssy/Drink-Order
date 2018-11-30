import axios from "axios";

const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const MAX = "&maxResults=10";

// Export an object with a "search" method that searches the google books API for the passed query
export default {
  search: function(query) {
    return axios.get(BASEURL + query + MAX);
  },
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveLiquor: function(LiquorData) {
    console.log("LiquorData: ", LiquorData);
    return axios.post("/api/drinks", LiquorData);
  }
};

// google books &key=AIzaSyCIuCsgDPUvNoh2Z3gG-AmYEIcivgQe_eE
