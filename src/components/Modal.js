import React from 'react'
import './Modal.css';

export default ({handleClose, show, children}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
    <div className={showHideClassName}>
        <section className="modal-main">
            {children}
            <button onClick={handleClose}>닫기</button>
        </section>
    </div>
    )
}
