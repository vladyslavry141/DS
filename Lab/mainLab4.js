const canvas1 = document.getElementById('lay01');
const canvas2 = document.getElementById('lay02');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const nonSym = document.getElementById('nonSym');
const tree = document.getElementById('tree');
const nextG = document.getElementById('nextG');
const nextT = document.getElementById('nextT');
const printBlock = document.getElementById("printBlock");
const matrix = document.getElementById('matrix');
const deg = document.getElementById('degree');
const enabledBox = document.myForm.enabled;
const matr = Lab4;

let start = 0;
let num = 0;
let massage = 'You reached the end';

const vertices = makeVertices(matr);
searchReletions(matr, vertices);
const vectors = makeVectors(matr, vertices);
const pathA = DepthFirstSearch(matr, start);
const pathB = getDFSWithoutBack(pathA);
const pathObjA = pathA.map(el => `${el[0] + 1}_${el[1] + 1}`);
const pathObjB = pathB.map(el => `${el[0] + 1}_${el[1] + 1}`);
let path = pathB;
let pathObj = pathObjB;
const numericMatrix = getNumericMatrix(matr, start);  
const treeMatrix = getTreeMatrix(matr, path);
deg.innerText = 'The vertex correspondence matrix:\n' + textMartix(numericMatrix);

const graphButton = () => {
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx2.strokeStyle = 'black';
  drawGraph(matr, ctx1, ctx2, matrix);
  num = 0;
};

const treeButton = () => {
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx2.strokeStyle = 'black';
  drawGraph(treeMatrix, ctx1, ctx2, matrix);
  num = 0;
}
const isFullpath = (e) => {
  i = 0;
  let enabled = e.target.checked;
  pathObj = enabled ? pathObjA : pathObjB;
  massage = enabled ? 'You reached the start' : 'You reached the end';
  path = enabled ? pathA : pathB;  
  printBlock.textContent = enabled;
}


const nextClick = (matr) => {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx1.lineWidth = 4.0;
  ctx2.lineWidth = 3.0;
  ctx1.strokeStyle = "rgba(255,0,0,0.8)"
  drawVector(vectors[pathObj[num]], ctx1, ctx2);
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx1.lineWidth = 1.0;
  drawGrWithoutClean(matr, ctx1, ctx2, matrix)
  const from = path[num][0];
  const goTo = path[num][1];
  ctx1.fillStyle = 'white';
  console.log(vertices[from]);
  ctx1.beginPath();
  ctx1.arc(vertices[from].x, vertices[from].y, 15, 0, Math.PI * 2);
  ctx1.fill();
  ctx1.beginPath();
  ctx1.arc(vertices[goTo].x, vertices[goTo].y, 15, 0, Math.PI * 2);
  ctx1.fill();
  drawVertix(vertices[from].x, vertices[from].y, vertices[from].name, ctx1, ctx2, 'green')
  drawVertix(vertices[goTo].x, vertices[goTo].y, vertices[goTo].name, ctx1, ctx2, 'blue')
  num++;
  if (num === pathObj.length) {
    num = 0;
    alert(massage);
  };
}
enabledBox.addEventListener("click", isFullpath);
nonSym.addEventListener('click', graphButton);
tree.addEventListener('click', treeButton);
nextT.addEventListener('click', () => nextClick(treeMatrix));
nextG.addEventListener('click', () => nextClick(matr));
