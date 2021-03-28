import React from "react";

function starPercetage(idx, rating) {
    let percetage = rating - idx < 0 ? 0 :
        rating - idx > 1 ? 1 : rating - idx
    return percetage * 100
}

function Rating(props) {
    let { rating } = props;
    rating = isNaN(rating) ? 0 : rating
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="75" height="15">
            <defs>
                {[1, 2, 3, 4, 5].map((id, idx) => {
                    return <linearGradient id={`star${id}`}>
                        <stop offset={`${starPercetage(idx, rating)}%`} stop-color="#ffbd00" />
                        <stop offset={`${starPercetage(idx, rating)}%`} stop-color="#ededed" />
                    </linearGradient>
                })}
            </defs>
            <path
                d="M 7.5,0.25 9.375,6 H 15 l -4.625,3.25 1.875,5.625 -4.75,-3.5 -4.75,3.5 L 4.625,9.25 0,6 h 5.625 z"
                style={{ fill: "url(#star1)" }}
            />
            <path
                d="M 22.5,0.2499999 24.375,6 H 30 l -4.625,3.25 1.875,5.625 -4.75,-3.5 -4.75,3.5 L 19.625,9.25 15,6 h 5.625 z"
                style={{ fill: "url(#star2)" }}
            />
            <path
                d="M 37.5,0.2499999 39.375,6 H 45 l -4.625,3.25 1.875,5.625 -4.75,-3.5 -4.75,3.5 L 34.625,9.25 30,6 h 5.625 z"
                style={{ fill: "url(#star3)" }}
            />
            <path
                d="M 52.5,0.24999993 54.375,6 H 60 l -4.625,3.25 1.875,5.625 -4.75,-3.5 -4.75,3.5 L 49.625,9.25 45,6 h 5.625 z"
                style={{ fill: "url(#star4)" }}
            />
            <path
                d="M 67.5,0.2499999 69.375,6 H 75 L 70.375,9.2500004 72.25,14.875 67.5,11.375 62.75,14.875 64.625,9.2500004 60,6 h 5.625 z"
                style={{ fill: "url(#star5)" }}
            />

        </svg>
    );
}

export default Rating;