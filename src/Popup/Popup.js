import React from 'react'
import './Popup.css'


function Popup(props){
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {props.children}
                <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
                <button className="next-btn" onClick={() => props.setPage(props.page + 1)}>Next</button>
                <button className="back-btn" onClick={() => props.setPage(props.page - 1)}>Back</button>
            </div>
        </div>
    ) : "";
}

export default Popup