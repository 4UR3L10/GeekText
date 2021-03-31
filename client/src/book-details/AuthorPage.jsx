import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Media from 'react-bootstrap/Media';
import LoadingPage from './components/LoadingPage';
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Rating from './components/Rating';


function AuthorPage(props) {
    const { authorId } = useParams();
    const [books, setBooks] = useState([]);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        getAuthorInfo()
            .then(() => {
                getAuthorBooks();
            })

    }, []);

    function getAuthorBooks() {
        return fetch(`http://localhost:4000/api/authors/${authorId}/books`)
            .then((response) => response.json())
            .then((data) => {
                setBooks(data)
            })
            .catch((err) => console.log(err));
    };

    function getAuthorInfo() {
        return fetch(`http://localhost:4000/api/authors/${authorId}`)
            .then((response) => response.json())
            .then((data) => {
                setAuthor(data[0])
            })
            .catch((err) => console.log(err));
    }

    function BookListItem(props) {
        return (
            <ListGroup.Item key={props.idx}>
                <Row>
                    <Col md="auto">
                        <a href={`http://localhost:3000/books/${books[props.idx].book_id}`}>
                        <img
                            src={books[props.idx].cover}
                            alt="Generic placeholder"
                            style={{
                                maxHeight: "200px", maxWidth: "100%", padding: "5px",
                            }}
                        />
                        </a>
                    </Col>
                    <Col>
                        <div>
                            <h5 className="gt-bd-title" style={{ fontSize: "1.3rem" }}>
                                <a
                                    class="text-dark"
                                    href={`http://localhost:3000/books/${books[props.idx].book_id}`}
                                >
                                    {books[props.idx].book_title}
                                    <span
                                        style={{
                                            color: "#727272",
                                            fontWeight: "300",
                                            fontSize: ".9375rem"
                                        }}
                                    >
                                        {` (${books[props.idx].published_date.substring(0, 10)})`}
                                    </span>
                                </a>
                                <h6>by <a href={`/author/${authorId}`} class="text-info">
                                    {books[props.idx].author_name}
                                </a> </h6>

                            </h5>
                            <Rating rating={books[props.idx].avg_rating} />
                        </div>

                    </Col>
                </Row>
            </ListGroup.Item>

        );
    }

    function AuthorDescription(props) {
        return (
            <div style={{ marginTop: "30px" }}{...props}>
                <h1 className="gt-bd-title" style={{ marginBottom: "10px" }}>
                    {`${author.author_name} Books`}
                </h1>
                <div dangerouslySetInnerHTML={{ __html: author.author_bio }}
                    style={{ marginBottom: "30px" }}
                />
            </div>
        )
    }


    return (
        <Container style={{ maxWidth: "1024px", margin: "auto" }} >
            {author && <AuthorDescription />}
            { books.length <= 0 ? <LoadingPage /> :
                <div>
                    <h2 className="gt-bd-title" style={{ fontSize: "1.5rem", textAlign: "center", marginBottom: "20px" }}>
                        <Row>
                            <Col><hr></hr></Col>
                            <Col md="auto">All Books</Col>
                            <Col><hr></hr></Col>
                        </Row>
                    </h2>
                    <ListGroup variant="flush">
                        {books.map((book, idx) => (
                            <BookListItem key={idx} idx={idx} />
                        ))}
                    </ListGroup>

                </div>
            }
        </Container>
    );
}



export default AuthorPage;