import React from 'react'

function Page3(props){

    return (
        <>
            <h1>Create Walls</h1>
            <h2>Click and drag empty grid spaces to 
                create walls. To remove walls simply click
                and drag over any grid space with a wall. 
            </h2>
            <h3>Walls are spaces on the grid that the pathfinding algorithm
                will not traverse when finding the shortest path between the start
                and end node
            </h3>
            <img src="https://media.giphy.com/media/0sjZA1wJnAxB73CIIC/giphy.gif" alt="Grid image" width="650px"/>
        </>
    )


}

export default Page3