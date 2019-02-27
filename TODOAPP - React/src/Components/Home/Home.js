import React, { Component } from 'react';
import { Container, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

/**
 * Class Home StateFull Component, It should be StateLess.
 * For future features like authentication i let it like this.
 */
class Home extends Component {
    /**
     * constructor
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        // set initial state with some users.
        this.state = {
            users: [{ name: "Romario" }, { name: "Stephan" }, { name: "Rudy" }]
        };
    }

    // render to the DOM
    render() {
        let page = (
            <div>
                <Container>
                    <Card className="card border-primary mb-3">
                        <CardBody>
                            <CardTitle>Home</CardTitle>
                            <CardSubtitle>Welcome, {this.state.users[1].name}.</CardSubtitle>
                            <CardText>
                                Enjoy!
                    </CardText>
                        </CardBody>
                    </Card>
                </Container>
            </div>);
        return page;
    }
}

export default Home;