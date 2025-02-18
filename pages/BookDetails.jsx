import { bookService } from "../services/bookService.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx";
import {AddReview} from "../cmps/AddReview.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx";

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [reviews, setReviews] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
        loadReviews()
    }, [params.id])

    function loadBook() {
        setBook(null)
        bookService.get(params.id)
            .then(setBook)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }
    function loadReviews() {
        bookService.queryReviews(params.id)
        .then(setReviews)
        .catch(err => {
        console.log('Cannot load reviews:', err)
    })
    }

    function onBack() {
        navigate('/book')
    }
    function onRemoveReview( reviewId) {
        bookService.removeReview(params.id,reviewId)
            .then(() => {
                setReviews(reviews => reviews.filter(review => review.id !== reviewId))
            })
            .catch(err => {
                console.log('Cannot remove review:', err)
            })

    }

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
    // console.log('Details render')

    if (!book) return <div className="loader">Loading...</div>

    const priceClass = book.listPrice.amount > 150 ? 'red-text' : book.listPrice.amount < 20 ? 'green-text' : '';

    return (
        <section className="book-details">
            <h1>Title: {book.title}</h1>
            <h1>Subtitle: {book.subtitle}</h1>
            <section>
                {book.authors && book.authors.map((author, index) => (
                    <h1 key={index}>{author}</h1>
                ))}
            </section>
            <h1>publishedDate: {book.publishedDate} { (currentYear - book.publishedDate) > 10 && 'Vintage'}
            { (currentYear - book.publishedDate) < 1 && 'Vintage'}
            </h1>
            <p>Description -</p>
            <LongTxt>{book.description}
            </LongTxt>
            <section>
                <h1>Number of Pages: {book.pageCount} {book.pageCount < 100 && 'Light Reading'}
                    {(book.pageCount < 500 &&  book.pageCount >= 100) && 'Descent Reading'}
                    {book.pageCount >= 500 && 'Serious Reading'} </h1>
            </section>
            <section>
                {book.categories && book.categories.map((category, index) => (
                    <h1 key={index}>{category}</h1>
                ))}
            </section>
            <h1>Language: {book.language}</h1>
            <h1 className={priceClass} >Price: {book.listPrice.amount}  {book.listPrice.currencyCode}</h1>
           <div>
            <img width="5%" src={book.listPrice.isOnSale && "assets/img/onSale.jpg"}></img>
            </div>
            {/* // <h1>Is On Sale: {book.listPrice.isOnSale}.toString()</h1> */}
            <div>
            <img src={book.thumbnail} alt="book-image" />
            </div>
            <h1>Add Review</h1>
            <AddReview bookId={book.id} onLoadReviews={loadReviews}></AddReview>
            {reviews && reviews.length > 0 && <h1>Book's Reviews</h1>}
            <ReviewList reviews={reviews} onRemoveReview={onRemoveReview}></ReviewList>
            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>


        </section>
    )

}