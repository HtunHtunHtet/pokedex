import React, {useState, useEffect} from 'react';
import {getAllPokemons, getDataFromURL} from '../util/api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';

//import interfaces
import {IPokemon} from "./Interfaces";

const Home = (): JSX.Element => {
    const [pokemons, setPokemons] = useState<Array<IPokemon>>([]);
    const [count, setCount] = useState<number>(0);
    const [offset, setOffSet] = useState<number>(20);
    const [limit, setLimit] = useState<number>(20);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(  () => {
        getAllPokemons().then(data => {
            setPokemons(data.results);
            setCount(data.count);

            //get each pokemon from data.result
            // useEffect(() => {
            //     pokemon.abilities.map(ability => {
            //         getDataFromURL(ability.ability.url).then(data => {
            //             console.log(data)
            //         })
            //     })
            // }, [pokemon.stats]);

        }, error => alert(error))
    },[])

    const handlePageChanges  = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        getAllPokemons(pageNumber*offset).then(data => {
            setPokemons(data.results);
            setCount(data.count);
        }, error => alert(error))
    }

    return (
        <Card>
            <Card.Header>Pokedex - {count} Pokemons</Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    {pokemons.map((pokemon,index) =>
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col sm={{ span: 6}} className="text-capitalize">
                                    {pokemon.name}
                                </Col>
                                <Col sm={{ span: 6 }} className='text-right'>
                                    <Link to={`/detail/${index + 1}`}>Detail</Link>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col sm={{ span: 8 }}>
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => handlePageChanges(currentPage -1)}
                                disabled = {currentPage === 1}
                            />
                            {pokemons.slice(0,5).map((pokemons, index) =>
                                <Pagination.Item
                                    key={index}
                                    active={((index+1) === currentPage )}
                                    onClick={() => handlePageChanges(index+1)}>{index + 1}</Pagination.Item>
                            )}
                            <Pagination.Ellipsis disabled/>

                            {/* Last page */}
                            <Pagination.Item
                                active={currentPage === Math.floor(count/offset) }
                                onClick={() => handlePageChanges( Math.floor(count/offset))}
                            >{Math.floor(count/offset)}</Pagination.Item>

                            {/*Next Page*/}
                            <Pagination.Next
                                onClick={() =>  handlePageChanges(currentPage + 1)}
                                disabled = {( currentPage  === Math.floor(count/offset) )}
                            />
                        </Pagination>
                    </Col>
                    <Col sm={{ span: 4 }} className="text-right">
                        Current Page - {currentPage}
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default Home;
