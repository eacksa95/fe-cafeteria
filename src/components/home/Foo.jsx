import {Link} from 'react-router-dom'

export const Foo = () => {
    return (
            <>
            <footer>
                <div>
                    <button type="submit"> <span>
                    <Link to="/about" className='aboutLink'>Nosotros</Link>
                    </span></button>
                </div>
                <div>
                    <button type="submit"> <span>
                    <Link to="/contact" className='aboutLink'>Contacto</Link>
                    </span></button>
                </div>
            </footer>
            </>
    )
}