## Getting Started

To start the backend, run:

```
nodemon
```

## Model URIs
The following are links (or URIs) that the REST API will use to access 
information from the database, to our frontend. 
> Note: This isn't a definitive list of URIs. It can and will change once
more information is available.

```
/books
/books/{id}
/books/{id}/authors
/books/{id}/authors/{id}
/books/{id}/publisher
/books/{id}/reviews
/books/{id}/reviews/{user-id}
/books/search

/authors
/authors/{id}
/authors/{id}/books
/authors/{id}/books/{id}

/publishers
/publishers/{id}
/publishers/{id}/books
/publishers/{id}/books/{id}

/users
/users/{id}
/users/{id}/home-address
/users/{id}/shipping-addresses
/users/{id}/shipping-addresses/{id}
/users/{id}/credit-cards
/users/{id}/credit-cards/{id}
/users/{id}/cart
/users/{id}/cart/{book-id}
/users/{id}/reviews
/users/{id}/reviews/{book-id}
/users/{id}/saved-books
/users/{id}/saved-books/{book-id}
/users/{id}/purchased-books
/users/{id}/purchased-books/{book-id}
/users/{id}/wishlists
/users/{id}/wishlists/{id}

/addresses
/addresses/{id}

/credit-cards
/credit-cards/{id}

/wishlists
/wishlists/{id}
/wishlists/{id}/books
/wishlists/{id}/books/{id}
```
### References
The following is a list of references used in the creation of the backend. 
I strongly recommend looking at these for more understanding of how to add to the backend.
* [How to design a REST API](https://restfulapi.net/rest-api-design-tutorial-with-example/)
* [REST Resource Naming Guide](https://restfulapi.net/resource-naming/)
* [Building a REST API Video Tutorial](https://www.youtube.com/watch?v=pKd0Rpw7O48)