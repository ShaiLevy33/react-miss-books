const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/bookService.service.js'
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"

export function BookIndex() {

    const [books, setBooks] = useState(null)  
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


    useEffect(() => {
        console.log('filterBy:', filterBy);
        
        loadBook()
    }, [filterBy]) 

    function loadBook() {
        

            bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Cannot get books:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Cannot remove book:', err)
            })
    }

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div className="loader">Loading...</div>
    return (
        <section className="book-index">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            {/* <Link to="/car/edit">Add Car</Link> */}
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )

}