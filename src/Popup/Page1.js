import React from 'react'
import pointAtoB from '../images/pointAtoB.png'

function Page1(props){

    return (
        <>
            <h1>Welcome to Pathfinding Visualizer</h1>
            <h2>These next few slides will walk you through how to use this application</h2>
            <img src={pointAtoB} alt="Map image"/>
        </>
    )


}

export default Page1