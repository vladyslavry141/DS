'use strict';
class Vertix {
  constructor(name, x, y) {
    this.name = name;
    this.fromEl = [];
    this.toEl = [];
    this.x = x;
    this.y = y;
    this.haveLoop = false;
  }
}

class Edge {
  constructor(name, from, to) {
    this.name = name;
    this.fromEl = from;
    this.toEl = to;
    this.startPoint = [];
    this.endPoint = [];
    this.loop = false;
  }
  get centreX() {
    return (this.startPoint[0] + this.endPoint[0]) / 2;
  }
  get centreY() {
    return (this.startPoint[0] + this.endPoint[0]) / 2;
  }
}

let centre = [];

const makeVertices = matr => {
  const vertices = [];
  const n = matr.length;
  const num = Math.ceil(n / 4) + 1;
  const ost = (n - 2 * num) / 2;
  const xStart = 100;
  const yStart = 100;
  const step = 100;
  const xEnd = xStart + (num - 1) * step;
  const yEnd = xEnd;
  centre = [(xEnd + xStart) / 2, (yEnd + yStart) / 2];
  const stepOst = Math.floor((xEnd - xStart) / (ost + 1));
  let name = 1;
  let x = xStart;
  let y = yEnd;
  for (; name < num + 1; name++) {
    const vertix = new Vertix(name.toString(), x, y,);
    vertices.push(vertix);
    y -= step;
  }
  x = xStart + stepOst;
  y = yStart;
  for (; name < num + ost + 1; name++) {
    const vertix = new Vertix(name.toString(), x, y,);
    vertices.push(vertix);
    x += stepOst;
  }
  x = xEnd;
  y = yStart;
  for (; name < n - ost + 1; name++) {
    const vertix = new Vertix(name.toString(), x, y,);
    vertices.push(vertix);
    y += step;
  }
  x = xEnd - stepOst; // x = 160
  y = yEnd;
  for (; name < n + 1; name++) {
    const vertix = new Vertix(name.toString(), x, y,);
    vertices.push(vertix);
    x -= stepOst;
  }
  return vertices;
};

const searchReletions = (matr, vertices) => {
  for (let i = 0; i < matr.length; i++) {
    for (let j = 0; j < matr.length; j++) {
      if (matr[i][j]) {
        vertices[i].toEl.push(j);
        vertices[j].fromEl.push(i);
      }
    }
  }
};

const makeVectors = (matr, vertices) => {
  const vectors = [];
  for (let i = 0; i < matr.length; i++) {
    for (let j = 0; j < matr.length; j++) {
      if (matr[i][j]) {
        const name = `${i + 1}_${j + 1}`;
        vectors[name] = (new Edge(name, i, j));
        vectors[name].startPoint = [vertices[i].x, vertices[i].y];
        vectors[name].endPoint = [vertices[j].x, vertices[j].y];
        if (i === j) {
          vectors[name].loop = true;
          vertices[i].haveLoop = true;
        }
      }
    }
  }
  return vectors;
};


const makeEdges = (matr, vertices) => {
  const edges = [];
  for (let i = 0; i < matr.length; i++) {
    for (let j = i; j < matr.length; j++) {
      if (matr[i][j]) {
        const name = `${i + 1}_${j + 1}`;
        edges[name] = (new Edge(name, i, j));
        edges[name].startPoint = [vertices[i].x, vertices[i].y];
        edges[name].endPoint = [vertices[j].x, vertices[j].y];
        if (i === j) {
          edges[name].loop = true;
          vertices[i].haveLoop = true;
        }
      }
    }
  }
  return edges;
};

const matrixToText = (matr, del = ' -  ') => {
  let mat = '';
  for (const arr of matr) mat += arr.join(del) + '\n';
  return mat;
};

