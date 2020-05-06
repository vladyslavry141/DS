'use strict';

const zeroDiagonal = matr => {
  const res = [];
  for (let i = 0; i < matr.length; i++) {
    res[i] = matr[i].slice();
    res[i][i] = 0;
  }
  return res;
};

const data = (matr, weigth, edges) => {
  const arr = [];
  for (let i = 0; i < matr.length; i++) {
    for (let j = i; j < matr[i].length; j++) {
      if (matr[i][j]) {
        const w = weigth[i][j];
        const edgName = `${i+1}_${j+1}`;
        const edge = edges[edgName];
        if (edge.loop) continue;
        arr.push([w, i, j, edgName]);        
      }
    }
  }
  return arr.sort((a, b) => a[0] - b[0]);
};

const countNumberOfEl = (arr, el) => {
  let res = 0;
  if (arr.length === 0) return res;
  for (const e of arr) {
    if (e.includes(el)) res++;
  }
  return res;
};

const isCycle = (vertices, stopEl, find, ind)=> {
  let res = false;
  for (let i = 0; i < vertices.length; i++) {
    if (i === ind) continue;
    const arr = vertices[i];
    if (arr.includes(find)) {
      const index = arr.indexOf(find);
      const nextEl = arr[arr.length - (index + 1)];
      if (nextEl === stopEl) {
        return true;
      }
      res = isCycle(vertices, stopEl, nextEl, i);
      if (res) break;
    }
 }
 return res
};


const findOstTree = (matr, data) => {
  const vertices = [];
  const res = [];
  const len = matr.length - 1;
  for (const [w, fromVer, toVer, name] of data) {
    if (res.length >= len) break;
    const vertCopy = vertices.slice(0,);
    vertCopy.push([fromVer, toVer]);
    const fromVerNum = countNumberOfEl(vertCopy, fromVer);
    const toVerNum = countNumberOfEl(vertCopy, toVer);
    if (fromVerNum >= 3 && toVerNum >= 3) continue;
    const cycle = isCycle(vertCopy, fromVer, toVer, vertCopy.length - 1);
    if (!cycle) {
      vertices.push([fromVer, toVer]);
      res.push([name, w]);
    }
  }
  return res;
};


const addWeigth = (edges, weigth) => {
  for (const key in edges) {
    const edge = edges[key];
    const fromEl = edge.fromEl;
    const toEl = edge.toEl;
    edge.w = weigth[fromEl][toEl];
  }
}

const makeBackboneMatr = (matr, edges, result) => {
  const res = [];
  for (let i = 0; i < matr.length; i++) {
    res[i] = Array(matr[i].length).fill(0);
  }
  for (const el of result) {
    const edge = edges[el[0]];
    const fromEl = edge.fromEl;
    const toEl = edge.toEl;
    res[fromEl][toEl] = 1;
  }
  return res;
}