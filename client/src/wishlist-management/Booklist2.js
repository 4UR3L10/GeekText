import React, {useState, useEffect} from 'react';
import Book2 from './Book2'



export default function BookList2({book, remove, wishlist_id, lists, move, cart}) {

    useEffect(() => {
        getBook()
    }, [])


    const [details, setDetails] = useState([])

    function getBook()
    {
        if(book.length === 0)
        {
            return <h1>This list is empty</h1>
        }

            fetch(`http://localhost:4000/api/books/${book}`)
        .then((response) => response.json())
        .then((json) => {setDetails(json)});
    }


    return(    
        <div>
            {details.length > 0 &&
            <div>
                <Book2 info = {details} remove = {remove} wishlist_id = {wishlist_id} list = {lists.filter(list => list.id != wishlist_id)} move = {move} cart = {cart}/>
            </div>}
        </div>
        )
    
}