const showName = (x, y, name, ctx1, ctx2, color, fillStyle = 'black', font = ('12px serif')) =>{
  ctx1.fillStyle = 'white';
  const px = font.split(' ')[0];
  const ind = parseInt(px.slice(0, px.length - 2))
  let pos = Math.floor(ind / 3);  
  const radius = Math.floor(ind * 3 / 4) 
  if (name.length > 1) pos *= name.length;
  ctx1.beginPath();
  ctx1.arc(x, y, radius, 0, Math.PI * 2);
  ctx1.fill();
  if (color) {
    ctx1.fillStyle = color;
    ctx1.beginPath();
    ctx1.arc(x, y, radius, 0, Math.PI * 2);
    ctx1.fill();}
  ;
  ctx1.fillStyle = fillStyle;
  ctx1.font = font;
  ctx1.fillText(name, x - pos, y + 4);
};

const drawVertix = (x, y, name, ctx1, ctx2, color = 'black') => {
  ctx1.fillStyle = 'white';
  ctx1.beginPath();
  ctx1.arc(x, y, 15, 0, Math.PI * 2);
  ctx1.fill();
  ctx1.fillStyle = color;
  ctx1.beginPath();
  ctx1.arc(x, y, 15, 0, Math.PI * 2);
  ctx1.fill();
  showName(x, y, name, ctx1, ctx2);
  ctx1.fillStyle = 'black';
};

const drawVertices = (vertices, ctx1, ctx2) => {
  for (const vertix of vertices) {
    drawVertix(vertix.x, vertix.y, vertix.name, ctx1, ctx2);
  }
};

const getVector = (x1, y1, x2, y2) => [x2 - x1, y2 - y1];

const vectorLength = vector => Math.sqrt(vector[0] ** 2 + vector[1] ** 2);

const countAngle = (vector1, vector2) => {
  const cosA = (vector1[0] * vector2[0] + vector1[1] * vector2[1]) /
    (vectorLength(vector1) * vectorLength(vector2));
  const angle = Math.acos(cosA);
  return angle;
};


const drawVector = (edge, ctx1, ctx2) => {
  const xCentre = (edge.startPoint[0] + edge.endPoint[0]) / 2;
  const yCentre = (edge.startPoint[1] + edge.endPoint[1]) / 2;
  let vector1 = getVector(...edge.startPoint, ...edge.endPoint);
  const vector2 = [1, 0];
  const vector1L = vectorLength(vector1);
  const xRadius = vector1L / 2;
  let r = 0;
  if (vector1L % 100 === 0) r = 16 * vector1L / 100;
  else r = 14; //* Math.floor(vector1L / 100);
  const yRadius = r;
  const angle = vector1[1] < 0 ?
    (vector1 = getVector(...edge.endPoint, ...edge.startPoint, ...vector2),
    (countAngle(vector1, vector2)) + Math.PI) :
    countAngle(vector1, vector2);
  ctx1.translate(xCentre, yCentre);
  ctx1.rotate(angle);
  ctx1.translate(-xCentre, -yCentre);
  ctx2.translate(xCentre, yCentre);
  ctx2.rotate(angle);
  ctx2.translate(-xCentre, -yCentre);
  ctx1.beginPath();
  ctx1.ellipse(xCentre, yCentre, xRadius, yRadius, 0, 0, Math.PI, true);
  ctx1.stroke();
  ctx2.beginPath();
  ctx2.moveTo(xCentre - 4, yCentre - r);
  ctx2.lineTo(xCentre - 12, yCentre - r - 3);
  ctx2.stroke();
  ctx2.beginPath();
  ctx2.moveTo(xCentre - 4, yCentre - r);
  ctx2.lineTo(xCentre - 12, yCentre - r + 3);
  ctx2.stroke();
  ctx1.translate(xCentre, yCentre);
  ctx1.rotate(-angle);
  ctx1.translate(-xCentre, -yCentre);
  ctx2.translate(xCentre, yCentre);
  ctx2.rotate(-angle);
  ctx2.translate(-xCentre, -yCentre);
};

