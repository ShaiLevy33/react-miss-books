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
            {/* <h1>Car Vendor: {car.vendor}</h1>
            <h1>Car Speed: {car.speed}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <img src={`../assets/img/${car.vendor}.png`} alt="car-image" />
            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/car/${car.prevCarId}`}>Prev Car</Link></button>
                <button ><Link to={`/car/${car.nextCarId}`}>Next Car</Link></button>
            </section> */}
        </section>
    )

}