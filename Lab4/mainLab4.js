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
const pathObjA = pathA.map(el => `${el[0] + 1}_${el[1] + 1}`);
const openVerticesA = findOpenVerticesA(matr, start);
const pathB = getDFSWithoutBack(pathA);
const pathObjB = pathB.map(el => `${el[0] + 1}_${el[1] + 1}`);
const openVerticesB = findOpenVertices(matr, start);
let path = pathB;
let pathObj = pathObjB;
let openVertices = openVerticesB;
const numericArray = getNumericArray(matr, start);
const numericMatrix = getNumericMatrix(matr, start);  
const treeMatrix = getTreeMatrix(matr, path);

deg.innerText = 'The vertex correspondence matrix:\n' + matrixToText(numericMatrix);

const isFullpath = (e) => {
  i = 0;
  let enabled = e.target.checked;
  pathObj = enabled ? pathObjA : pathObjB;
  openVertices = enabled ? openVerticesA : openVerticesB;
  massage = enabled ? 'You reached the start' : 'You reached the end';
  path = enabled ? pathA : pathB;  
  printBlock.textContent = enabled;
}

const showAllNumeric = (matr, vertices, numericArray) => {
  for (let i = 0; i < matr.length; i++) {
  const num = numericArray[i];
  const vertex = vertices[num];
  showName(vertex.x + 12, vertex.y, i + 1, ctx1, ctx2, 'rgb(0, 204, 255)', 'black', ('10px serif'))
  }  
}

const graphButton = () => {
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx2.strokeStyle = 'black';
  drawGraph(matr, ctx1, ctx2, matrix);    
  showAllNumeric(matr, vertices, numericArray);
  num = 0;
};

const treeButton = () => {
  ctx1.strokeStyle = 'blue';
  ctx2.lineWidth = 2.0;
  ctx2.strokeStyle = 'black';
  drawGraph(treeMatrix, ctx1, ctx2, matrix);
  showAllNumeric(matr, vertices, numericArray);
  num = 0;
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
  drawGrWithoutClean(matr, ctx1, ctx2, matrix);
  for (let i = 0; i < openVertices[num].length; i++) {
    const vertice =  openVertices[num][i];
    drawVertix(vertices[vertice].x, vertices[vertice].y, vertices[vertice].name, ctx1, ctx2, 'green')
  }
  const goTo = path[num][1];
  drawVertix(vertices[goTo].x, vertices[goTo].y, vertices[goTo].name, ctx1, ctx2, 'blue')
  num++;
  showAllNumeric(matr, vertices, numericArray);
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
