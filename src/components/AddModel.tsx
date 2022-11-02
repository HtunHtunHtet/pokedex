import React from 'react';
import {useForm} from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {IAddModel} from "./Interfaces";
import Form from 'react-bootstrap/Form';

interface IRegister {
    name: string;
    value: string;
}

const AddModel = (props: IAddModel): JSX.Element => {

    const {register, handleSubmit, reset} = useForm<IRegister>()

    const onSubmit = (data:IRegister) => {
        props.setAdditionalFeatures([...props.additionalFeature,data]);
        //save into local storage
        localStorage.setItem(`additional-features-${props.id}`,JSON.stringify([...props.additionalFeature,data]));
        props.handleModel();

        //clear form
        reset({
            name: '',
            value: '',
        })
    }

    return (
        <>
            <Modal show={props.isShow} onHide={()=>props.handleModel()}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Additional Features</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control id="name" type="text" placeholder="Enter Name of additional attribute"  {...register("name")} required={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Value</Form.Label>
                            <Form.Control id="value" type="text" placeholder="Enter Value" {...register("value")}  required={true} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddModel;
