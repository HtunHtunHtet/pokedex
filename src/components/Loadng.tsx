import React from 'react';

const Loading = (): JSX.Element => {
    return(
        <div className="d-flex justify-content-center">
            <div className="spinner-grow increase-spinner" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}
export default Loading;
