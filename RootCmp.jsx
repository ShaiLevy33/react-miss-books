const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM


import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
 import { BookDetails } from "./pages/BookDetails.jsx"

export function RootCmp() {
    return (
        <Router>
        <section className="app">
            <AppHeader />
            <main className="main-layout">
                <Routes>
                 <Route path="/" element={<Navigate to="/home" />} />
                 <Route path="/home" element={<Home />} />
                 <Route path="/about" element={<About />} />
                 <Route path="/book" element={<BookIndex />} />
                     {/* <Route path="/book/:bookId" element={<BookDetails />} /> */}
                </Routes>
            </main>
        </section>
        </Router>
    )
}