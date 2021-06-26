// Search order - Top, Right, Bottom, Left
// Search next avaiable node from current node

export function DFS(grid, startNode, finishNode) {
  let currentNode = startNode;
  const visitedNodesInOrder = [];

  while (1 == 1) {
    // Set current Node to visited
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

    if (checkTop(grid, currentNode)) {
      currentNode = grid[currentNode.row - 1][currentNode.col];
    } else if (checkRight(grid, currentNode)) {
      currentNode = grid[currentNode.row][currentNode.col + 1];
    } else if (checkBottom(grid, currentNode)) {
      currentNode = grid[currentNode.row + 1][currentNode.col];
    } else if (checkLeft(grid, currentNode)) {
      currentNode = grid[currentNode.row][currentNode.col - 1];
    }
    // If there are no nodes available to go to, back track to a previous visted node to check if we can back track
    else if (checkBackTrack(grid, visitedNodesInOrder)[0]) {
      currentNode = checkBackTrack(grid, visitedNodesInOrder)[1];
    } else {
      console.log("oh boy");
      return visitedNodesInOrder;
    }
  }
}

function checkTop(grid, currentNode) {
  const { row, col } = currentNode;
  if (row > 0) {
    const topNode = grid[row - 1][col];
    if (!topNode.isVisited && !topNode.isWall) {
      topNode.previousNode = currentNode;
      return true;
    }
  }

  return false;
}

function checkRight(grid, currentNode) {
  const { row, col } = currentNode;
  if (col < grid[0].length - 1) {
    const rightNode = grid[row][col + 1];
    if (!rightNode.isVisited && !rightNode.isWall) {
      rightNode.previousNode = currentNode;
      return true;
    }
  }

  return false;
}

function checkBottom(grid, currentNode) {
  const { row, col } = currentNode;
  if (row < grid.length - 1) {
    const bottomNode = grid[row + 1][col];
    if (!bottomNode.isVisited && !bottomNode.isWall) {
      bottomNode.previousNode = currentNode;
      return true;
    }
  }

  return false;
}

function checkLeft(grid, currentNode) {
  const { row, col } = currentNode;
  if (col > 0) {
    const leftNode = grid[row][col - 1];
    if (!leftNode.isVisited && !leftNode.isWall) {
      leftNode.previousNode = currentNode;
      return true;
    }
  }

  return false;
}

function checkBackTrack(grid, visitedNodesInOrder) {
  let currentNode = visitedNodesInOrder[visitedNodesInOrder.length - 1];
  let i = 0;
  while (
    i < visitedNodesInOrder.length &&
    !checkTop(grid, currentNode) &&
    !checkRight(grid, currentNode) &&
    !checkBottom(grid, currentNode) &&
    !checkLeft(grid, currentNode)
  ) {
    ++i;
    currentNode = visitedNodesInOrder[visitedNodesInOrder.length - 1 - i];
  }

  if (i === visitedNodesInOrder.length) {
    return [false, null];
  } else {
    return [true, currentNode];
  }
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrderDFS(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
