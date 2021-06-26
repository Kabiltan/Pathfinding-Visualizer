// Search order - Top, Right, Bottom, Left
// Search next available node frome Queue

export function BFS(grid, startNode, finishNode) {
  let currentNode = startNode;
  startNode.isVisited = true;
  const visitedNodesInOrder = [];
  const nodeQueue = [];
  nodeQueue.push(startNode);

  while (1 === 1) {
    console.log(currentNode);
    currentNode = nodeQueue.shift();

    if (currentNode.isWall) {
      continue;
    }

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (
      nodeQueue.length === 0 &&
      currentNode !== startNode &&
      !checkPaths(grid, currentNode)
    ) {
      return visitedNodesInOrder;
    }

    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

    checkSurroundingNodes(grid, nodeQueue, currentNode);
  }
}

function checkPaths(grid, currentNode) {
  const { row, col } = currentNode;

  if (row > 0) {
    const topNode = grid[row - 1][col];
    if (!topNode.isVisited && !topNode.isWall && !topNode.inQueue) {
      return true;
    }
  }

  if (col < grid[0].length - 1) {
    const rightNode = grid[row][col + 1];
    if (!rightNode.isVisited && !rightNode.isWall && !rightNode.inQueue) {
      return true;
    }
  }

  if (row < grid.length - 1) {
    const bottomNode = grid[row + 1][col];
    if (!bottomNode.isVisited && !bottomNode.isWall && !bottomNode.inQueue) {
      return true;
    }
  }

  if (col > 0) {
    const leftNode = grid[row][col - 1];
    if (!leftNode.isVisited && !leftNode.isWall && !leftNode.inQueue) {
      return true;
    }
  }

  return false;
}

function checkSurroundingNodes(grid, nodeQueue, currentNode) {
  const { row, col } = currentNode;

  if (row > 0) {
    const topNode = grid[row - 1][col];
    if (!topNode.isVisited && !topNode.isWall && !topNode.inQueue) {
      topNode.previousNode = currentNode;
      topNode.inQueue = true;
      nodeQueue.push(topNode);
    }
  }

  if (col < grid[0].length - 1) {
    const rightNode = grid[row][col + 1];
    if (!rightNode.isVisited && !rightNode.isWall && !rightNode.inQueue) {
      rightNode.previousNode = currentNode;
      rightNode.inQueue = true;
      nodeQueue.push(rightNode);
    }
  }

  if (row < grid.length - 1) {
    const bottomNode = grid[row + 1][col];
    if (!bottomNode.isVisited && !bottomNode.isWall && !bottomNode.inQueue) {
      bottomNode.previousNode = currentNode;
      bottomNode.inQueue = true;
      nodeQueue.push(bottomNode);
    }
  }

  if (col > 0) {
    const leftNode = grid[row][col - 1];
    if (!leftNode.isVisited && !leftNode.isWall && !leftNode.inQueue) {
      leftNode.previousNode = currentNode;
      leftNode.inQueue = true;
      nodeQueue.push(leftNode);
    }
  }

  return false;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrderBFS(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
