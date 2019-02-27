import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from './Components/Menu/Menu';
import Home from './Components/Home/Home';
import List from './Components/List/List';
import Form from './Components/Form/Form';
import './App.css';

/**
 * @class App
 * statefull component to render app.
 * added Router from react-router-dom to take advance of SPA feeling.
 */
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* Include Menu */}
          <Menu></Menu>

          {/* Route paths */}
          <Route exact path="/" component={Home} />
          <Route exact path="/create_task" component={Form} />
          <Route exact path="/task_list" component={List} />

        </div>
      </Router>
    );
  }
}

export default App;
