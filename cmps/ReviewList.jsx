// import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function ReviewList({ reviews, onRemoveReview }) {

    const ulAttributes = {
        // title: 'Some Pop Up',
        className: 'review-list'
    }
    function onCloseReview() {
    }
    
    return (
        <ul {...ulAttributes}>
            {reviews.map(review =>
                <li key={review.id}>
                    
                    <button onClick={() => onRemoveReview(review.id)} className="close-btn">X</button>
                    <div>{review.fullName}</div>
                    <div>{review.rating}</div>
                    <div>{review.readAt}</div>
                    <label htmlFor="explain">Explain</label>
                    <input type="text" inputMode="text" id="explain" name="explain" value={review.explain}></input>
                    {/* <button onClick={onCloseReview} className="close-btn">X</button> */}
                
                </li>
            )}
        </ul>
    )
}