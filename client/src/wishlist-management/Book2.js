import React, {useState, useEffect} from 'react'
import './MyStyles.css'



export default function Book2({info, remove, wishlist_id, list ,move, cart}) {


    function Remove()
    {
        remove(wishlist_id, info[0].book_id)
    }

    function moveIt(moveID)
    {
        move(moveID, wishlist_id, info[0].book_id)
    }

    function addCart()
    {
        cart(info[0].book_id)
    }

    return (
        <div>
            <div className = "list">
                <img className = "bookimage" src = {info[0].cover}/>
                <div className = "listdescription">
                    <div className = "title">{info[0].book_title}</div>
                    <div className = "author">By: {info[0].author_name}</div>
                    <div className = "price">${info[0].price}</div>
                </div>
                <div className = "listbuttons">
                    <button onClick = {() => addCart()} className = "addtoCart">Cart++</button>
                    <button onClick = {() => Remove()}className = "remove">Book--</button>   

                    {list.length != 0 &&    
                    <div>
                        <h2>Move To</h2>
                        {list.map((name,idx) => (<button key = {idx} onClick = {() => moveIt(name.id)} className = "moveButton" >{name.wishlist_name}</button>))}
                    </div>}
                </div>
            </div>
        </div>
    )
}
