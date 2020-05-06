const canvas1 = document.getElementById('lay01');
const canvas2 = document.getElementById('lay02');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const nonSym = document.getElementById('nonSym');
const tree = document.getElementById('tree');
const nextG = document.getElementById('nextG');
const nextT = document.getElementById('nextT');
const select = document.getElementById('select');
const deg = document.getElementById('degree');

const matr = makeSymMatrix(Lab5);
const weigth = LabW5;
let start = 0;
let num = 0;

const vertices = makeVertices(matr);
searchReletions(matr, vertices);
const edges = makeEdges(matr, vertices);
const ourData = data(matr, LabW5, edges)  
const result = findOstTree(matr, ourData);
const zeroDMatr = zeroDiagonal(matr);
const backboneMatr = makeBackboneMatr(matr, edges, result);

addWeigth(edges, weigth);

deg.innerText = 'The Weigth:\n' + matrixToText(weigth);




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
  num = 0;
};

const treeButton = () => {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx2.strokeStyle = 'black';
  for (const el of result) {
    const edge = edges[el[0]];
    makeEdge(edge, ctx1, ctx2);
    drawWeigth(edge, ctx2)
  }
  drawVertices(vertices, ctx1, ctx2)
  num = 0;
  deg.innerText = 'The backbone of the graph:\n' + matrixToText(backboneMatr)

}



const nextClickG = (matr) => {
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
  const res = result.slice(0, num + 1);
  for (const el of res) {
    const edge = edges[el[0]];
    makeEdge(edge, ctx1, ctx2);
    drawWeigth(edge, ctx2, 'red')
  }
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx1.lineWidth = 1.0;
  drawSymGrWithoutClean(matr, ctx1, ctx2);
  num++;
  if (num === result.length) {
    num = 0;
    alert('Кістяк сформовано');
  }
};

const selectButton = () => {
  res = prompt("Enter the vertices from and to for edge:\n Input like from_to",'4_7');
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
  drawSymGrWithoutClean(matr, ctx1, ctx2);
  num++;
  if (num === result.length) {
    num = 0;
    alert('Кістяк сформовано');
  }
};


const nextClickT = (matr) => {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  for (const el of result) {
    const edge = edges[el[0]];
    makeEdge(edge, ctx1, ctx2);
    drawWeigth(edge, ctx2)
  }
  ctx1.lineWidth = 4.0;
  ctx2.lineWidth = 3.0;
  ctx1.strokeStyle = "rgba(255,0,0,0.8)"
  const res = result.slice(0, num + 1);
  for (const el of res) {
    const edge = edges[el[0]];
    makeEdge(edge, ctx1, ctx2);
    drawWeigth(edge, ctx2, 'red')
  }
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx1.lineWidth = 1.0;
  drawSymGrWithoutClean(matr, ctx1, ctx2);
  num++;
  if (num === result.length) {
    num = 0;
    alert('Кістяк сформовано');
  }
};

// enabledBox.addEventListener("click", isFullpath);
nonSym.addEventListener('click', graphButton);
tree.addEventListener('click', treeButton);
nextG.addEventListener('click', () => nextClickG(zeroDMatr));
nextT.addEventListener('click', () => nextClickT(backboneMatr));
select.addEventListener('click', selectButton);
