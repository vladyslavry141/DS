'use strict';

const findAdjacentVetrtex = matr => {
  const adjecent = [];
  for (let i = 0; i < matr.length; i++) {
    adjecent[i] = [];
    for (let j = 0; j < matr[i].length; j++) {
      if (matr[i][j]) adjecent[i].push(j);
    }
  }
  return adjecent;
};

const DFS = (start, visited, prev, g) => {
  visited[start] = true;
  for (const el of g[start]) {
    if (!visited[el]) {
      prev.push([start, el]);
      let back = DFS(el, visited, prev, g);
      prev.push([start, back, true])
    }
  }
  return start;
};

const DepthFirstSearch = (matr, start) => {
  const g = findAdjacentVetrtex(matr);
  const visited = [];
  const prev = [];
  DFS(start, visited, prev, g)
  return prev;
};

const getDFSWithoutBack = path => {
  const res = [];
  for (const el of path) {
    if (!el[2]) res.push(el);
  }
  return res;
}

const getNumericArray = (matr, start) => {
  const path = DepthFirstSearch(matr, start);
  const pathWB = getDFSWithoutBack(path);
  const res = [start];
  for (let i = 1; i < matr.length; i++) {
    const index = pathWB[i - 1][1];
    res[i] = index;
  }
  return res;
};

const findOpenVertices = (matr, start) => {
  const path = DepthFirstSearch(matr, start);
  const pathWB = getDFSWithoutBack(path);
  const res = [[start]];
  const pathWBLastV = pathWB[pathWB.length - 1][1];
  for (let i = 0; i < path.length; i++) {
    const vertice = path[i][1];
    const lastIndex = res.length - 1;
    console.log(vertice, !res[lastIndex].includes(vertice))
    if (!res[lastIndex].includes(vertice)) {
      const nextStep = res[lastIndex].slice();
      nextStep.push(vertice);
      res.push(nextStep);
      const resLastVertice = res[lastIndex + 1][res[lastIndex + 1].length - 1];
      if (resLastVertice === pathWBLastV) return res;
    }
    else {
      const len = res[lastIndex].length;
      res[lastIndex] = res[lastIndex].slice(0, len - 1);
    }
  }
};

const findOpenVerticesA = (matr, start) => {
  const path = DepthFirstSearch(matr, start);
  const res = [[start]];
  for (let i = 0; i < path.length; i++) {
    const vertice = path[i][1];
    const lastIndex = res.length - 1;
    console.log(vertice, !res[lastIndex].includes(vertice))
    if (!res[lastIndex].includes(vertice)) {
      const nextStep = res[lastIndex].slice()
      nextStep.push(vertice);
      res.push(nextStep);
    }
    else {
      const prevStep = res[lastIndex].slice();
      const len = prevStep.length;
      const nextStep = prevStep.slice(0, len - 1);
      res.push(nextStep)
    }
  }
  return res
};


const getNumericMatrix = (matr, start) => {
  const path = DepthFirstSearch(matr, start);
  const pathWB = getDFSWithoutBack(path);
  const res = [];
  for (let i = 0; i < matr.length; i++) {
    res[i] = Array(matr[i].length).fill(0);
  }
  res[0][start] = 1
  for (let i = 1; i < matr.length; i++) {
    const index = pathWB[i - 1][1];
    res[i][index] = 1;
  }
  return res;
}

const getTreeMatrix = (matr, path) => {
  const res = [];
  for (let i = 0; i < matr.length; i++) {
    res[i] = Array(matr[i].length).fill(0);
  }
  for (const [x, y] of path) {
    res[x][y] = 1;
  }
  return res;
};