import React from "react";
import "./BookDetails.css"

function BookDetails(props) {
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