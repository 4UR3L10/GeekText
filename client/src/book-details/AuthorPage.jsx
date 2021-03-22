import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Media from 'react-bootstrap/Media';
import LoadingPage from './components/LoadingPage';
import { useParams } from "react-router-dom";



function AuthorPage(props) {
    const { authorId } = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getAuthorBooks();
    }, []);

    function BookListItem(props) {
        console.log(props);
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

    function getAuthorBooks() {
        fetch(`http://localhost:4000/api/authors/${authorId}/books`)
            .then((response) => response.json())
            .then((data) => {
                setBooks(data)
            })
            .catch((err) => console.log(err));
    };
    return (
        <Container style={{ maxWidth: "1024px", margin: "auto" }} >
            { books.length <= 0 ? <LoadingPage /> :
                <div>
                    {books.map((book, idx) => (
                        <BookListItem idx={idx} />
                    ))}
                </div>
            }
        </Container>
    );
}



export default AuthorPage;