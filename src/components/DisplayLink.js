import React from 'react'
import {Link} from 'react-router-dom'
function DisplayLink(props) {

    return (
    <div className={props.className}>
    <Link to={`${props.linkName.replaceAll(" ", "").toLowerCase()}`} style={{
                textDecoration: "none",
                color: props.className !== props.display ? "black" : "#87cefa",
                borderBottom: props.className !== props.display ? "none": "2px solid #87cefa",
                paddingBottom: "2px"
             }
    } onClick={() => props.setDisplay(props.className)} workout={props.name}>
        {props.linkName}
    </Link>
    </div>
    )
}

export default DisplayLink
