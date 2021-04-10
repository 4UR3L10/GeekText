import React, {useState, useEffect, useRef} from 'react';
import Booklist2 from './Booklist2';
import './MyStyles.css';
import Modal from 'react-modal';


let currentId = 0;
let name;
let WishlistName;
let userID = 0;
let newnameList;

Modal.setAppElement('#root')

export default function WishlistSelect() {
    

    const nameRef = useRef()
    const newName1 = useRef()
    const newName2 = useRef()
    const newName3 = useRef()
    const nameList = useRef()
    const [wishlists, setWishlists] = useState([]);
    const [ids, setIds] = useState([]);
    const [modalIsOpen, setmodalISOpen] = useState(false);
    const [add_modalIsOpen, setadd_modalISOpen] = useState(false);
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        getUserWish()
    }, [])

    function getUserWish()
    {
        userID = localStorage.getItem("UserID");
        console.log(userID)

        fetch(`http://localhost:4000/api/wishlists/user/${userID}`)
        .then((response) => response.json())
        .then((json) => {setWishlists(json)
        })
    }


    function displayList(id)
    {
        currentId = id;
         fetch(`http://localhost:4000/api/wishlists/list/${id}`  )
        .then((response) => response.json())
        .then((json) => {setIds(prevIds => (json.map((info,idx) => (info.book_id))))})
    }

    function addBook()
    {
        name = nameRef.current.value

        if (name === '')
        {
            return
        }

        if(currentId === null)
        {
            return
        }

        fetch(`http://localhost:4000/api/wishlists/list/${currentId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            book_id: name,
        })
        })
        .then((response) => response.json())
        .then((json) => {
            displayList(currentId)
        })

        nameRef.current.value = null

    }


    function handleRemove(wishlist_id, book_id)
    {
        console.log(wishlist_id)
        console.log(book_id)
        fetch(`http://localhost:4000/api/wishlists/list/${wishlist_id}/${book_id}`,
        {
            method: 'DELETE',
        })
        .then((json) => {
            displayList(currentId)
        })
    }


    function editName(settingID)
    {

        if(settingID === wishlists[0].id)
        {
            WishlistName = newName1.current.value

            if (WishlistName === '')
            {
                return;
            }

            handleRename(settingID)
            
            newName1.current.value = null

        }
        else if(settingID === wishlists[1].id)
        {
            WishlistName = newName2.current.value

            if (WishlistName === '')
            {
                return;
            }

            handleRename(settingID)

            newName2.current.value = null
            
        }
        else if(settingID === wishlists[2].id)
        {
            WishlistName = newName3.current.value

            if (WishlistName === '')
            {
                return;
            }

            handleRename(settingID)

            newName3.current.value = null
            
        }
        else
        {
            return;
        }
    }


    function handleRename(id)
    {
        fetch(`http://localhost:4000/api/wishlists/user/${userID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            user_id: userID,
            wishlist_name: WishlistName,
        })
        })
        .then((response) => response.json())
        .then((json) => {getUserWish()});

    }

    function handleNewList()
    {
        newnameList = nameList.current.value

        if (newnameList === '')
        {
            return
        }

        fetch(`http://localhost:4000/api/wishlists/user/${userID}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            wishlist_name: newnameList,
        })
        })
        .then((response) => response.json())
        .then((json) => {
            getUserWish()
        })

        nameList.current.value = null

    }

    function handleRemoveList(id)
    {
        fetch(`http://localhost:4000/api/wishlists/user/${userID}/${id}`,
        {
            method: 'DELETE',
        })
        .then((json) => {
            getUserWish()
        })
        .then((json)=> {
            displayList(0)
        })

    }


    function moveBook(moveTo, from, which)
    {
        fetch(`http://localhost:4000/api/wishlists/list/${moveTo}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            book_id: which,
        })
        })
        .then((response) => response.json())
        .then((json) => {console.log("done")
        })


        fetch(`http://localhost:4000/api/wishlists/list/${from}/${which}`,
        {
            method: 'DELETE',
        })
        .then((json) => {
            displayList(currentId)
        })

    }


    function addToCart(bookToCart)
    {
        fetch(`http://localhost:4000/api/users/${bookToCart}/cart`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userID,
            book_id: bookToCart,
            cart_quantity: 1,
        })
        })
        .then((response) => response.json())
        .then((json) => {
            alert("Book added to Shopping cart")
        })


    }


    return (
        
        <div>
            {userID === null &&
            <div className = "noBook">
                    <h1>You might want to sign in or sign up</h1>
            </div>}
        {wishlists.length > 0 &&
            <div className = "sub-navbar">
                {wishlists.map((name,idx) => (<button key = {idx} className = "wishlist-button" onClick = {()=>displayList(name.id)}>{name.wishlist_name}</button>))}
                {wishlists.length < 3 &&
                <button className = "wishlist-button" onClick = {() => setadd_modalISOpen(true)}>+</button>}
                <button className = "wishlist-button" onClick = {() => setmodalISOpen(true)}>Settings</button>
            </div>}

            {currentId != 0 &&
            <div className = "sub-navbar">
                <input className = "text" placeholder = 'Book ID' ref = {nameRef} type = "text"/>
                <button className = "addButton" onClick = {() => addBook()}>+</button>
            </div>}
            {ids != null &&
            <div>
                {ids.map(id => {return <Booklist2 key = {id} book = {id} remove = {handleRemove} wishlist_id = {currentId} lists = {wishlists} move = {moveBook} cart ={addToCart}/>})}
            </div>}
            {ids.length === 0 && currentId != 0 &&
            <div className = "noBook">
                <h1>There are no books here</h1>
                <h2>This wishlist is sad; it wants books</h2>
            </div>}

            <Modal className = "modal" isOpen = {modalIsOpen} onRequestClose = {() => setmodalISOpen(false)}>
                <div>
                    {wishlists.length > 0 &&
                    <div>
                        <div>
                            <h1>Wishlist Settings</h1>
                            {wishlists.length >= 1 &&
                            <div>
                                <h1>Wishlist #1</h1>
                                <input className = "wish_settingtext" placeholder = 'New Name' ref = {newName1} type = "text"/>
                                <button className = "settingaddButton" onClick = {()=>editName(wishlists[0].id)}>confirm</button>
                                <button className = "settingaddButton" onClick = {()=>handleRemoveList(wishlists[0].id)}>Remove</button>
                            </div>}

                            {wishlists.length >= 2 &&
                            <div>
                                <h1>Wishlist #2</h1>
                                <input className = "wish_settingtext" placeholder = 'New Name' ref = {newName2} type = "text"/>
                                <button className = "settingaddButton" onClick = {()=>editName(wishlists[1].id)}>confirm</button>
                                <button className = "settingaddButton" onClick = {()=>handleRemoveList(wishlists[1].id)}>Remove</button>
                            </div>}

                            {wishlists.length >= 3 &&
                            <div>
                                <h1>Wishlist #3</h1>
                                <input className = "wish_settingtext" placeholder = 'New Name' ref = {newName3} type = "text"/>
                                <button className = "settingaddButton" onClick = {()=>editName(wishlists[2].id)}>confirm</button>
                                <button className = "settingaddButton" onClick = {()=>handleRemoveList(wishlists[2].id)}>Remove</button>
                            </div>}
                        </div>
                    </div>}
                    </div>
                <div className = "wish_listbuttons">
                    <button className = "exitButton" onClick = {() => setmodalISOpen(false)}>x</button>
                </div>
            </Modal>

            <Modal className = "modal" isOpen = {add_modalIsOpen} onRequestClose = {() => setadd_modalISOpen(false)}>
                {wishlists.length < 3 && 
                    <div>
                        <h1>Add new wishlist</h1>
                        <input className = "wish_settingtext" placeholder = 'Name' ref = {nameList} type = "text"/>
                        <button onClick = {() => handleNewList()}className = "settingaddButton">ADD</button>
                    </div>}
                    <div className = "wish_listbuttons">
                    <button className = "exitButton" onClick = {() => setadd_modalISOpen(false)}>x</button>
                </div>

            </Modal>
            
        </div>
    )
}



