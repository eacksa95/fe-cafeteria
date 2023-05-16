import React, { useState } from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
<Dropdown show={isOpen} onToggle={toggleDropdown} >
      <Dropdown.Toggle variant="secondary" id="dropdown-menu-toggle" className="dropdown-buttom" >
        <i className="bi bi-three-dots-vertical"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <Nav.Link as={Link} to="/pedidoslistos">
            Pedidos Listos
          </Nav.Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Nav.Link as={Link} to="/productos">
            Productos
          </Nav.Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
    
  );
}

export default DropdownMenu;
