import React, {Component} from 'react';
import { useState } from 'react';
import './Navbar.css';
import start_node from '../../images/start_node.JPG'
import finish_node from '../../images/finish_node.JPG'
import shortest_path_node from '../../images/shortest_path_node.JPG'
import visited_node from '../../images/visited_node.JPG'
import wall_node from '../../images/wall_node.JPG'

export default class NavBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      algorithm: 'Visualize',
      speed: 'Fast'
    };
  }

  selectDijkstra(){
    this.setState({algorithm: 'Visualize Dijkstra'})
  }

  selectAstar(){
    this.setState({algorithm: 'Visualize A*'})
  }

  selectDFS(){
    this.setState({algorithm: 'Visualize DFS'})
  }

  selectBFS(){
    this.setState({algorithm: 'Visualize BFS'})
  }

  setFast(){
    this.setState({speed: 'Fast'})
  }

  setAverage(){
    this.setState({speed: 'Average'})
  }

  setSlow(){
    this.setState({speed: 'Slow'})
  }


  visualizeAlgorithm(){
    if(this.state.algorithm === 'Visualize Dijkstra'){
      this.props.visualizeDijkstra(this.state.speed);
    }
    else if(this.state.algorithm === 'Visualize A*'){
      this.props.visualizeAstar(this.state.speed);
    }
    else if(this.state.algorithm === 'Visualize DFS'){
      this.props.visualizeDFS(this.state.speed);
    }
    else if(this.state.algorithm === 'Visualize BFS'){
      this.props.visualizeBFS(this.state.speed);
    }
    else {
      this.setState({algorithm: 'Please select an Algorithm'})
    }
  }

  render () {
    return (
      <>
      <div className="container">
        <nav className="navigation-bar"> 
          <div class="dropdown">
            <button class="dropbtn">Algorithms</button>
            <div id="myDropdown" class="dropdown-content">
              <a onClick={() => this.selectDijkstra()}>Dijkstras Algorithm</a>
              <a onClick={() => this.selectAstar()}>A* Algorithm</a>
              <a onClick={() => this.selectDFS()}>DFS Algorithm</a>
              <a onClick={() => this.selectBFS()}>BFS Algorithm</a>
            </div>
          </div>
          <button className="visualize-btn" onClick={() => this.visualizeAlgorithm()}>{this.state.algorithm}</button>
          <div class="dropdown">
            <button class="dropbtn">Speed: {this.state.speed}</button>
            <div id="myDropdown" class="dropdown-content">
              <a onClick={() => this.setFast()}>Fast</a>
              <a onClick={() => this.setAverage()}>Avergae</a>
              <a onClick={() => this.setSlow()}>Slow</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">Clear</button>
            <div id="myDropdown" class="dropdown-content">
              <a onClick={() => this.props.clearWalls(this.props.state.grid, "walls")}>Clear Walls</a>
              <a onClick={() => this.props.clearWalls(this.props.state.grid, "path")}>Clear Path</a>
              <a onClick={() => this.props.clearWalls(this.props.state.grid, "board")}>Clear Board</a>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <h4>Start Node</h4>
              <img src={start_node} alt="Start Node"/>
            </div>
            <div className="column">
              <h4>Finish Node</h4>
              <img src={finish_node} alt="Finish Node"/>
            </div>
            <div className="column">
              <h4>Wall Node</h4>
              <img src={wall_node} alt="Wall Node"/>
            </div>
            <div className="column">
              <h4>Visted Node</h4>
              <img src={visited_node} alt="Visited Node"/>
            </div>
            <div className="column">
              <h4>Shortest Path Node</h4>
              <img src={shortest_path_node} alt="Shortest Path Node"/>
            </div>
          </div>
        </nav>
      </div>
      </>
    );
  };
};

