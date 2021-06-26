// G cost = Distance from starting node
// H cost = Distance from end node
// F cost = G cost + H cost

export function Astar(grid, startNode, finishNode) {
  const exploredNodes = [];
  const visitedNodesInOrder = [];
  startNode.Fcost = 0;
  startNode.Gcost = 0;
  exploredNodes.push(startNode);

  while (1 === 1) {
    // Sort all visted nodes by F cost
    sortNodesByFcost(exploredNodes);

    // Get the closest node by F cost
    const currentNode = exploredNodes.shift();
    console.log(currentNode);
    // Skip if current node is a wall
    if (typeof currentNode === "undefined" || currentNode.isWall) {
      continue;
    }

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

    // Explore nodes function
    exploreNodes(currentNode, startNode, finishNode, exploredNodes, grid);
  }
}

function updateExploredNodes(exploredNodes, nodeToRemove) {
  if (nodeToRemove.isWall) {
    return exploredNodes;
  }

  return exploredNodes.filter((node) => !nodeToRemove);
}

function calculateHcost(nodeRow, nodeCol, finishNodeRow, finishNodeCol) {
  const y_diff_squared = Math.pow(Math.abs(nodeRow - finishNodeRow), 2);
  const x_diff_squared = Math.pow(Math.abs(nodeCol - finishNodeCol), 2);
  const H_cost = Math.sqrt(y_diff_squared + x_diff_squared) * 10;
  return H_cost;
}

function calculateGcost(currentNode, diagonal) {
  var G_cost = currentNode.Gcost;

  if (diagonal) {
    G_cost += Math.sqrt(2) * 10;
  } else {
    G_cost += 10;
  }

  return G_cost;
}

