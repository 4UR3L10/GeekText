import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Media from 'react-bootstrap/Media';
import LoadingPage from './components/LoadingPage';
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";



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
            <a href={`http://localhost:3000/books/${books[props.idx].book_id}`} key={props.idx}>
                <Media >
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={books[props.idx].cover}
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>{books[props.idx].book_title}</h5>
                    </Media.Body>
                </Media>
            </a>

        );
    }

    function AuthorDescription(props) {
        return (
        <div style={{marginTop: "30px"}}{...props}>
            <h1 className="gt-bd-title" style={{marginBottom: "10px"}}>
                {`${author.author_name} Books`}
            </h1>
            <div dangerouslySetInnerHTML={{__html: author.author_bio}} 
            style={{marginBottom: "30px"}}
            />
        </div>
        )
    }

    
    return (
        <Container style={{ maxWidth: "1024px", margin: "auto" }} >
            <div ></div>
            {author && <AuthorDescription /> }
            { books.length <= 0 ? <LoadingPage /> :
                <div>
                    <h2 className="gt-bd-title" style={{fontSize: "1.5rem", textAlign: "center"}}> 
                        <Row>
                            <Col><hr></hr></Col>
                            <Col md="auto">All Books</Col>
                            <Col><hr></hr></Col>
                        </Row>
                    </h2>
                    {books.map((book, idx) => (
                        <BookListItem idx={idx} />
                    ))}
                </div>
            }
        </Container>
    );
}



export default AuthorPage;