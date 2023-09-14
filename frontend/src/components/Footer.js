function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="footer">
            <p className="footer__author">&copy;{year}. Denis Shesternev</p>
        </footer>
    )
}

export default Footer