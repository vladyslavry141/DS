'use strict';
const arr5 = `
1  1  1  1  1  0  0  0  1  0  1  1,
0  1  0  0  0  0  1  0  1  0  1  1,
0  0  0  0  1  1  0  0  0  0  1  0,
0  0  0  0  1  1  1  0  1  1  1  0,
0  1  1  0  0  0  1  1  1  0  1  0,
0  1  1  1  1  0  0  1  0  1  0  1,
0  0  0  0  1  1  0  0  1  1  0  1,
0  0  1  0  0  1  1  0  0  1  0  0,
1  0  0  0  0  1  1  1  0  0  1  0,
1  0  0  0  0  0  1  1  0  1  1  1,
0  0  0  1  0  1  1  1  1  0  0  1,
0  0  0  1  1  0  0  0  0  0  0  1`.split(',');

const Lab5 = arr5.map(el => el.split('  ').map(x => parseInt(x)));

const arrW5 = `
 0  64  33  87  38   0   0   0  78  28  12  46,
64   0   0   0   3  89  71   0  68   0  62  64,
33   0   0   0  98  82   0  25   0   0  54   0,
87   0   0   0  87  85  17   0  71  14  98  68,
38   3  98  87   0  61  89  18  32   0  41  99,
 0  89  82  85  61   0  50   3  35  55  33  50,
 0  71   0  17  89  50   0  94  73  34  22  74,
 0   0  25   0  18   3  94   0   0  33  92   0,
78  68   0  71  32  35  73   0   0   0  88   0,
28   0   0  14   0  55  34  33   0   0  70  95,
12  62  54  98  41  33  22  92  88  70   0  99,
46  64   0  68  99  50  74   0   0  95  99   0`.split(',');

const LabW5 = arrW5.map(el => el.split('  ').map(x => parseInt(x)));

const makeSymMatrix = matr => {
  const sym = [];
  for (let i = 0; i < matr.length; i++) {
    for (let j = 0; j < matr.length; j++) {
      if (!sym[i]) sym[i] = [];
      if (!sym[j]) sym[j] = [];
      if (matr[i][j] || sym[i][j]) {
        sym[i][j] = 1;
        sym[j][i] = 1;
      } else sym[i][j] = 0;
    }
  }
  return sym;
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
}

const zeroToInf = (matr, weigthMatr) => {
  const inf = Infinity;
  for (let i = 0; i < matr.length; i++) {
    for (let j = 0; j < matr[i].length; j++){
      if(!matr[i][j]) weigthMatr[i][j] = inf;
    }
  }
}

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
const pathToText = path => {
  let text = 'Route\n';
  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    const textPath = p ? p.join('->') : p;
    text += textPath + '\n';
  }
  return text;
};


console.table(makeSymMatrix(zeroDiagonal(Lab5)))
zeroToInf(makeSymMatrix(zeroDiagonal(Lab5)), LabW5);
console.table(LabW5)
const res = dejkstraAlg(LabW5, 0);
res.forEach(obj => console.log(obj));
