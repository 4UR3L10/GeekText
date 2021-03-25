import React from 'react';
import BookCard from './BookCard';

const BookList = (props) => {
    return (
        //rendering out all the book cards we want to render with data from API
        <div className = "List">
            {
                props.books.map((book, i) =>{
                    return <BookCard 
                    //all props below are what will be rendered on screen
                    //inside the curly braces are what will be changed based on API
                        key = {i}
                        image = {book.cover}
                        title = {book.book_title}
                        author = {book.author_name}
                        published = {book.published_date}
                        rating = {book.avg_rating}
                        price = {book.price}
                        genre = {book.genre}
                        id = {book.book_id}
                        />
                })
            }
        </div>
    )
}

export default BookList;


//to get the rating later, look at the console log to get all the details