const canvas1 = document.getElementById('lay01');
const canvas2 = document.getElementById('lay02');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const nonSym = document.getElementById('nonSym');
const startV = document.getElementById('startV');
const nextG = document.getElementById('nextG');
const selectEdge = document.getElementById('selectEdge');
const deg = document.getElementById('degree');
const markText = document.getElementById('mark');
const pathText = document.getElementById('path');

const matr = makeSymMatrix(Lab6);
const zeroDMatr = zeroDiagonal(matr);
const weigthMatr = LabW6;
let start = 0;
let num = 0;
const infWeigthMatr = zeroToInf(zeroDMatr, weigthMatr)
const vertices = makeVertices(matr);
searchReletions(matr, vertices);
const edges = makeEdges(matr, vertices);
let steps = dejkstraAlg(infWeigthMatr, start);

addWeigth(edges, weigthMatr);

const drawWeigth = (edge, ctx, color) => {
  const xCentr = edge.centreX;
  const yCentr = edge.centreY;
  ctx.font = ('15px serif');
  const angle = countRightAngl(edge);
  let x = 0;
  let r = edge.r;
  if (r === 0) {
    x = vectorLength(edge.v) / 8;
  };
  ctx.translate(xCentr, yCentr);
  ctx.rotate(angle);
  ctx.translate(x, -r);
  ctx.rotate(-angle);  
  if (color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(6, -3, 10, 0, Math.PI * 2);
    ctx.fill();
  };
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.fillText(edge.w, 0, 0);
  ctx.fill();
  ctx.rotate(angle);
  ctx.translate(-x, r);
  ctx.rotate(-angle);  
  ctx.translate(-xCentr, -yCentr);
}

const graphButton = () => {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx2.strokeStyle = 'black';
  const m = matr;
  for (const key in edges) {
    const edge = edges[key];
    if (edge.loop) continue;
    drawWeigth(edge, ctx2)
  }
  drawSymGrWithoutClean(zeroDMatr, ctx1, ctx2);
  deg.innerText = 'The Symetric Matrix:\n' + matrixToText(Lab5)
  markText.innerText = '';
  pathText.innerText = '';
  num = 0;
};

const nextClick = () => {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  for (const key in edges) {
    const edge = edges[key];
    if (edge.loop) continue;
    drawWeigth(edge, ctx2)
  }
  ctx1.lineWidth = 4.0;
  ctx2.lineWidth = 3.0;
  ctx1.strokeStyle = "rgba(255,0,0,0.8)"
  const step = steps[num];
  const openVert = step.openVert;
  const valid = step.valid;
  const path = step.path;
  const res = pathToEdgeStyle(step.path[openVert]);
  for (const name of res) {
    const edge = edges[name];
    makeEdge(edge, ctx1, ctx2);
    drawWeigth(edge, ctx2, 'red')
  }
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx1.lineWidth = 1.0;
  drawSymGrWithoutClean(zeroDMatr, ctx1, ctx2);
  for (let i = 0; i < valid.length; i++) {
    if (valid[i]) {
      drawVertix(vertices[i].x, vertices[i].y, vertices[i].name, ctx1, ctx2, 'blue');
    } else drawVertix(vertices[i].x, vertices[i].y, vertices[i].name, ctx1, ctx2, 'red');
  }
  drawVertix(vertices[openVert].x, vertices[openVert].y, vertices[openVert].name, ctx1, ctx2, 'yellow')
  num++;
  deg.innerText = weigthToText(step.weight);
  markText.innerText = markToText(step.valid);
  pathText.innerText = pathToText(path)
  if (num === steps.length) {
    num = 0;
    alert('Роботу алгоритму завершено');
  }
};

const selectEdgeButton = () => {
  let res = prompt("Enter the vertices from and to for edge:\n Input like from_to",'4_7');
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  for (const key in edges) {
    const edge = edges[key];
    if (edge.loop) continue;
    drawWeigth(edge, ctx2)
  }
  ctx1.lineWidth = 4.0;
  ctx2.lineWidth = 3.0;
  ctx1.strokeStyle = "rgba(255,0,0,0.8)"
  const edge = edges[res];
  makeEdge(edge, ctx1, ctx2);
  drawWeigth(edge, ctx2, 'red')
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx1.lineWidth = 1.0;
  drawSymGrWithoutClean(zeroDMatr, ctx1, ctx2);
  };

const selectStartButton = () => {
  let res = prompt("Enter the start vertex:\n");
  start = parseInt(res) - 1;
  steps = dejkstraAlg(infWeigthMatr, start);
  num = 0;
}

nonSym.addEventListener('click', graphButton);
startV.addEventListener('click', selectStartButton);
nextG.addEventListener('click', () => nextClick(zeroDMatr));
selectEdge.addEventListener('click', selectEdgeButton);
