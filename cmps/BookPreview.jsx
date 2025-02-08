export function BookPreview({ book }) {

    return (
        <article className="book-preview">
            <h2>Book's name: {book.title}</h2>
            <h4>Book's Maximal price: {book.listPrice.amount}</h4>
            <img src={`${book.thumbnail}`} alt="book-image" />
        </article>
    )
}