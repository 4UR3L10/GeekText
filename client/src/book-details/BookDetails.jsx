import React from "react";

function BookDetails(props) {
    return (
        <div>
            {props.match.params.bookId}
        </div>
    );
}

export default BookDetails;