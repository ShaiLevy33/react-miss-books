
import { bookService } from "../services/bookService.service.js"
import { showErrorMsg, showSuccessMsg ,} from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
            .finally(() => setIsLoading(false))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(bookToSave => {
                console.log(`Book (${bookToSave.id}) Saved!`)
                showSuccessMsg(`Book (${bookId}) saved!`)
            })
            .catch(err => {
                console.log('Cannot save book:', err)
                showErrorMsg('Cannot save book')
            })
            .finally(() => navigate('/book'))
    }


    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }


    const { title, price } = bookToEdit
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className={`book-edit ${loadingClass}`}>
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="price">Price</label>
                <input value={price} onChange={handleChange} type="number" name="price" id="price" />
                <section className="btns flex">
                    <button>Save</button>
                    <button type="button" className="back-btn" ><Link to="/book">Back</Link></button>
                </section>
            </form>
        </section>
    )

}