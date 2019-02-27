import React, { Component } from 'react';
import { Redirect } from "react-router";
import axios from 'axios';
import { Container, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

/**
 * Form class. StateFull component.
 */
class Form extends Component {
    /**
     * @constructor
     * set intial state fields and errors equal to empty Objects
     */
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {}
        }
    }

    /**
     * Handles Validation of the input fields from the form.
     */
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        /** Checking if fields does appear else formValid set to false.  */
        //Name Validation, check if something is filled in. 
        if (!fields["name"]) {
            formIsValid = false;
            // store in errors for name field 
            errors["name"] = "* This field is required!";
        }
        //Description, check if something is filled in.
        if (!fields["description"]) {
            formIsValid = false;
            // store in errors for description field
            errors["description"] = "* This field is required!";
        }
        //Created By, check if something is filled in.
        if (!fields["created_by"]) {
            formIsValid = false;
            // store in errors for created_by field
            errors["created_by"] = "* This field is required!";
        }
        //Assigned To, check if something is filled in.
        if (!fields["assigned_to"]) {
            formIsValid = false;
            // store in errors for assigned_to field
            errors["assigned_to"] = "* This field is required!";
        }
        // change the state. put errors in error if there are.
        this.setState({ errors: errors });
        // return formIsValid
        return formIsValid;
    }

    /**
     * function to submit the task to the API. 
     * ofcourse if the validation is passed.
     * @param {event} e 
     */
    TaskSubmit(e) {
        e.preventDefault();
        // if validation of the form is true
        if (this.handleValidation()) {
            // turn the values of the form to an object for send the object to the API.
            const task = {
                name: this.state.fields.name,
                description: this.state.fields.description,
                created_by: this.state.fields.created_by,
                assigned_to: this.state.fields.assigned_to
            }
            // use axios post method to store the taskObject
            axios.post('http://localhost:3000/tasks/', task)
                .then(response => {
                    console.log(response);
                    // setState redirect to true so we could see the task in the tasklist.
                    this.setState({ redirect: true });
                });
        }
    }

    /**
     * Check if there are changes in the Input,
     * if yes set the new values in the state
     * @param {fields} field 
     * @param {event} e 
     */
    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    /**
     * Function to Redirect to tasklist executed when form is valid.
     */
    RedirectToTaskList = () => {
        if (this.state.redirect) {
            return <Redirect to="/task_list" />;
        };
    };

    render() {
        return (
            <Container>
                <Card className="card border-primary mb-3">
                    <CardBody>
                        <CardTitle>Create a task!</CardTitle>
                        <CardSubtitle>Fill in the form to create a task.</CardSubtitle>
                        <CardText>
                            {/* execution the redirect function if it is setted to true */}
                            {this.RedirectToTaskList()}
                            {/* Form to create a task */}
                            <form name="createTask" onSubmit={this.TaskSubmit.bind(this)}>
                                {/* Input for Name */}
                                <div className="form-group">
                                    <div className="form-group row">
                                        <label for="taskname" className="col-5 col-form-label">Name</label>
                                        <div className="col-10">
                                            {/* if the field has error the class should be changed to get a red glow. */}
                                            <input type="text" id="taskname" className={this.state.errors['name'] ? "form-control is-invalid" : "form-control"} onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
                                        </div>
                                    </div>
                                    {/* Field errors */}
                                    <div className="error text-danger">{this.state.errors["name"]}</div>
                                </div>
                                {/* Input for description */}
                                <div className="form-group">
                                    <div className="form-group row">
                                        <label for="description" className="col-5 col-form-label">Description</label>
                                        <div className="col-10">
                                            {/* if the field has error the class should be changed to get a red glow. */}
                                            <textarea type="text" id="description" className={this.state.errors['description'] ? "form-control is-invalid" : "form-control"} onChange={this.handleChange.bind(this, "description")} value={this.state.fields["description"]}></textarea>
                                        </div>
                                    </div>
                                    {/* Field errors */}
                                    <div className="form-control-feedback text-danger">{this.state.errors["description"]}</div>
                                </div>
                                {/* Input for created_by */}
                                <div className="form-group">
                                    <div className="form-group row">
                                        <label for="created_by" className="col-5 col-form-label">Created By</label>
                                        <div className="col-10">
                                            {/* if the field has error the class should be changed to get a red glow. */}
                                            <input type="text" id="created_by" className={this.state.errors['created_by'] ? "form-control is-invalid" : "form-control"} onChange={this.handleChange.bind(this, "created_by")} value={this.state.fields["created_by"]} />
                                        </div>
                                    </div>
                                    {/* Field errors */}
                                    <div className="error text-danger">{this.state.errors["created_by"]}</div>
                                </div>
                                {/* Input for assigned to */}
                                <div className="form-group">
                                    <div className="form-group row">
                                        <label for="assigned_to" className="col-5 col-form-label">Assigned To</label>
                                        <div className="col-10">
                                            {/* if the field has error the class should be changed to get a red glow. */}
                                            <input type="text" id="assigned_to" className={this.state.errors['assigned_to'] ? "form-control is-invalid" : "form-control"} onChange={this.handleChange.bind(this, "assigned_to")} value={this.state.fields["assigned_to"]} />
                                        </div>
                                    </div>
                                    {/* Field errors */}
                                    <div className="error text-danger">{this.state.errors["assigned_to"]}</div>
                                </div>
                                {/* Submit button Styled Dynamicly! if there are errors show btn btn-danger else btn btn primary */}
                                <div className="form-group">
                                    <button className={Object.keys(this.state.errors).length ? "btn btn-danger" : "btn btn-primary"} id="submit" value="Submit">Create Task</button>
                                </div>
                            </form>
                        </CardText>
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default Form;