import { use } from "react"
import { bookService } from "../services/bookService.service.js"
import { showErrorMsg, showSuccessMsg ,} from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function AddReview(bookId, onLoadReviews) {
 
    const [fullName, setFullName] = useState("")
    const [rating, setRating] = useState("")
    const [readAt, setReadAt] = useState("")
    const [explain, setExplain] = useState("")
    const [review, setReviews] = useState(null)  

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!(fullName == "" || readAt == ""))
        {
            bookService.addReview(bookId ,fullName, rating , readAt , explain)
            showSuccessMsg(`Review of (${fullName}) added!`)
            onLoadReviews
        }
        else{
            showErrorMsg(`Review didn't added Full Name/ Read At field missing`)
        }
    }

    return (
        <section className="book-review">
            <form onSubmit={handleSubmit}>

                <label htmlFor="fullName">Full Name</label>
                <input type="text" name="fullName" id="fullName" onChange={(e) => setFullName(e.target.value)}></input>

                <label htmlFor="rating">Rating</label>
                {/* <select data-type="range" name="rating">
      <option disabled selected>Select one</option>
      <option>1 star</option>
      <option>2 stars</option>
      <option>3 stars</option>
      <option>4 stars</option>
      <option>5 stars</option>
    </select> */}
    {/* <!--<input type="range" name="rating" step="1" min="1" value="1" max="5" /> */}
    {/* <!--<output for="rating">0</output>--> <!-- append to input via JS --> */}
  {/* </section> */}
                <input type="range" min={1} max={5} defaultValue={1} name="rating" id="rating" onChange={(e) => setRating(e.target.value)}></input>

                <label htmlFor="readAt">Read At (Date)</label>
                <input type="date" name="readAt" id="readAt" onChange={(e) => setReadAt(e.target.value)}></input>

                <label htmlFor="explain">Explain</label>
                <input type="text" name="explain" id="explain" onChange={(e) => setExplain(e.target.value)}></input>

                <button>Submit</button>
            </form>

        </section>

    )
}