import React, { useState, useEffect } from "react";
import "./BookDetails.css"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

//500 chars max for for book desc

function BookDetails(props) {
    const [book, setBook] = useState(null);

    useEffect(() => {
        getBook();
    }, []);

    function getBook() {
        fetch(`http://localhost:4000/api/books/${props.match.params.bookId}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setBook(response[0]);
            })
            .catch((err) => console.log(err));
    };

    return (

        <Container style={{ width: "100%" }}>
            <FakeNavBar />
            {book  &&
                <Container style={{ maxWidth: "1024px", margin: "auto" }} class="d-flex justify-content-center">
                    <Row>
                        <Col>
                            <BookImage class="gt-bd-book-img" style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} />
                        </Col>
                        <Col>
                            <h1 class="gt-bd-title">{book.book_title}</h1>
                            <h6>by <a href="https://getbootstrap.com/docs/4.0/utilities/text/">Naima Coster</a></h6>
                            <h6 style={{ color: "gray" }}> Grand Central Publishing, 2021-03-02, {book.genre}</h6>
                            <h6><u>Rating:</u> {book.avg_rating}</h6>
                            <hr class="gt-bd-hr" />
                            <h6 style={{ fontWeight: "500", marginBottom: "0rem", fontFamily: "Lato,sans-serif" }}>
                                <b>Price</b>
                            </h6>
                            <span class="gt-bd-price-span" style={{ fontSize: "2rem", marginBottom: "2rem" }}>
                                <sup>$</sup>
                            {book.price}
                        </span>
                            <p>
                                Bacon ipsum dolor amet doner picanha tri-tip biltong leberkas salami meatball tongue filet mignon landjaeger tail. Kielbasa salami tenderloin picanha spare ribs, beef ribs strip steak jerky cow. Pork chop chicken ham hock beef ribs turkey jerky. Shoulder
                                beef capicola doner, tongue tail sausage short ribs andouille. Rump frankfurter landjaeger t-bone, kielbasa doner ham hock shankle venison. Cupim capicola kielbasa t-bone, ball tip chicken andouille venison pork chop doner bacon beef ribs kevin shankle.
                                Short loin leberkas tenderloin ground round shank, brisket strip steak ham hock ham.
                        </p>

                        </Col>
                    </Row>
                    <Row>
                        <div style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}>
                            <h2 class="gt-bd-title" style={{ fontSize: "1.5rem", marginBottom: "1rem", fontStyle: "italic" }}>
                                About the Author
                        </h2>
                            <div style={{ marginTop: "0rem", borderStyle: "solid", borderColor: "lightgray" }}>
                                <p style={{ margin: "1.5rem" }}>
                                    Bacon ipsum dolor amet doner picanha tri-tip biltong leberkas salami meatball tongue filet mignon landjaeger tail. Kielbasa salami tenderloin picanha spare ribs, beef ribs strip steak jerky cow. Pork chop chicken ham hock beef ribs turkey jerky. Shoulder
                                    beef capicola doner, tongue tail sausage short ribs andouille. Rump frankfurter landjaeger t-bone, kielbasa doner ham hock shankle venison. Cupim capicola kielbasa t-bone, ball tip chicken andouille venison pork chop doner bacon beef ribs kevin shankle.
                                    Short loin leberkas tenderloin ground round shank, brisket strip steak ham hock ham.
                            </p>
                            </div>
                        </div>
                    </Row>
                </Container>
            }
        </Container>
    );

    function BookImage(props) {
        return (
            <img src={book.cover}
                {...props}></img>
        );
    }
}



function BookDetails_(props) {
    const [book, setBook] = useState(null);

    useEffect(() => {
        getBook();
    }, []);

    function getBook() {
        fetch(`http://localhost:4000/api/books/${props.match.params.bookId}`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setBook(response);
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container style={{ width: "100%" }}>
            <FakeNavBar />
            <Container style={{ maxWidth: "1024px", margin: "auto" }} class="d-flex justify-content-center">
                <Row>
                    <Col>
                        <BookImage style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} />
                    </Col>
                    <Col>
                        <h1 class="gt-bd-title">What's Mine and Yours</h1>
                        <h6>by <a href="https://getbootstrap.com/docs/4.0/utilities/text/">Naima Coster</a></h6>
                        <h6 style={{ color: "gray" }}> Grand Central Publishing, 2021-03-02, Romance </h6>
                        <h6><u>Rating:</u> 5</h6>
                        <hr class="gt-bd-hr" />
                        <h6 style={{ fontWeight: "500", marginBottom: "0rem", fontFamily: "Lato,sans-serif" }}>
                            <b>Price</b>
                        </h6>
                        <span class="gt-bd-price-span" style={{ fontSize: "2rem", marginBottom: "2rem" }}>
                            <sup>$</sup>
                            23.99
                        </span>
                        <p>
                            Bacon ipsum dolor amet doner picanha tri-tip biltong leberkas salami meatball tongue filet mignon landjaeger tail. Kielbasa salami tenderloin picanha spare ribs, beef ribs strip steak jerky cow. Pork chop chicken ham hock beef ribs turkey jerky. Shoulder
                            beef capicola doner, tongue tail sausage short ribs andouille. Rump frankfurter landjaeger t-bone, kielbasa doner ham hock shankle venison. Cupim capicola kielbasa t-bone, ball tip chicken andouille venison pork chop doner bacon beef ribs kevin shankle.
                            Short loin leberkas tenderloin ground round shank, brisket strip steak ham hock ham.
                        </p>

                    </Col>
                </Row>
                <Row>
                    <div style={{ marginTop: "2.5rem" }}>
                        <h2 class="gt-bd-title" style={{ fontSize: "1.5rem", marginBottom: "1rem", fontStyle: "italic" }}>
                            About the Author
                        </h2>
                        <div style={{ marginTop: "0rem", borderStyle: "solid", borderColor: "lightgray" }}>
                            <p style={{ margin: "1.5rem" }}>
                                Bacon ipsum dolor amet doner picanha tri-tip biltong leberkas salami meatball tongue filet mignon landjaeger tail. Kielbasa salami tenderloin picanha spare ribs, beef ribs strip steak jerky cow. Pork chop chicken ham hock beef ribs turkey jerky. Shoulder
                                beef capicola doner, tongue tail sausage short ribs andouille. Rump frankfurter landjaeger t-bone, kielbasa doner ham hock shankle venison. Cupim capicola kielbasa t-bone, ball tip chicken andouille venison pork chop doner bacon beef ribs kevin shankle.
                                Short loin leberkas tenderloin ground round shank, brisket strip steak ham hock ham.
                            </p>
                        </div>
                    </div>
                </Row>
            </Container>
        </Container>
    );

    function BookImage(props) {
        return (
            <img src="https://prodimage.images-bn.com/pimages/9781538702345_p0_v3_s550x406.jpg"
                {...props}></img>
        );
    }
}

function FakeNavBar() {
    return (
        <div style={{ backgroundColor: "white", height: "50px", width: "100%", marginBottom: "1.3rem" }}>

        </div>
    );
}

function BookDetailsOld(props) {
    return (
        <div class="gt-bd-page-container">
            <div style={{ display: "flex" }} class="gt-bd-book-details-container">
                <div class="gt-bd-book-image-container">
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <img src="https://prodimage.images-bn.com/pimages/9781538702345_p0_v3_s550x406.jpg" />

                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }} class="gt-bd-book-image-container">
                    <h1 style={{ margin: "0" }} class="gt-bd-title">What's Mine and Yours</h1>
                    {/* {props.match.params.bookId} */}
                    <div>
                        by Naima Coster
            </div>
                    <div>
                        Rating: 4
            </div>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;