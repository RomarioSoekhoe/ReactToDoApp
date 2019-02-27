import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler, Collapse, Nav } from 'reactstrap';

class Menu extends Component {
    /**
     * @constructor
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        // bind toggle button for menu to expand if on mobile device or screen is shorter
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    /**
     * Togle function to expand the menu.
     */
    toggle() {
        // set the state to open if closed or closed if open.
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    /**
     * render function render the menu to the DOM.
     */
    render() {
        return (
            <div className="Menu">
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={Link} to="/">ToDosApp</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/create_task">Create Task</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/task_list">TaskList</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Menu;