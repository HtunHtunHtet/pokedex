import React, {useState, useEffect} from 'react';
import {getAllPokemons} from '../util/api';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import Loading from "./Loadng";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//import interfaces
import {IAddPokemon, IPokemon} from "./Interfaces";

const Home = (): JSX.Element => {
    const [pokemons, setPokemons] = useState<Array<IPokemon>>([]);
    const [count, setCount] = useState<number>(0);
    const [offset, setOffSet] = useState<number>(20);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [newPokemons, setNewPokemons] = useState<Array<IAddPokemon>>([]);

    useEffect(  () => {
        getAllPokemons().then(data => {
            setPokemons(data.results);
            setCount(data.count);
            setIsLoading(!isLoading);
        }, error => alert(error))

        let newlyAddedPokemon = localStorage.getItem('newPokemons');
        if (null !== newlyAddedPokemon) {
            setNewPokemons(JSON.parse(newlyAddedPokemon));
        }

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
            {(isLoading)
                ? <Loading/>
                : <>
                    <Card.Header>
                        <Row>
                            <Col sm={{span:6}}>
                                Pokedex - {count} Pokemons
                            </Col>
                            <Col sm={{span:6}} className="text-right">
                                <OverlayTrigger
                                    placement='right'
                                    overlay={
                                        <Tooltip id={`tooltip`}>
                                            Add Pokemon
                                        </Tooltip>
                                    }
                                >
                                    <Button href={'/add-pokemon'}>
                                    <i className="fa fa-plus"></i>
                                </Button>
                                </OverlayTrigger>

                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <>
                            {
                                newPokemons.map((pokemon, index) => {
                                    return (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col sm={{span: 6}} className="text-capitalize">
                                                    {pokemon.name} <Badge bg="success">New</Badge>
                                                </Col>
                                                <Col sm={{span: 6}} className='text-right'>
                                                    <Link to={`/detail/${pokemon.id}`}>Detail</Link>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )
                                })
                            }

                            {
                                pokemons.map((pokemon, index) =>
                            {
                                let id = (pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/','')).replace('/','');

                                return (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col sm={{span: 6}} className="text-capitalize">
                                                 {pokemon.name}
                                            </Col>
                                            <Col sm={{span: 6}} className='text-right'>
                                                <Link to={`/detail/${id}`}>Detail</Link>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            }
                            )}
                            </>
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col sm={{span: 8}}>
                                <Pagination>
                                    <Pagination.Prev
                                        onClick={() => handlePageChanges(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    />
                                    {pokemons.slice(0, 5).map((pokemons, index) =>
                                        <Pagination.Item
                                            key={index}
                                            active={((index + 1) === currentPage)}
                                            onClick={() => handlePageChanges(index + 1)}>{index + 1}</Pagination.Item>
                                    )}
                                    <Pagination.Ellipsis disabled/>

                                    {/* Last page */}
                                    <Pagination.Item
                                        active={currentPage === Math.floor(count / offset)}
                                        onClick={() => handlePageChanges(Math.floor(count / offset))}
                                    >{Math.floor(count / offset)}</Pagination.Item>

                                    {/*Next Page*/}
                                    <Pagination.Next
                                        onClick={() => handlePageChanges(currentPage + 1)}
                                        disabled={(currentPage === Math.floor(count / offset))}
                                    />
                                </Pagination>
                            </Col>
                            <Col sm={{span: 4}} className="text-right">
                                Current Page - {currentPage}
                            </Col>
                        </Row>
                    </Card.Footer>
                </>
            }
        </Card>
    )
}

export default Home;
