const { Link, Outlet } = ReactRouterDOM


export function About() {
    return (
        <section className="about">

            <h1>About Our Books...</h1>
            <p>Miss Books is a uniqe book web store that now is tiny but will be larger then Amzaon</p>
            <section>
                <Outlet />
            </section>
        </section>
    )
}