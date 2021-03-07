import React from "react";
import "./BookDetails.css"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookDetails(props) {
    return (
        <Container style={{ width: "100%" }}>
            <FakeNavBar>

            </FakeNavBar>
            <Container style={{ maxWidth: "1024px", margin: "auto" }} class="d-flex justify-content-center">
                <Row>
                    <Col>
                        <BookImage style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} />
                    </Col>
                    <Col>
                        <h1 style={{ margin: "0" }} class="gt-bd-title">What's Mine and Yours</h1>
                        <h6>by <a href="https://getbootstrap.com/docs/4.0/utilities/text/">Naima Coster</a></h6>
                        <h6 style={{ color: "gray" }}> Grand Central Publishing, 2021-03-02 </h6>
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
                    <Col>1 of 1</Col>
                    <Col>1 of 1</Col>
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
        <div style={{ backgroundColor: "gray", height: "50px", width: "100%", marginBottom: "1.3rem" }}>

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