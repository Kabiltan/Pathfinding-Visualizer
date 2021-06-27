import React from 'react'
import './Popup.css'


function Page4(props){

    return (
        <>
            <h1>Understanding the Algorithms</h1>
            <h3>Dijkstras Algorithm: <h4 className="inner-text">A classic pathfinding algorithm
                that gurantees the shortest path.</h4></h3>
            <h3>A* Algorithm: <h4 className="inner-text">One of the best pathfinding algorithms
                due to its nature of being skewed toward the end node. This algorithm always
                gurantees the shortest path.</h4></h3>
            <h3>Breath-First-Search(BFS) Algorithm: <h4 className="inner-text">Another classic pathfiniding
                algorithm that visits nodes in order of proximity to the start node. This algorithm
                gurantees the shortest path.</h4></h3>
            <h3>Depth-First-Search(DFS) Algorithm: <h4 className="inner-text">A very poor pathfinding algorithm that does 
                not guarantee the shortest path.</h4></h3>                
        </>
    )


}

export default Page4