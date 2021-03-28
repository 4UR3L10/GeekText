import React, { useState, useEffect, useRef } from "react";
import "./BookDetails.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useParams } from "react-router-dom";
import LoadingPage from './components/LoadingPage';
import Overlay from 'react-bootstrap/Overlay';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from './components/Rating';

const textBodyStyle = {
    margin: "1.5rem",
    fontWeight: "500",
    textAlign: "left",
    fontSize: "1em"
}

function BookDetails(props) {
    const { bookId } = useParams();
    const { userId } = props;
    const [book, setBook] = useState(null);
    const [readMore, setReadMore] = useState(false);
    const [hover, setHover] = useState(false);
    const [showLargeImage, setShowLargeImage] = useState(false);
    const [showCartNotif, setShowCartNotif] = useState(false);
    const cartTarget = useRef(null);
    const [cartError, setCartError] = useState(false);
    const [showWishlistSelect, setShowWishlistSelect] = useState(false);
    const [wishlists, setWishlists] = useState([]);
    const [wishlistError, setWishlistError] = useState(false);
    const [showWishlistNotif, setShowWishlistNotif] = useState(false);
    const wishlistTarget = useRef(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getBook()
            .then(() => {
                getComments()
            })
    }, []);

    function getBook() {
        return fetch(`http://localhost:4000/api/books/${bookId}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setBook(response[0]);
            })
            .catch((err) => console.log(err));
    };

    function getWishlists() {
        return fetch(`http://localhost:4000/api/wishlists/user/${userId}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setWishlists(json);
            })
    }

    function addToWishlist(wishlist_id) {
        return fetch(`http://localhost:4000/api/wishlists/list/${wishlist_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wishlist_id: wishlist_id,
                book_id: bookId,
            })
        })
    }

    function getComments() {
        fetch(`http://localhost:4000/api/books/${bookId}/reviews`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response)
                setComments(response);
            })
            .catch((err) => console.log(err));
    }

    function handleBookClick() {
        setShowLargeImage(true);
        setHover(false);
    }

    function handleAddShoppingCart() {
        fetch(`http://localhost:4000/api/users/${userId}/cart`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                book_id: bookId,
                cart_quantity: 1,
            })
        })
            .then(response => {
                setCartError(!response.ok)
                setShowCartNotif(true);
                setTimeout(() => { setShowCartNotif(false) }, 3000)
            })
            .catch((err) => {
                console.log(err);
            })

    }

    function handleWishlistModalClick() {
        //show wishlist modal
        getWishlists()
            .then(() => {
                setShowWishlistSelect(true);
            })
    }

    function handleWishlistClick(index) {
        addToWishlist(wishlists[index].id)
            .then((response) => {
                setShowWishlistSelect(false)
                setWishlistError(!response.ok);
                setShowWishlistNotif(true);
                setTimeout(() => { setShowWishlistNotif(false) }, 3000)
            })
            .catch((err) => console.log(err))
    }

    function WishlistSelect() {
        return (
            <Modal show={showWishlistSelect}
                onHide={() => setShowWishlistSelect(false)}
            >
                <Modal.Header closeButton >
                    <Modal.Title>Select a Wishlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {wishlists.length === 0 ? <>You have no wishlists</> :
                        <ListGroup>
                            {wishlists.map((list, index) =>
                                <ListGroup.Item key={index} action
                                    onClick={() => { handleWishlistClick(index) }}>
                                    {list.wishlist_name}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    }

                </Modal.Body>
            </Modal>
        );
    }


    function LargeBookImage() {
        return (
            <Modal show={showLargeImage} onHide={() => setShowLargeImage(false)}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <img src={book.cover} style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }} />
                </Modal.Body>
            </Modal>
        );
    }

    function BookImage(props) {
        return (
            <a href="javascript:void(0)" onClick={handleBookClick}>
                <img src={book.cover}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    class="gt-bd-book-img"
                    style={{
                        display: "block", marginLeft: "auto", marginRight: "auto",
                        maxHeight: "500px", maxWidth: "100%", padding: "5px",
                        ...(hover) && { borderStyle: "solid", borderColor: "black", borderWidth: "2px" },
                    }} />
            </a>
        );
    }

    function ShoppingCartNotificaiton() {
        return (
            <Overlay target={cartTarget.current} show={showCartNotif} placement="top">
                {(props) => (
                    <div
                        {...props}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.50)',
                            padding: '10px 10px',
                            color: 'black',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        {cartError ?
                            "Book already in cart."
                            : "Successfully added book to cart."}
                    </div>
                )}
            </Overlay>
        );
    }

    function WishlistNotificaiton() {
        return (
            <Overlay target={wishlistTarget.current} show={showWishlistNotif} placement="top">
                {(props) => (
                    <div
                        {...props}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.50)',
                            padding: '10px 10px',
                            color: 'black',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        {wishlistError ?
                            "Book already in wishlist."
                            : "Successfully added book to wishlist."}
                    </div>
                )}
            </Overlay>
        );
    }

    function Comment(props) {
        return (
            <ListGroup.Item>

            </ListGroup.Item>
        );
    }

    return (
        <Container style={{ width: "100%" }}>

            <FakeNavBar />
            {!book ? <LoadingPage /> :
                <Container style={{ maxWidth: "1024px", margin: "auto" }}>
                    <Row>
                        <Col>
                            <BookImage />
                        </Col>
                        <Col>
                            <h1 className="gt-bd-title">{book.book_title}</h1>
                            <h6>by <a href={`/author/${book.author_id}`} >
                                {book.author_name}
                            </a> </h6>
                            <h6 style={{ color: "gray" }}> {book.publisher_name}, {book.published_date.substring(0, 10)}, {book.genre}</h6>
                            <Rating rating={book.avg_rating} />
                            <hr class="gt-bd-hr" />
                            <h6 style={{ fontWeight: "500", marginBottom: "0rem", fontFamily: "Lato,sans-serif" }}>
                                <b>Price</b>
                            </h6>
                            <Row>
                                <Col xs={3} md="auto">
                                    <div>
                                        <span className="gt-bd-price-span" style={{ fontSize: "2rem", marginBottom: "2rem" }}>
                                            <sup>$</sup>
                                            {book.price.toFixed(2)}
                                        </span>
                                    </div>
                                </Col>
                                <Col xs={4} style={{ paddingLeft: '0' }} md="auto">
                                    <Button ref={cartTarget} onClick={handleAddShoppingCart}>
                                        Add to Cart
                                    </Button>
                                    <ShoppingCartNotificaiton />
                                </Col>
                                <Col xs={4} style={{ paddingLeft: '0' }} md="auto">
                                    <Button ref={wishlistTarget} variant="outline-primary"
                                        onClick={handleWishlistModalClick}>
                                        Add to Wishlist
                                    </Button>
                                    <WishlistNotificaiton />
                                </Col>
                                <Col xs={1} />

                            </Row>

                            <div dangerouslySetInnerHTML={{
                                __html: (!readMore) ? book.description.substring(0, 520) + "..." : book.description
                            }} />
                            <a onClick={() => setReadMore(!readMore)} role="button" href="javascript:void(0)">
                                {readMore ? "Read Less" : "Read More"}
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <div style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}>
                            <h2 className="gt-bd-title" style={{ fontSize: "1.5rem", marginBottom: "1rem", fontStyle: "italic" }}>
                                About the Author
                            </h2>
                            <div style={{ marginTop: "0rem", borderStyle: "solid", borderColor: "lightgray" }}>
                                <p style={textBodyStyle}
                                    dangerouslySetInnerHTML={{
                                        __html: book.author_bio
                                    }} />
                            </div>
                        </div>
                    </Row>
                    <div>
                        <h2 className="gt-bd-title" style={{ fontSize: "1.5rem", textAlign: "center", marginBottom: "20px" }}>
                            <Row>
                                <Col><hr></hr></Col>
                                <Col md="auto">Comments Review</Col>
                                <Col><hr></hr></Col>
                            </Row>
                        </h2>
                    </div>
                    <LargeBookImage />
                    <WishlistSelect />
                </Container>
            }

        </Container>

    );


}



function FakeNavBar() {
    return (
        <div style={{ backgroundColor: "white", height: "50px", width: "100%", marginBottom: "1.3rem" }}>

        </div>
    );
}

export default BookDetails;