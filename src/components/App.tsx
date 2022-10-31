import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getAllPokemons} from '../util/api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

//import interfaces
import {IPokemon} from "./Interfaces";

const App = () => {

    const [pokemons, setPokemons] = useState<Array<IPokemon>>([]);
    const [count, setCount] = useState<number>(0);
    const [previous, setPrevious] = useState<string|null>(null);

    useEffect(  () => {
         getAllPokemons().then(data => {
             setPokemons(data.results);
             setCount(data.count);
             setPrevious(data.previous)
         }, error => alert(error))
    },[])

  return (
    <Container>
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <Card>
                    <Card.Header>Pokedex</Card.Header>
                    <ListGroup variant="flush">
                        {pokemons.map((pokemon,index) => <ListGroup.Item key={index}>{pokemon.name}</ListGroup.Item>)}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </Container>
  );
}

export default App;
