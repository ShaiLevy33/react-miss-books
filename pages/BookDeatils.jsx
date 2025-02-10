import { bookService } from "../services/bookService.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadCar()
    }, [params.carId])

    function loadCar() {
        setBook(null)
        bookService.get(params.id)
            .then(setBook)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }


    // console.log('Details render')

    if (!book) return <div className="loader">Loading...</div>

    return (
        <section className="book-details">
            <h1>Title: {book.title}</h1>
            <h1>Subtitle: {book.subtitle}</h1>
            <section>
                {book.authors && book.authors.map((author, index) => (
                    <h1 key={index}>{author}</h1>
                ))}
            </section>
            <h1>publishedDate: {book.publishedDate}</h1>
            <p>{book.description}</p>

            <img src={book.thumbnail} alt="book-image" />
            <button onClick={onBack}>Back</button>
            {/* <section>
                <button ><Link to={`/car/${car.prevCarId}`}>Prev Car</Link></button>
                <button ><Link to={`/car/${car.nextCarId}`}>Next Car</Link></button>
            </section> */}
        </section>
    )

}