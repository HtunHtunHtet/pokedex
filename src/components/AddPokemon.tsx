import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import {useForm} from "react-hook-form";
import Button from 'react-bootstrap/Button';

const AddPokemon = (): JSX.Element => {

    const {register, handleSubmit} = useForm();

    const onSubmit  = (data: any) => {
        let newPokemons = localStorage.getItem('newPokemons');
        if (null === newPokemons) {
            localStorage.setItem('newPokemons',JSON.stringify([data ]));
        } else {
            newPokemons = JSON.parse(newPokemons);
            //@ts-ignore
            newPokemons.push(data);

            localStorage.setItem('newPokemons', JSON.stringify(newPokemons));

        }
        window.location.href= '/';
    }

    return (
        <Card>
            <Card.Header>
                Add Pokemons
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Pokemon Name</Form.Label>
                        <Form.Control id="name" type="text" placeholder="Enter Pokemon Name"  {...register("name")} required={true}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Height</Form.Label>
                        <Form.Control id="height" type="number" placeholder="Enter Height" {...register("height")}  required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control id="weight" type="number" placeholder="Enter Weight" {...register("weight")}  required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Control id="type" type="text" placeholder="Enter Pokemon Type" {...register("type")}  required={true} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ability</Form.Label>
                        <Form.Control id="ability" type="text" placeholder="Enter Pokemon Ability" {...register("ability")}  required={true} />
                    </Form.Group>
                    <Form.Control id="id" type="hidden" {...register("id")}
                                  value={'newPokemon-'+Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}
                    />
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddPokemon;
