import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {IAddModel} from "./Interfaces";

const AddModel = (props: IAddModel): JSX.Element => {
    return (
        <>
            <Modal show={props.isShow} onHide={()=>props.handleModel()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Additional Featurels</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddModel;
