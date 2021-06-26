import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import { Astar, getNodesInShortestPathOrderAstar} from '../algorithms/Astar';
import { DFS, getNodesInShortestPathOrderDFS} from '../algorithms/DFS';
import { BFS, getNodesInShortestPathOrderBFS} from '../algorithms/BFS';
import NavBar  from './Navbar/Navbar';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 15;
const START_NODE_COL = 19;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 57;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      finishNodePressed: false,
      finishNodeRow: FINISH_NODE_ROW,
      finishNodeCol: FINISH_NODE_COL,
      startNodePressed: false,
      startNodeRow: START_NODE_ROW,
      startNodeCol: START_NODE_COL
    };

    this.clearWalls = this.clearWalls.bind(this);
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    if(row === this.state.finishNodeRow && col === this.state.finishNodeCol){
      this.setState({mouseIsPressed: true, finishNodePressed: true});
      return;
    }
    else if(row === this.state.startNodeRow && col === this.state.startNodeCol){
      this.setState({mouseIsPressed: true, startNodePressed: true});
      return;
    }
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed){
      return;
    }
    else if(this.state.finishNodePressed){
      const newGrid = getNewGridWithEndNode(this.state.grid, row, col);
      this.setState({finishNodeCol: col, finishNodeRow: row})
      this.setState({grid: newGrid})
    }
    else if(this.state.startNodePressed){
      const newGrid = getNewGridWithStartNode(this.state.grid, row, col);
      this.setState({startNodeCol: col, startNodeRow: row})
      this.setState({grid: newGrid})
    }
    else {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({grid: newGrid});  
    }

  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false, finishNodePressed: false, startNodePressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, speed) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, speed * i);
        return;
      }
      setTimeout(() => {
        console.log(speed);
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, speed * i);
    }
  }
  
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }


  visualizeDijkstra(speed) {
    let rate = 10;
    if(speed === 'Fast'){
      rate = 10;
    }
    else if(speed === 'Average'){
      rate = 50;
    }
    else if(speed === 'Slow'){
      rate = 100;
    }
    const {grid} = this.state;
    const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
    const finishNode = grid[this.state.finishNodeRow][this.state.finishNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, rate);
  }

  visualizeAstar(speed) {
    let rate = 10;
    if(speed === 'Fast'){
      rate = 10;
    }
    else if(speed === 'Average'){
      rate = 50;
    }
    else if(speed === 'Slow'){
      rate = 100;
    }
    const {grid} = this.state;
    const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
    const finishNode = grid[this.state.finishNodeRow][this.state.finishNodeCol];
    const visitedNodesInOrder = Astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAstar(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, rate);    
  }

  visualizeDFS(speed) {
    let rate = 10;
    if(speed === 'Fast'){
      rate = 10;
    }
    else if(speed === 'Average'){
      rate = 50;
    }
    else if(speed === 'Slow'){
      rate = 100;
    }
    const {grid} = this.state;
    const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
    const finishNode = grid[this.state.finishNodeRow][this.state.finishNodeCol];
    const visitedNodesInOrder = DFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, rate);    
  }

  visualizeBFS(speed) {
    let rate = 10;
    if(speed === 'Fast'){
      rate = 10;
    }
    else if(speed === 'Average'){
      rate = 50;
    }
    else if(speed === 'Slow'){
      rate = 100;
    }
    const {grid} = this.state;
    const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
    const finishNode = grid[this.state.finishNodeRow][this.state.finishNodeCol];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, rate);    
  }


  clearWalls(newGrid, type) {


    let plainGrid = getInitialGridForClear();
    
    if(type === "board"){
      plainGrid = getInitialGrid();
      for(let i = 0; i < 29; ++i){
        for(let j = 0; j < 76; ++j){
          let currentNode = plainGrid[i][j]
          if(currentNode.isFinish){
            document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className =
            'node node-finish';
            plainGrid[i][j].isFinish = true;
            this.setState({finishNodeRow: FINISH_NODE_ROW});
            this.setState({finishNodeCol: FINISH_NODE_COL});
          }
          else if(currentNode.isStart){
            document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className =
            'node node-start';
            plainGrid[i][j].isStart = true;
            this.setState({startNodeRow: START_NODE_ROW});
            this.setState({startNodeCol: START_NODE_COL});
          }
          else{
            document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className =
            'node node';
          }
        }
      }

      this.setState({grid: plainGrid});
      return;
    }

    for(let i = 0; i < 29; ++i){
      for(let j = 0; j < 76; ++j){
        let currentNode = newGrid[i][j]
        if(currentNode.isFinish){
          document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className =
          'node node-finish';
          plainGrid[i][j].isFinish = true;
        }
        else if(currentNode.isStart){
          document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className =
          'node node-start';
          plainGrid[i][j].isStart = true;
        }
        else{
          document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className =
          'node node';
        }
        if(type === "path" && currentNode.isWall){
          const oldNode = {
            ...plainGrid[i][j],
            isWall: true
          }
          plainGrid[i][j] = oldNode
          document.getElementById(`node-${currentNode.row}-${currentNode.col}`).className =
          'node node-wall';
        }
      }
    } 

    this.setState({grid: plainGrid});

  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <NavBar visualizeAstar={this.visualizeAstar} visualizeDijkstra={this.visualizeDijkstra} visualizeBFS={this.visualizeBFS} visualizeDFS={this.visualizeDFS}
        state={this.state} animateDijkstra={this.animateDijkstra} animateShortestPath={this.animateShortestPath} clearWalls={this.clearWalls} getInitialGrid={getInitialGrid}
        getInitialGridForClear={getInitialGridForClear} createNode={createNode}/>
{/*           <div class="dropdown">
            <button class="dropbtn">Clear</button>
            <div id="myDropdown" class="dropdown-content">
              <a onClick={() => this.clearWalls(this.state.grid, "walls")}>Clear Walls</a>
              <a onClick={() => this.clearWalls(this.state.grid, "path")}>Clear Path</a>
              <a onClick={() => this.clearWalls(this.state.grid, "board")}>Clear Board</a>
            </div>
          </div> */}
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={row === this.state.finishNodeRow && col === this.state.finishNodeCol}
                      isStart={row === this.state.startNodeRow && col === this.state.startNodeCol}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 29; row++) {
    const currentRow = [];
    for (let col = 0; col < 76; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  console.log("we return here")
  return grid;
};


const getInitialGridForClear = () => {
  const grid = [];
  for (let row = 0; row < 29; row++) {
    const currentRow = [];
    for (let col = 0; col < 76; col++) {
      currentRow.push(createNodeForClear(col, row));
    }
    grid.push(currentRow);
  }
  console.log("we return here")
  return grid;
};

const createNodeForClear = (col, row) => {
  return {
    col,
    row,
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithEndNode = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  for (var i = 0; i < 29; ++i){
    for(var j = 0; j < 76; ++j){
      const oldNode = {
        ...grid[i][j],
        row: i,
        col: j,
        isFinish: false,
      }
      newGrid[i][j] = oldNode
    }
  }

  const newNode = {
    ...node,
    isFinish: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithStartNode = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
 
  for (var i = 0; i < 29; ++i){
    for(var j = 0; j < 76; ++j){
      const oldNode = {
        ...grid[i][j],
        row: i,
        col: j,
        isStart: false,
      }
      newGrid[i][j] = oldNode
    }
  }

  const newNode = {
    ...node,
    isStart: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};


