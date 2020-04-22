const canvas1 = document.getElementById('lay01');
const canvas2 = document.getElementById('lay02');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const nonSym = document.getElementById('nonSym');
const condGraph = document.getElementById('condGraph');
const ways2 = document.getElementById('ways2');
const ways3 = document.getElementById('ways3');
const matr2and3 = document.getElementById('matr2and3');
const matrix = document.getElementById('matrix');
const deg = document.getElementById('degree');
const components = document.getElementById('components');
ctx1.strokeStyle = 'blue';
ctx2.lineWidth = 2.0;
ctx2.strokeStyle = 'black';

const matr = Lab3;
const condMatr = makeCondMatr(matr);
const comp = getTextComponents(matr);
const reachMatrix = reachabilityMatr(matr);
const strongConMat = makeStrongConnectM(matr);
const ways2Arr = toHumanRead(findAllWays2(matr));
const ways3Arr = toHumanRead(findAllWays3(matr));
const matrPow2 = powerMatrix(matr, 2);
const matrPow3 = powerMatrix(matr, 3);

const condGraphButton = () => {
  drawGraph(condMatr, ctx1, ctx2, matrix)
  deg.innerText = comp;
};

const graphButton = () => {
  drawGraph(matr, ctx1, ctx2, matrix);
  printDeegre(matr, deg)
};

const ways3Button = () => {
  matrix.innerText = 'Strong Conectivity Matrix\n' + matrixToText(strongConMat);
  deg.innerText = 'Reachability Matrix\n' + matrixToText(reachMatrix);
  components.innerText = 'Ways3:\n' + getTextWays((ways3Arr));
}

const matr2and3Button = () => {
  matrix.innerText = 'Matrix^2\n' + matrixToText(matrPow2);
  deg.innerText = 'Matrix^3\n' + matrixToText(matrPow3);  
}

const ways2Button = () => {
  matrix.innerText = 'Strong Conectivity Matrix\n' + matrixToText(strongConMat);
  deg.innerText = 'Reachability Matrix\n' + matrixToText(reachMatrix);
  components.innerText = 'Ways2:\n' + getTextWays(ways2Arr);
}


nonSym.addEventListener('click', graphButton);
condGraph.addEventListener('click', condGraphButton);
ways3.addEventListener('click', ways3Button);
ways2.addEventListener('click', ways2Button);
matr2and3.addEventListener('click', matr2and3Button);