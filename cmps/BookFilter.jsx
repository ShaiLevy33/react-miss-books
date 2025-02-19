import { bookService } from "../services/bookService.service.js"

const { useState, useEffect   } = React


export function BookFilter({ filterBy, onSetFilter }) {

    // const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    // useEffect(() => {
    //     onSetFilter(filterByToEdit)
    // }, [filterByToEdit])


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
        onSetFilter({ ...filterBy, [field]: value })
    }

    // const { title, price } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={(ev) => ev.preventDefault()}>
                <label htmlFor="title">Title of the Book</label>
                <input onChange={handleChange} type="text" name="title" id="txt" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} type="number" name="price" id="price" />

                {/* <button>Submit</button> */}
            </form>
        </section>
    )
}
