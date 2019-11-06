class BoardSquare {

  constructor(element, color) {
    this.element = element;
    this.element.addEventListener("click", this, false);
    this.isFaceUp = false;
    this.isMatched = false;
    this.setColor(color);
  }

  setColor(color) {
    const faceUpElement = this.element.getElementsByClassName('faceup')[0];
    faceUpElement.classList.remove(this.color);
    this.color = color;

    faceUpElement.classList.add(color);
  }

  handleEvent(event) {
  switch (event.type) {
    case "click":
      if (this.isFaceUp || this.isMatched) {
        return;
      }
      this.isFaceUp = true;
      this.element.classList.add('flipped');
      squareFlipped(this);
    }
  }

  reset() {
    this.isFaceUp = false;
    this.isMatched = false;
    this.element.classList.remove('flipped')
  }
  matchFound(){
    this.isFaceUp = true;
    this.isMatched = true;
  }
}

function generateHTMLForBoardSquares() {
  const numberOfSquares = 16;
  let squaresHTML = '';

  // generate HTML for board squares
  for (let i = 0; i < numberOfSquares; i++) {
    squaresHTML += `
      <div class="col-3 board-square">
        <div class="face-container">
          <div class="facedown"></div>
          <div class="faceup"></div>
        </div>
      </div>`;
  }

  // insert squares HTML in DOM
  const boardElement = document.getElementById('gameboard');
  boardElement.innerHTML = squaresHTML;

}

generateHTMLForBoardSquares();

const colorPairs = [];

function generateColorPairs() {
  if (colorPairs.length > 0) {
    return colorPairs;
  } else {
    // generates matching pair for each color
    for (let i = 0; i < 8; i++) {
      colorPairs.push('color-' + i);
      colorPairs.push('color-' + i);
    }

    return colorPairs;
  }
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleColors() {
  const colorPairs = generateColorPairs()
  return shuffle(colorPairs);
}

function setupGame() {
  generateHTMLForBoardSquares();

  const randomColorPairs = shuffleColors ();
}

const boardSquares = [];

function setupGame() {
  generateHTMLForBoardSquares();

  const randomColorPairs = shuffleColors();

  const squareElements = document.getElementsByClassName("board-square");

  for (let i = 0; i < squareElements.length; i++) {
    const element = squareElements[i];
    const color = randomColorPairs[i];
    // 3
    const square = new BoardSquare(element, color)

    boardSquares.push(square);
  }
}

let firstFaceupSquare = null;

function squareFlipped(square) {
  if(firstFaceupSquare === null) {
    firstFaceupSquare = square;
    return
  }

  if(firstFaceupSquare.color === square.color) {
    firstFaceupSquare.matchFound();
    square.matchFound();

    firstFaceupSquare = null;
  } else {
    const a = firstFaceupSquare;
    const b = square;

    firstFaceupSquare = null;

    setTimeout(function() {
      a.reset();
      b.reset();
    }, 400);
  }
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener('click',() => {
  resetGame();
});

function resetGame() {
  firstFaceupSquare = null;
  boardSquares.forEach((square) => {
    square.reset()
  });

  setTimeout(() => {
    const randomColorPairs = shuffleColors();
    for (let i = 0; i < boardSquares.length; i++) {
      const newColor = randomColorPairs[i];
      const square = boardSquares[i];

      square.setColor(newColor);
    }
  }, 500);

}


setupGame(); // DO NOT ERASE THIS OR GAME WILL NOT RUN
