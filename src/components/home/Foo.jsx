import { Link } from 'react-router-dom'
import React from 'react'

export const Foo = () => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}