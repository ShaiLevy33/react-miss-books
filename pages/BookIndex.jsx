const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/bookService.service.js'

export function BookDetails() {

    const [book, setBook] = useState(null)  
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


    useEffect(() => {
        loadBook()
    }, []) 

    function loadBook() {
        const bookId = 1
        bookService.getById(bookId)
            .then(book => setBook(book))
            bookService.query(filterBy)
            .then(setBook)
            .catch(err => {
                console.log('Cannot get books:', err)
            })
    }

    return (
        <section className="book-index">
            {/* <CarFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <Link to="/car/edit">Add Car</Link>
            <CarList
                cars={cars}
                onRemoveCar={onRemoveCar}
            /> */}
        </section>
    )

}