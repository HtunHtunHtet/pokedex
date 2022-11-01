import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getDataFromURL, getPokemon} from "../util/api";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import {IPokemonAbilities, IPokemonStats, IPokemonTypes} from "./Interfaces";

export type PokemonDetail ={
    name: string,
    image: string[],
    height: number | null,
    weight?: number | null,
    types: Array<IPokemonTypes>
    abilities: Array<IPokemonAbilities>
    stats: Array<IPokemonStats>
}

const Detail = (): JSX.Element => {

    const [pokemon, setPokemon] = useState<PokemonDetail>({
        name: "",
        image: [],
        height: null,
        weight: null,
        types: [],
        abilities: [],
        stats: [],
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {id} = useParams();

    useEffect(  () => {
        if (undefined === id) {
            alert ('Missing id');
            return;
        }

        getPokemon(id).then(data => {
            setPokemon({
                name: data.name,
                image: [
                    data.sprites.other.home.front_default,
                    data.sprites.other.home.front_shiny
                ],
                height: data.height,
                weight: data.weight,
                types: data.types,
                abilities: data.abilities,
                stats: data.stats
            })

            setIsLoading(!isLoading)
        }, error => alert(error)) // you can put this error message in the bootsrap modal
    },[])

    return(
        <Card>
            <Carousel>
                {
                    ((!isLoading) && pokemon.image.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="rounded mx-auto d-block"
                                src={`${image}`}
                                alt={`pokemon-image-${index}`}
                            />
                        </Carousel.Item>
                    )))
                }

            </Carousel>
            <Card.Body>
                <Card.Title className="text-capitalize"><h2>{pokemon.name}</h2></Card.Title>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        <Row>
                            <Col sm={{ span: 6}}>
                                <div><h3>Height</h3> {pokemon.height}</div>
                            </Col>

                            <Col sm={{ span: 6}}>
                                <div><h3>Weight</h3> {pokemon.weight} kg</div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col sm={{ span: 6}}>
                                <div>
                                    <h3>Types</h3>
                                    {
                                        (!isLoading) &&  pokemon.types.map((type,index) =>
                                            <div key={index} className="text-capitalize">{type.type.name}</div>
                                        )
                                    }
                                </div>
                            </Col>
                            <Col sm={{ span: 6}}>
                                <div>
                                    <h3>Abilities</h3>
                                    {
                                        (!isLoading) &&  pokemon.abilities.map((ability,index) =>
                                            <div key={index} className="text-capitalize">{ability.ability.name}</div>
                                        )
                                    }
                                </div>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col sm={{ span: 12 }}>
                                <h3>Stat</h3>
                                {
                                    (!isLoading) &&  pokemon.stats.map((stat,index) =>
                                        <div key={index} className="text-capitalize">
                                            <strong>{stat.stat.name}</strong> : {stat.base_stat}
                                        </div>
                                    )
                                }
                            </Col>
                        </Row>

                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default Detail;
