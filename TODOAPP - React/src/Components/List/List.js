import React, { Component } from 'react';
import axios from 'axios';
import Item from '../Item/Item';
import ItemDetails from '../ItemDetails/ItemDetails';
import { Container, Row, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

/**
 * class List represents a list of all tasks to the DOM.
 */
class List extends Component {
    /**
     * @constructor
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        // bind this deleteTaskHandler to use it in child component ItemDetails.
        this.deleteTaskHandler = this.deleteTaskHandler.bind(this)
        // set initial state
        this.state = {
            tasks: [],
            selectedTaskID: null,
            error: false
        };
    }

    /**
     * ComponentDidMount executes later after the DOM is allready is renderd.
     */
    componentDidMount() {
        // get all the tasks with axios.get method.
        axios.get("http://localhost:3000/tasks")
            .then(response => {
                //** Slice the response we get to avoid getting a to big task list. get the first 100 tasks */
                const tasks = response.data.slice(0, 100);
                // store every task in updatedTasks with the tasks.map() method.
                const updatedTasks = tasks.map(task => {
                    // return every task and add it to updatedTasks every time with ... (spread)
                    return {
                        ...task,
                        // manipulate task and add a new attribute to it
                        checked: true
                    }
                });
                // set the state with the updatedTask which i have created with looping trough the api data
                this.setState({
                    tasks: updatedTasks
                });
            })
            // catch errors if there are any.
            .catch(error => {
                // set the state with the errors.
                this.setState({ error: true });
            });
    }

    /**
     * When a task is selected get the id from 
     * the task and put it into the state selectedTaskID
     * So i can later use it to view my TaskDetails
     */
    taskSelectedHandler = (_id) => {
        this.setState({ selectedTaskID: _id });
    }

    /**
     * Here i check wich task i should delete from the state
     * after this task is deleted there will be an rerender of the tasklist.
     * so my taskslist getting updated
     */
    deleteTaskHandler = () => {
        // check tasks from the state. use the map function to loop trough tasks 
        this.state.tasks.map((task, i) => {
            // check where the state.task_id is the same as the taskID wich is selected.
            if (task._id === this.state.selectedTaskID) {
                // use the splice method to cut the founded task from the state.tasks.
                // this causes a rerender from the page and the task will be removed from the state.
                this.state.tasks.splice(i, 1);
            }
        })
        // now since i've deleted the task from the state. I also can put selectedTaskID to null
        // which causes that the Detailed view of the task dissappear.
        this.setState({ selectedTaskID: null });

    }

    /**
     * this renders the page
     */
    render() {
        // inital tasks variable if there are errors with the retrieven data.
        let tasks = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        // if there are no errors, let tasks be Item Components with given props.
        if (!this.state.error) {
            // itteration in tasks so one or more tasks could be generated in Item component with props.
            tasks = this.state.tasks.map(task => {
                return <Item
                    key={task._id}
                    name={task.name}
                    description={task.description}
                    clicked={() => this.taskSelectedHandler(task._id)}
                    completed={task.completed}>
                </Item>
            });
        }
        return (
            <div>
                <Container>
                    <Card className="card border-primary mb-3">
                        <CardBody>
                            <CardTitle>Task list</CardTitle>
                            <CardSubtitle>A list of all taskitems</CardSubtitle>
                            <CardText>
                                <Row>
                                    {/* display all components Item */}
                                    {tasks}
                                    {/* {tasks.lenght>1 ? {tasks} : 'Please create a task' } */}
                                </Row>


                                {/* Details Component of tasks triggered by selectedTask Handler. */}
                                <ItemDetails id={this.state.selectedTaskID}
                                    // created a function which either calls a function of this component and one from DetailsTask component
                                    // to delete a task.
                                    handler={this.deleteTaskHandler}
                                />

                            </CardText>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    };
};

// export List.
export default List;