import React, {useState, useEffect, useRef} from 'react';



let WishlistName;
let userID = 6;
let currentId;

export default function Settings() {


    const newName1 = useRef()
    const newName2 = useRef()
    const newName3 = useRef()


    const [wishlists, setWishlists] = useState([]);


    useEffect(() => {
        getUserWish()
    }, [])

    function getUserWish()
    {
        fetch(`http://localhost:4000/api/wishlists/user/${userID}`)
        .then((response) => response.json())
        .then((json) => {setWishlists(json)
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
        fetch(`http://localhost:4000/api/wishlists/user/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            user_id: userID,
            wishlist_name: JSON.stringify(WishlistName),
        })
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }



    return (
        <div>
                <div>
                    {wishlists.length < 3 && 
                    <div>
                        <h1>Add new wishlist</h1>
                        <input className = "text" placeholder = 'Name' type = "text"/>
                        <button className = "addButton">ADD</button>
                    </div>}

                    {wishlists.length > 0 &&
                    <div>
                        <div>
                            <h1>Wishlist Settings</h1>
                            <div>
                                <h1>Wishlist #1</h1>
                                <input className = "settingtext" placeholder = 'New Name' ref = {newName1} type = "text"/>
                                <button className = "settingaddButton" onClick = {()=>editName(wishlists[0].id)}>confirm</button>
                            </div>
                            <div>
                                <h1>Wishlist #2</h1>
                                <input className = "settingtext" placeholder = 'New Name' ref = {newName2} type = "text"/>
                                <button className = "settingaddButton" onClick = {()=>editName(wishlists[1].id)}>confirm</button>
                            </div>
                            <div>
                                <h1>Wishlist #3</h1>
                                <input className = "settingtext" placeholder = 'New Name' ref = {newName3} type = "text"/>
                                <button className = "settingaddButton" onClick = {()=>editName(wishlists[2].id)}>confirm</button>
                            </div>
                        </div>
                    </div>}
                </div>
            
        </div>
    )
}
