import React, { useState, useEffect } from "react";
import "./BookDetails.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from "react-router-dom";

function BookDetails(props) {
    const { bookId } = useParams();
    const { userId } = props;
    const [book, setBook] = useState(null);
    const [readMore, setReadMore] = useState(false);
    const [hover, setHover] = useState(false);
    const [showLargeImage, setShowLargeImage] = useState(false);

    useEffect(() => {
        getBook();
    }, []);

    function getBook() {
        fetch(`http://localhost:4000/api/books/${bookId}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setBook(response[0]);
            })
            .catch((err) => console.log(err));
    };

    function handleBookClick() {
        setShowLargeImage(true);
        setHover(false);
    }

    function handleAddShoppingCart() {
        fetch(`http://localhost:4000/api/users/${userId}/cart`, {
            method: 'POST',
            mode: 'cors',
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
            console.log(response)
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

    function LoadingPage() {
        return (
            <div style={{height: "200px"}}>
                <Spinner style={{
                    marginLeft: "auto", 
                    marginRight: "auto", 
                    marginTop: "200px", 
                    display: "block",
                    }} animation="border"/>
            </div>
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

    return (
        <Container style={{ width: "100%" }}>
            <FakeNavBar />
            {!book ? <LoadingPage /> :
                <Container style={{ maxWidth: "1024px", margin: "auto" }} class="d-flex justify-content-center">
                    <Row>
                        <Col>
                            <BookImage />
                        </Col>
                        <Col>
                            <h1 class="gt-bd-title">{book.book_title}</h1>
                            <h6>by <a href="https://getbootstrap.com/docs/4.0/utilities/text/">{book.author_name}</a></h6>
                            <h6 style={{ color: "gray" }}> {book.publisher_name}, {book.published_date.substring(0, 10)}, {book.genre}</h6>
                            <h6><u>Rating:</u> {book.avg_rating}</h6>
                            <hr class="gt-bd-hr" />
                            <Row>
                                <Col>
                                    <div>
                                        <h6 style={{ fontWeight: "500", marginBottom: "0rem", fontFamily: "Lato,sans-serif" }}>
                                            <b>Price</b>
                                        </h6>
                                        <span class="gt-bd-price-span" style={{ fontSize: "2rem", marginBottom: "2rem" }}>
                                            <sup>$</sup>
                                            {book.price}
                                        </span>
                                    </div>
                                </Col>
                                <Col>
                                    <div style={{textAlign: "center"}}>
                                        <Button onClick={handleAddShoppingCart}>
                                            Add to Shopping Cart
                                        </Button>
                                    </div>

                                </Col>

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
                            <h2 class="gt-bd-title" style={{ fontSize: "1.5rem", marginBottom: "1rem", fontStyle: "italic" }}>
                                About the Author
                            </h2>
                            <div style={{ marginTop: "0rem", borderStyle: "solid", borderColor: "lightgray" }}>
                                <p style={{ margin: "1.5rem" }} dangerouslySetInnerHTML={{
                                    __html: book.author_bio
                                }} />
                            </div>
                        </div>
                    </Row>
                    <LargeBookImage />
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