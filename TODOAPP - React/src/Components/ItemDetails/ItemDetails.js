import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Table } from 'reactstrap';
import './ItemDetails.css'

class ItemDetails extends Component {
    /**
     * @constructor
     * retrieve the props id from taskItem which was clicked in List.js
     */
    constructor(props) {
        super(props);

        this.onClick = this.handle2functions.bind(this);
        // set initial state loadedTask to null.
        this.state = {
            redirect: false,
            loadedTask: null,
            taskID: null
        };
    }


    /**
     *  Update component when retrieve data from api
     */
    componentDidUpdate() {
        if (this.props.id) {
            // only update the state if there is no loaded task in the state.(preventing from looping infinitly)
            // or props id is not the same as the id of the loaded task. so if its allready loaded, don't load again.
            if (!this.state.loadedTask || (this.state.loadedTask && this.state.loadedTask._id !== this.props.id)) {
                // get data from the specific task with the id given trough props retrieved from List.js
                axios.get('http://localhost:3000/tasks/' + this.props.id)
                    .then(response => {
                        // put the data from the api in loadedTask variable. set the state with this Item.
                        // also set deleted to false to indicate that a new task is loaded.
                        this.setState({
                            loadedTask: response.data
                        });
                    });
            }
        }
    }

    /**
     * Function to delete a task from the API. 
     * use axios to delete the task.
     */
    deleteTaskHandler = () => {
        axios.delete('http://localhost:3000/tasks/' + this.props.id)
            .then(
                this.setState({
                    loadedTask: null,
                    redirect: true
                })
            );
    }

    /**
     * Function to triggers two function one function in this component deletetaskhandler and one from List.js 
     */
    handle2functions = () => {

        // function retrieven from props.
        this.props.handler();
        // function above to delete from api
        this.deleteTaskHandler();
    }

    completeTask = () => {
        // Update completed to true and updated_at to the time now!
        // I did it with an get request since i did not figure out how to make a change in my api with patch or put.
        // normally to send a new opject to the props id. but it didn't worked for me.
        // so i have make a get request and put the logic in the api itself.
        axios.get('http://localhost:3000/tasks/complete/' + this.props.id)
            .then(response => {
                // causes a rerender from component wich is needed. since the loadedTask is updated.
                this.setState({ loadedTask: response.data })
            }
            )
    }


    // render to the DOM
    render() {
        // add dynamic styling to CardTitle and CardSubtitle when is completed it will be green else it will be orange.
        const classes = [];
        // task should represent by default a paragraph with text: Select a task...
        let task = <p style={{ textAlign: 'center' }}>Select a task...</p>;
        // if props has an id retrieven from List.js then set to Loading... because the ajaxCall with axios is not fired yet.
        if (this.props.id) {
            task = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        // if loadedTask has an object which retrieven from the api, then present this data in a nice way..
        if (this.state.loadedTask) {
            if(this.state.loadedTask.completed){
                classes.push('green');
            }else{
                classes.push('red');
            }
            task = (
                <Card className="ItemDetails">
                    <CardBody>
                        <CardTitle className={classes}>{this.state.loadedTask.name}</CardTitle>
                        <CardSubtitle className={classes}>{this.state.loadedTask.description}</CardSubtitle>
                        <CardText>
                            <Table hover>
                                <tbody>
                                    <tr>
                                        <th scope="row">Assigned To</th>
                                        <td>{this.state.loadedTask.assigned_to}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Created By</th>
                                        <td>{this.state.loadedTask.created_by}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Completed</th>
                                        <td>
                                            {this.state.loadedTask.completed ?
                                                'Yes!' : 'Not yet!'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Created At:</th>
                                        <td>{this.state.loadedTask.created_at}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Updated At:</th>
                                        <td>{this.state.loadedTask.updated_at}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            {/* onClick is bind to handle2functions method. */}
                            <button onClick={this.handle2functions} className="btn btn-danger">Delete</button>
                            {/* onClick fires completeTask */}
                            <button onClick={this.completeTask} className="Finished btn btn-success">Finished!</button>
                        </CardText>
                    </CardBody>
                </Card>
            );
        }
        // return task element
        return task;
    }
};

// export ItemDetails to import it somewere else.
export default ItemDetails;