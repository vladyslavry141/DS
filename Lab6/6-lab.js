'use strict';

const weigthToText = weight => {
  let text = 'Weigth\n';
  for (let i = 0; i < weight.length; i++) {
    text += `${i + 1} : ${weight[i]}\n`
  }
  return text;
};

const pathToText = path => {
  let text = 'Route\n';
  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    const textPath = p ? p.join('->') : p;
    text += textPath + '\n';
  }
  return text;
};

const pathToEdgeStyle = path => {
  const res = [];
  if (path.length < 2) return [];
  for (let i = 1; i < path.length; i++) {
    const fromV = path[i-1] + 1;
    const toV = path[i] + 1;
    const edge = fromV > toV ? `${toV}_${fromV}` : `${fromV}_${toV}`;
    res.push(edge);
  }
  return res;
}

const markToText = valid => {
  let text = 'Mark\n';
  for (let i = 0; i < valid.length; i++) {
    text += valid[i] ? `${i + 1} : T\n` : `${i + 1} : P\n`;
  }
  return text;
};

const zeroDiagonal = matr => {
  const res = [];
  for (let i = 0; i < matr.length; i++) {
    res[i] = matr[i].slice();
    res[i][i] = 0;
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
};

const zeroToInf = (matr, weigthMatr) => {
  const inf = Infinity;
  const res = []
  for (let i = 0; i < matr.length; i++) {
    res[i] = weigthMatr[i].slice();
    for (let j = 0; j < matr[i].length; j++){
      if(!matr[i][j]) res[i][j] = inf;
    }
  }
  return res;
};

const dejkstraAlg = (weigthMatr, start) => {
  const len = weigthMatr.length;
  const inf = Infinity;
  const valid = Array(len).fill(true);
  const weight = Array(len).fill(inf);
  const nodes = [start];
  const path = Array(len).fill(undefined);
  path[start] = [start]
  weight[start] = 0;
  const steps = [];
  for (let i = 0; i < len; i++) {
    let minWeight = inf + 1;
    let IdMinWeight = -1;
    for (let j = 0; j < len; j++) {
      if (valid[j] && weight[j] < minWeight) {
        minWeight = weight[j];
        IdMinWeight = j;
      }
    }
    const pathToMin = path[IdMinWeight];
    for(let z = 0; z < len; z++) {
      if (weight[IdMinWeight] + weigthMatr[IdMinWeight][z] < weight[z]) {
        weight[z] = weight[IdMinWeight] + weigthMatr[IdMinWeight][z];
        const pathToVertex = pathToMin.slice();
        pathToVertex.push(z);
        path[z] = pathToVertex;
      }
      valid[IdMinWeight] = false;
    }
    steps.push({
      openVert: IdMinWeight,
      valid: valid.slice(),
      weight: weight.slice(),
      path: path.slice(),
    })
  }
  return steps;
}; 