function exploreNodes(currentNode, startNode, finishNode, exploredNodes, grid) {
  // Loop through all the nodes around the current node and calculate the G, H and F costs
  const { row, col } = currentNode;

  // Explore node above
  if (row > 0) {
    const diagonal = false;
    const oldNode = grid[row - 1][col];
    const node = grid[row - 1][col];

    const previousGcost = node.Gcost;
    node.Gcost = calculateGcost(currentNode, diagonal);

    node.Hcost = calculateHcost(row - 1, col, finishNode.row, finishNode.col);
    if (node.Gcost < previousGcost) {
      exploredNodes = updateExploredNodes(exploredNodes, oldNode);
      node.isExplored = false;
    } else {
      if (previousGcost != null) {
        node.Gcost = previousGcost;
      }
    }
    const Fcost = node.Hcost + node.Gcost;
    node.Fcost = Fcost;
    if (!node.isExplored && !node.isWall) {
      node.isExplored = true;
      exploredNodes.push(node);
      node.previousNode = currentNode;
    }
  }

  // Explore node below
  if (row < grid.length - 1) {
    const diagonal = false;
    const oldNode = grid[row + 1][col];
    const node = grid[row + 1][col];
    const previousGcost = node.Gcost;
    node.Gcost = calculateGcost(currentNode, diagonal);
    node.Hcost = calculateHcost(row + 1, col, finishNode.row, finishNode.col);
    if (node.Gcost < previousGcost) {
      exploredNodes = updateExploredNodes(exploredNodes, oldNode);
      node.isExplored = false;
    } else {
      if (previousGcost != null) {
        node.Gcost = previousGcost;
      }
    }
    const Fcost = node.Hcost + node.Gcost;
    node.Fcost = Fcost;
    if (!node.isExplored && !node.isWall) {
      node.isExplored = true;
      exploredNodes.push(node);
      node.previousNode = currentNode;
    }
  }

  // Explore node to the left
  if (col > 0) {
    const diagonal = false;
    const oldNode = grid[row][col - 1];
    const node = grid[row][col - 1];
    const previousGcost = node.Gcost;
    node.Gcost = calculateGcost(currentNode, diagonal);
    node.Hcost = calculateHcost(row, col - 1, finishNode.row, finishNode.col);
    if (node.Gcost < previousGcost) {
      exploredNodes = updateExploredNodes(exploredNodes, oldNode);
      node.isExplored = false;
    } else {
      if (previousGcost != null) {
        node.Gcost = previousGcost;
      }
    }
    const Fcost = node.Hcost + node.Gcost;
    node.Fcost = Fcost;
    if (!node.isExplored && !node.isWall) {
      node.isExplored = true;
      exploredNodes.push(node);
      node.previousNode = currentNode;
    }
  }

  // Explore node to the right
  if (col < grid[0].length - 1) {
    const diagonal = false;
    const oldNode = grid[row][col + 1];
    const node = grid[row][col + 1];
    const previousGcost = node.Gcost;
    node.Gcost = calculateGcost(currentNode, diagonal);
    node.Hcost = calculateHcost(row, col + 1, finishNode.row, finishNode.col);
    if (node.Gcost < previousGcost) {
      exploredNodes = updateExploredNodes(exploredNodes, oldNode);
      node.isExplored = false;
    } else {
      if (previousGcost != null) {
        node.Gcost = previousGcost;
      }
    }
    const Fcost = node.Hcost + node.Gcost;
    node.Fcost = Fcost;
    if (!node.isExplored && !node.isWall) {
      node.isExplored = true;
      exploredNodes.push(node);
      node.previousNode = currentNode;
    }
  }

  // Explore node diagonally top left
  if (row > 0 && col > 0) {
    const diagonal = true;
    const oldNode = grid[row - 1][col - 1];
    const node = grid[row - 1][col - 1];
    const previousGcost = node.Gcost;
    node.Gcost = calculateGcost(currentNode, diagonal);
    node.Hcost = calculateHcost(
      row - 1,
      col - 1,
      finishNode.row,
      finishNode.col
    );
    if (node.Gcost < previousGcost) {
      exploredNodes = updateExploredNodes(exploredNodes, oldNode);
      node.isExplored = false;
    } else {
      if (previousGcost != null) {
        node.Gcost = previousGcost;
      }
    }
    const Fcost = node.Hcost + node.Gcost;
    node.Fcost = Fcost;
    if (!node.isExplored && !node.isWall) {
      node.isExplored = true;
      exploredNodes.push(node);
      node.previousNode = currentNode;
    }
  }

  // Explore node diagonally top right
  if (row > 0 && col < grid[0].length - 1) {
    const diagonal = true;
    const oldNode = grid[row - 1][col + 1];
    const node = grid[row - 1][col + 1];
    const previousGcost = node.Gcost;
    node.Gcost = calculateGcost(currentNode, diagonal);
    node.Hcost = calculateHcost(
      row - 1,
      col + 1,
      finishNode.row,
      finishNode.col
    );
    if (node.Gcost < previousGcost) {
      exploredNodes = updateExploredNodes(exploredNodes, oldNode);
      node.isExplored = false;
    } else {
      if (previousGcost != null) {
        node.Gcost = previousGcost;
      }
    }
    const Fcost = node.Hcost + node.Gcost;
    node.Fcost = Fcost;
    if (!node.isExplored && !node.isWall) {
      node.isExplored = true;
      exploredNodes.push(node);
      node.previousNode = currentNode;
    }
  }

  // Explore node diagonally bottom left
  if (row < grid.length - 1 && col > 0) {
    const diagonal = true;
    const oldNode = grid[row + 1][col - 1];
    const node = grid[row + 1][col - 1];
    const previousGcost = node.Gcost;
    node.Gcost = calculateGcost(currentNode, diagonal);
    node.Hcost = calculateHcost(
      row + 1,
      col - 1,
      finishNode.row,
      finishNode.col
    );
    if (node.Gcost < previousGcost) {
      exploredNodes = updateExploredNodes(exploredNodes, oldNode);
      node.isExplored = false;
    } else {
      if (previousGcost != null) {
        node.Gcost = previousGcost;
      }
    }
    const Fcost = node.Hcost + node.Gcost;
    node.Fcost = Fcost;
    if (!node.isExplored && !node.isWall) {
      node.isExplored = true;
      exploredNodes.push(node);
      node.previousNode = currentNode;
    }
  }

  // Explore node diagonally bottom right
  if (row < grid.length - 1 && col < grid[0].length - 1) {
    const diagonal = true;
    const oldNode = grid[row + 1][col + 1];
    const node = grid[row + 1][col + 1];
    const previousGcost = node.Gcost;
    node.Gcost = calculateGcost(currentNode, diagonal);
    node.Hcost = calculateHcost(
      row + 1,
      col + 1,
      finishNode.row,
      finishNode.col
    );
    if (node.Gcost < previousGcost) {
      exploredNodes = updateExploredNodes(exploredNodes, oldNode);
      node.isExplored = false;
    } else {
      if (previousGcost != null) {
        node.Gcost = previousGcost;
      }
    }
    const Fcost = node.Hcost + node.Gcost;
    node.Fcost = Fcost;
    if (!node.isExplored && !node.isWall) {
      node.isExplored = true;
      exploredNodes.push(node);
      node.previousNode = currentNode;
    }
  }
}

function sortNodesByFcost(exploredNodes) {
  exploredNodes.sort((nodeA, nodeB) =>
    nodeA.Fcost === nodeB.Fcost
      ? nodeA.H_cost - nodeB.Hcost
      : nodeA.Fcost - nodeB.Fcost
  );
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrderAstar(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (1 == 1) {
    if (currentNode.isStart) {
      nodesInShortestPathOrder.unshift(currentNode);
      break;
    }
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