const makeEdge = (edge, ctx1, ctx2) => {
  const xCentre = (edge.startPoint[0] + edge.endPoint[0]) / 2;
  const yCentre = (edge.startPoint[1] + edge.endPoint[1]) / 2;
  const vector1 = getVector(...edge.startPoint, ...edge.endPoint);
  const vector2 = [1, 0];
  const vector1L = vectorLength(vector1);
  const xRadius = vector1L / 2;
  let r = 0;
  if ((vector1L % 100 === 0) && vector1L / 100 > 1) r = 16 * vector1L / 100;
  else r = 0;
  const angle = vector1[1] < 0 ?
    (countAngle(getVector(...edge.endPoint, ...edge.startPoint), vector2))  :
    countAngle(vector1, vector2);
  ctx1.translate(xCentre, yCentre);
  ctx1.rotate(angle);
  ctx1.translate(-xCentre, -yCentre);
  ctx1.beginPath();
  ctx1.ellipse(xCentre, yCentre, xRadius, r, 0, 0, Math.PI, true);
  ctx1.stroke();
  ctx1.translate(xCentre, yCentre);
  ctx1.rotate(-angle);
  ctx1.translate(-xCentre, -yCentre);
};

const loop = (edge, ctx1, ctx2) => {
  const xCentre = centre[0];
  const yCentre = centre[1];
  const vector1 = getVector(...edge.startPoint, ...centre);
  const vector2 = [1, 0];
  const vector1L = vectorLength(vector1);
  const r = 13;
  const angle = vector1[1] < 0 ?
    (countAngle(getVector(...centre, ...edge.startPoint), vector2)) + Math.PI :
    countAngle(vector1, vector2);
  ctx1.translate(xCentre, yCentre);
  ctx1.rotate(angle + Math.PI);
  ctx1.translate(-xCentre, -yCentre);
  ctx1.beginPath();
  ctx2.translate(xCentre, yCentre);
  ctx2.rotate(angle + Math.PI);
  ctx2.translate(-xCentre, -yCentre);
  ctx1.beginPath();
  ctx1.arc(xCentre + vector1L + r, yCentre, r, 0, Math.PI * 2);
  ctx1.stroke();
  ctx2.beginPath();
  ctx2.moveTo(xCentre + vector1L + 2 * r, yCentre);
  ctx2.lineTo(xCentre + vector1L + 2 * r - 3, yCentre - 5);
  ctx2.stroke();
  ctx2.beginPath();
  ctx2.moveTo(xCentre + vector1L + 2 * r, yCentre);
  ctx2.lineTo(xCentre + vector1L + 2 * r + 2, yCentre - 5);
  ctx2.stroke();
  ctx1.translate(xCentre, yCentre);
  ctx1.rotate(-(angle + Math.PI));
  ctx1.translate(-xCentre, -yCentre);
  ctx2.translate(xCentre, yCentre);
  ctx2.rotate(-(angle + Math.PI));
  ctx2.translate(-xCentre, -yCentre);
};

const symLoop = (edge, ctx1, ctx2) => {
  const xCentre = centre[0];
  const yCentre = centre[1];
  const vector1 = getVector(...edge.startPoint, ...centre);
  const vector2 = [1, 0];
  const vector1L = vectorLength(vector1);
  const r = 20;
  const angle = vector1[1] < 0 ?
    (countAngle(getVector(...centre, ...edge.startPoint), vector2)) + Math.PI :
    countAngle(vector1, vector2);
  ctx1.translate(xCentre, yCentre);
  ctx1.rotate(angle + Math.PI);
  ctx1.translate(-xCentre, -yCentre);
  ctx1.beginPath();
  ctx1.arc(xCentre + vector1L +  r - 1, yCentre, r, 0, Math.PI * 2);
  ctx1.stroke();
  ctx1.translate(xCentre, yCentre);
  ctx1.rotate(-(angle + Math.PI));
  ctx1.translate(-xCentre, -yCentre);
};

const drawVectors = (edges, ctx1, ctx2) => {
  for (const name in edges) {
    const edge = edges[name];
    if (edge.loop) loop(edge, ctx1, ctx2);
    else drawVector(edge, ctx1, ctx2);
  }
};

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


const drawEdges = (edges, ctx1, ctx2) => {
  for (const name in edges) {
    const edge = edges[name];
    if (edge.loop) symLoop(edge, ctx1, ctx2);
    else makeEdge(edge, ctx1, ctx2);
  }
};

