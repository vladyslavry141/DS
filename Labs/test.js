'use strict';


const multMatrix = (matr1, matr2) => {
  const res = [];
  for (let i = 0; i < matr1.length; i++) {
    res[i] = [];
    for (let j = 0; j < matr1[i].length; j++) {
      let sum = 0;
      for (let e = 0; e < matr1[i].length; e++) {
        sum += matr1[i][e] * matr2[e][j];
      }
      res[i][j] = sum;
    }
  }
  return res;
};

const elementMultMatr = (matr1, matr2) => {
  const res = [];
  for (let i = 0; i < matr1.length; i++) {
    res[i] = [];
    for (let j = 0; j < matr1[i].length; j++) {
      res[i][j] = matr1[i][j] * matr2[i][j];
    }
  }
  return res;
};

const sumMatrix = (matr1, matr2) => {
  const res = [];
  for (let i = 0; i < matr1.length; i++) {
    res[i] = [];
    for (let j = 0; j < matr1[i].length; j++) {
      res[i][j] = matr1[i][j] + matr2[i][j];
    }
  }
  return res;
};

const transposeMatrix = matr => {
  const transposed = [];
  for (let i = 0; i < matr.length; i++) {
    for (let j = 0; j < matr[i].length; j++) {
      if (!transposed[i]) transposed[i] = [];
      if (!transposed[j]) transposed[j] = [];
      transposed[i][j] = matr[j][i];
    }
  }
  return transposed;
};

const toBoolMatrix = matr => {
  for (let i = 0; i < matr.length; i++) {
    for (let j = 0; j < matr[i].length; j++) {
      matr[i][j] = matr[i][j] ? 1 : 0;
    }
  }
  return matr;
};


const powerMatrix = (matr, pow) => {
  let res = multMatrix(matr, matr);
  if (pow === 2) return res;
  for (let i = 3; i <= pow; i++) {
    res = multMatrix(res, matr);
  }
  return res;
};

const zeroDiagonal = matr => {
  const res = [];
  for (let i = 0; i < matr.length; i++) {
    res[i] = matr[i].slice();
    res[i][i] = 0;
  }
  return res;
};

const oneDiagonal = matr => {
  const res = [];
  for (let i = 0; i < matr.length; i++) {
    res[i] = matr[i].slice();
    res[i][i] = 1;
  }
  return res;
};

const reachabilityMatr = matr => {
  const len = matr.length;
  let res = sumMatrix(matr, powerMatrix(matr, 2));
  for (let i = 3; i < len; i++) {
    console.log(i);
    res = sumMatrix(res, powerMatrix(matr, i));
  }
  return toBoolMatrix(oneDiagonal(res));
};

const nreachabilityMatr = matr => {
  const len = matr.length;
  let arr = powerMatrix(matr, 2);
  let res = matr;
  for (let i = 2; i < len; i++) {
    res = sumMatrix(res, arr);
    arr = multMatrix(arr, matr);
  }
  return toBoolMatrix(oneDiagonal(res));
};

const showWaysNlength = (matr, len) => {
  if (len === 1) return matr;
  //const arr = zeroDiagonal(matr);
  return powerMatrix(matr, len);
};

const goOut = (matr, vertix) => {
  const res = [];
  for (let j = 0; j < matr.length; j++) {
    if (matr[vertix][j]) res.push(j);
  }
  return res;
};

const goIn = (matr, vertix) => {
  const res = [];
  for (let i = 0; i < matr.length; i++) {
    if (matr[i][vertix]) res.push(i);
  }
  return res;
};

const findIntersection = (arr1, arr2) => {
  const res = [];
  for (const el of arr1) {
    if (arr2.includes(el)) res.push(el);
  }
  return res;
};

const isIndentical = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

const findIndenticalArr = matr => {
  const groups = [];
  const was = [];
  for (let i = 0; i < matr.length; i++) {
    if (was.includes(i)) continue;
    was.push(i);
    groups.push([i]);
    for (let j = 0; j < matr.length; j++) {
      if (j === i) continue;
      if (isIndentical(matr[i], matr[j])) {
        was.push(j);
        groups[groups.length - 1].push(j);
      }
    }
  }
  return groups;
};

const findWays2 = (matr, i, j, indexWays3) => {
  const res = [];
  const outGo = goOut(matr, i);
  const inGo = goIn(matr, j);
  const inter = findIntersection(inGo, outGo);
  if (i === j && inter.includes(i)) {
    const index = inter.indexOf(i);
    inter.splice(index, 1);
  }
  if (matr[indexWays3] && inter.includes(indexWays3) && i === indexWays3) {
    const index = inter.indexOf(indexWays3);
    inter.splice(index, 1);
  }
  for (const el of inter) res.push([i, el, j]);
  return res;
};

const findAllWays2 = (matr, indexWays3) => {
  let ways = [];
  const len = matr.length;
  const waysMatr2 = showWaysNlength(matr, 2);
  console.table(waysMatr2);
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (waysMatr2[i][j]) {
        ways = ways.concat(findWays2(matr, i, j, indexWays3));
      }
    }
  }
  return ways;
};

const findWays3 = (matr, i, j) => {
  let ways = [];
  const outGo = goOut(matr, i);
  for (const el of outGo) {
    const ways2 = findWays2(matr, el, j, i).map(arr => [i].concat(arr));
    ways = ways.concat(ways2);
  }
  return ways;
};

const findAllWays3 = matr => {
  let ways = [];
  const len = matr.length;
  const waysMatr3 = showWaysNlength(matr, 3);
  console.table(waysMatr3);
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (waysMatr3[i][j]) {
        ways = ways.concat(findWays3(matr, i, j));
      }
    }
  }
  return ways;
};

const toHumanRead = arr => {
  for (const el of arr) {
    for (let i = 0; i < el.length; i++) {
      el[i] = el[i] + 1;
    }
  }
};

const getComponents = matr => {
  const strongConnecM = makeStrongConnectM(matr);
  const groups = findIndenticalArr(strongConnecM);
  return groups;  
};

const makeStrongConnectM = matr => {
  const reachMatr = reachabilityMatr(matr);
  const transReachMatr = transposeMatrix(reachMatr);
  return elementMultMatr(reachMatr, transReachMatr);
};

const makeCondMatr = matr => {
  const strongConnecM = makeStrongConnectM(matr);
  const groups = findIndenticalArr(strongConnecM);
  const cond = [];
  const len = groups.length;
  for (let i = 0; i < len; i++) {
    cond[i] = [];
  }
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      cond[i][j] = 0;
      for (const fromVer of groups[i]) {
        for (const toVer of groups[j]) {
          if (matr[fromVer][toVer]) cond[i][j] = 1;
        }
      }
    }
  }
  return cond;
};

console.table(makeCondMatr(array1));
// console.table(nreachabilityMatr(array1));
// console.table(reachabilityMatr(array1));
// const array1 = [
//   [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, ],
//   [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, ],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//   [0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, ],
//   [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, ],
//   [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, ],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, ],
//   [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, ],
//   [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, ],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
//   [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, ],
//   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, ],
// ];
