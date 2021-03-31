async function getBook(user_id) {

  try {
    const response = await fetch(`http://localhost:4000/api/users/${user_id}/cart`);
    const jsonResponse = await response.json();
    return jsonResponse;

  } catch (error) {
    return error;
  }
}

async function getSavedForLater(user_id) {

  try {
    const response = await fetch(`http://localhost:4000/api/users/${user_id}/saved-books`);
    const jsonResponse = await response.json();
    return jsonResponse;

  } catch (error) {
    return error;
  }
}

async function addSaveForLater(book_id, user_id) {

  try {
    const response = await fetch(`http://localhost:4000/api/users/${user_id}/saved-books`,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id,
          book_id: book_id,
        })

      });
    const jsonResponse = await response.json();
    return jsonResponse;

  } catch (error) {
    return error;
  }
}



async function updateQuantity(book_id, user_id, cart_quantity) {

  try {
    const response = await fetch(`http://localhost:4000/api/users/${user_id}/cart/${book_id}`,
      {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id,
          book_id: book_id,
          cart_quantity: cart_quantity,
        })

      });
    const jsonResponse = await response.json();
    return jsonResponse;

  } catch (error) {
    return error;
  }
}
async function deleteBook(book_id, user_id) {
  try {
    const response = await fetch(`http://localhost:4000/api/users/${user_id}/cart/${book_id}`, { method: "DELETE" });
    /* const jsonResponse = await response.json();*/
    return response;

  } catch (error) {
    return error;
  }
}
export {getSavedForLater}
export { addSaveForLater }
export { updateQuantity }
export { deleteBook }
export { getBook }