//The start of Lab2

const findIsolateVertex = vertices => {
  const isolateVertices = [];
  for (const vertex of vertices) {
    if (vertex.fromEl.length + vertex.toEl.length === 0)
      isolateVertices.push(vertex.name);
  }
  return isolateVertices;
};

const findLeafVertex = vertices => {
  const leafVertices = [];
  for (const vertex of vertices) {
    if (vertex.fromEl.length + vertex.toEl.length === 1)
      leafVertices.push(vertex.name);
  }
  return leafVertices;
};


const findLeafVertexSym = vertices => {
  const leafVertices = [];
  for (const vertex of vertices) {
    if (vertex.toEl.length === 1 && !vertex.haveLoop)
      leafVertices.push(vertex.name);
  }
  return leafVertices;
};


const degreeOfVertexSym = vertex => {
  let degree = vertex.toEl.length;
  if (vertex.haveLoop) degree += 1;
  return [vertex.name, degree];
};

const degreeOfVertex = vertex => {
  const degreePlus = vertex.toEl.length;
  const degreeMinus = vertex.fromEl.length;
  const degree = degreePlus + degreeMinus;
  return [vertex.name, degreePlus, degreeMinus, degree];
};

const isRegular = vertices => {
  const degree = degreeOfVertex(vertices[0])[3];
  for (const vertex of vertices) {
    if (degree !== degreeOfVertex(vertex)[3]) return [false];
  }
  return [true, degree];
};

const isRegularSym = vertices => {
  const degree = degreeOfVertexSym(vertices[0])[1];
  for (const vertex of vertices) {
    if (degree !== degreeOfVertexSym(vertex)[1]) return [false];
  }
  return [true, degree];
};

// The end of Lab2

const textDegrees = vertices => {
  const textD = [];
  for (const vertex of vertices) {
    const degree = degreeOfVertex(vertex);
    let text = `${degree[0]} det+ = ${degree[1]} | det- = ${degree[2]}`;
    if (degree[0].length === 1) text = '0' + text;
    textD.push(text);
  }
  return textD;
};

const textDegreesSym = vertices => {
  const textD = [];
  for (const vertex of vertices) {
    const degree = degreeOfVertexSym(vertex);
    let text = `${degree[0]} det = ${degree[1]}`;
    if (degree[0].length === 1) text = '0' + text;
    textD.push(text);
  }
  return textD;
};

const drawGraph = (matr, ctx1, ctx2, matrixText) => {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  const vertices = makeVertices(matr);
  searchReletions(matr, vertices);
  const vectors = makeVectors(matr, vertices);
  drawVectors(vectors, ctx1, ctx2);
  drawVertices(vertices, ctx1, ctx2);
  matrixText.innerText = 'Matrix\n' + matrixToText(matr);
};

const drawGrWithoutClean = (matr, ctx1, ctx2, matrixText) => {
  const vertices = makeVertices(matr);
  searchReletions(matr, vertices);
  const vectors = makeVectors(matr, vertices);
  drawVectors(vectors, ctx1, ctx2);
  drawVertices(vertices, ctx1, ctx2);
  matrixText.innerText = 'Matrix\n' + matrixToText(matr);
};


const printDeegre = (matr, degreeText) => {
  const vertices = makeVertices(matr);
  searchReletions(matr, vertices);
  degreeText.innerText = 'Degrees:\n' + textDegrees(vertices).join('\n');
};

const drawSymGraph = (matr, ctx1, ctx2, matrixText, degreeText) => {
  const symMatrix = makeSymMatrix(matr);
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  const vertices = makeVertices(symMatrix);
  searchReletions(symMatrix, vertices);
  const edges = makeEdges(symMatrix, vertices);
  drawEdges(edges, ctx1, ctx2);
  drawVertices(vertices, ctx1, ctx2);
  matrixText.innerText = 'Symetric Matrix\n' + matrixToText(symMatrix);
  degreeText.innerText = 'Degrees:\n' + textDegreesSym(vertices).join('\n');
};

