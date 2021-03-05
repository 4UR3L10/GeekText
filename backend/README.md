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
## Adding to the REST API
Let's say, for example, I wanted to add a link (URI) called `/publishers` that gets all the publishers found in the
database, and I also wanted to add the link `/publishers/{id}` that get's a specific publisher based on the id.
How would I go about doing so?

### Step 1: Initialization
1. Create a file in the routes/ folder called `publishers.js`. 

2. In the file, paste the following import statements at the top of your file. 
These will be used to help achieve our goal.
    ```js
    const express = require('express')
    const mysqlx = require('@mysql/xdevapi');
    const credentials = require('./credentials');
    const { queryResultToJson } = require('./util');
    const router = express.Router();
    ...
    ```

3. At the very end of the file, add the following export statement. 
This export all the routes related to `/publishers`.
    ```js
    ...
    module.exports = router
    ```
    
4. In the `routes/route.js`, add at the end of the file the following. 
This statement imports publisher.js. Now, route.js has everything that 
publishers.js exports (which was the router in the previous step).
    ```js
    ...
    exports.publishers = require('./publishers');
    ```

5. Finally, in `server.js`, you will see a set of statements that have the form `app.use('api/...', ...)`.
Add the following directly underneath.
    ```js
    app.use('/api/books', route.books);
    app.use('/api/authors', route.authors);
    ...
    app.use('/api/publishers', route.publishers);   // Add this here
    ```

### Step 2: Create a test route
1. Now we should test to see if it works. In `routes/publishers.js`, add the following,
sandwiched in-between the import statements and the export statement.
    ```js
    ...
    router.get('/', function (req, res) {
      res.send('This is the publisher page!!');
    });
    ...
    ```

2. Start the server and in your browser, navigate to `localhost:4000/publishers`. You sould see the
message that was sent in the function above. `This is the publisher page!!`


## References
The following is a list of references used in the creation of the backend. 
I strongly recommend looking at these for more understanding of how to add to the backend.
* [How to design a REST API](https://restfulapi.net/rest-api-design-tutorial-with-example/)
* [REST Resource Naming Guide](https://restfulapi.net/resource-naming/)
* [Building a REST API Video Tutorial](https://www.youtube.com/watch?v=pKd0Rpw7O48)
