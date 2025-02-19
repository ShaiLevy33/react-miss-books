const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { bookService } from '../services/bookService.service.js'
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { showErrorMsg, showSuccessMsg, } from "../services/event-bus.service.js"


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


    const { useSearchParams } = ReactRouterDOM
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = bookService.getFilterFromSearchParams(searchParams)
    useEffect(() => {
        setSearchParams(filterBy)
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load books')
            })
    }, [filterBy])




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
                showSuccessMsg(`Book (${bookId}) removed!`)
            })
            .catch(err => {
                console.log('Cannot remove book:', err)
                showErrorMsg('Problems removing book')
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