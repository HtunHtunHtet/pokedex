import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";

const BackToHome = (): JSX.Element => {
    return(
        <>
            <OverlayTrigger
                placement='left'
                overlay={
                    <Tooltip id={`tooltip`}>
                        Back
                    </Tooltip>
                }
            >
                <Button href='/' variant="secondary" ><i className="fa fa-arrow-left"></i></Button>
            </OverlayTrigger>
        </>
    )
}

export default BackToHome;
