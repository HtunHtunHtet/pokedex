import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { getPokemon } from "../util/api";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import {IAdditionalFeatures, IPokemonAbilities, IPokemonStats, IPokemonTypes} from "./Interfaces";
import Loading from "./Loadng";
import AddModel from "./AddModel";
import Button from "react-bootstrap/Button";

interface PokemonDetail {
    id: number|null,
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
        id: null,
        name: "",
        image: [],
        height: null,
        weight: null,
        types: [],
        abilities: [],
        stats: [],
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [additionalFeature, setAdditionalFeature] = useState<Array<IAdditionalFeatures>>([]);
    const [showModel, setShowModel] = useState<boolean>(false);
    const {id} = useParams();

    useEffect(  () => {
        if (undefined === id) {
            alert ('Missing id');
            return;
        }

        getPokemon(id).then(data => {
            setPokemon({
                id: data.id,
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

            //check additional feature local storage
            let additionalFeatureLocalStorage = localStorage.getItem(`additional-features-${id}`)

            if (null !== additionalFeatureLocalStorage) {
                setAdditionalFeature(JSON.parse(additionalFeatureLocalStorage));
            }

            setIsLoading(!isLoading)
        }, error => alert(error)) // you can put this error message in the bootsrap modal
    },[])

    const handleModel = () => setShowModel(!showModel)

    return(
        <Card>
            {
                (isLoading)
                ? <Loading/>
                :
                <>
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
                    <Card.Header>
                        <Card.Title className="text-capitalize"><h2>{pokemon.name}</h2></Card.Title>
                    </Card.Header>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            <Row>
                                <Col sm={{ span: 6}}>
                                    <div><h4>Height</h4> {pokemon.height}</div>
                                </Col>

                                <Col sm={{ span: 6}}>
                                    <div><h4>Weight</h4> {pokemon.weight} kg</div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col sm={{ span: 6}}>
                                    <div>
                                        <h4>Types</h4>
                                        {
                                            (!isLoading) &&  pokemon.types.map((type,index) =>
                                                <div key={index} className="text-capitalize">{type.type.name}</div>
                                            )
                                        }
                                    </div>
                                </Col>
                                <Col sm={{ span: 6}}>
                                    <div>
                                        <h4>Abilities</h4>
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
                                    <h4>Stat</h4>
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
                        <ListGroup.Item>
                            <Row>
                                <Col sm={{ span:12 }} >
                                    <h4>Additional Features </h4>
                                    <Row>
                                    {
                                        additionalFeature.length > 0 &&
                                        additionalFeature.map((feature,index)  =>
                                                <Col sm={{ span:12 }} key={index}>
                                                    <strong>{feature.name}</strong> : {feature.value}
                                                </Col>
                                        )
                                    }
                                    <Col sm={{ span:12 }}>
                                        <Button variant="primary" onClick={() => handleModel()}>
                                            Add Additional Features
                                        </Button>
                                    </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    <AddModel
                        isShow={showModel}
                        handleModel={handleModel}
                        setAdditionalFeatures={setAdditionalFeature}
                        additionalFeature={additionalFeature}
                        id={id}
                    />
                </>
            }
        </Card>
    )
}

export default Detail;
