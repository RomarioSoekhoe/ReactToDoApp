import React from 'react';
import './Item.css';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

/**
 * stateless funcion to retrieve data trough props and render the item
 * @param {clicked, name, description} props 
 */
const Item = (props) => {
  return (
    <Card className="card-space" onClick={props.clicked}>
      <CardBody>
        <CardTitle>{props.name}</CardTitle>
        <CardText>{props.description}</CardText>
      </CardBody>
    </Card>
  );
};

/**
 * export Item
 */
export default Item;