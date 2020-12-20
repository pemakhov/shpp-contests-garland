let timeCursor = 0;
const treeHeight = 15;
const lampColors = ["red", "green", "blue", "yellow"];

const blink = (element) => {
  let on = true;
  setInterval(() => {
    element.className = on ? "on" : "";
    on = !on;
  }, 800);
};

const type = (element, text) => {
  const pause = 100;
  const printLetter = (letter, i) => {
    setTimeout(() => {
      element.innerHTML += letter;
    }, pause * i);
  };
  [...text].map((letter, i) => {
    printLetter(text[i], i);
  });
  timeCursor += pause * text.length;
  timeCursor += 1000;
};

const getTree = (height) => {
  const getTreePart = () => (Math.random() > 0.5 ? "branch" : "lamp");

  let lamps = 0;

  const getLampColor = () => {
    lamps += 1;
    return lampColors[lamps % lampColors.length];
  };

  let tree = '<div id="tree"><br>';

  for (let i = 0; i <= height; i += 1) {
    tree += "<div>";
    tree += "<span>";
    tree += "&nbsp".repeat(height - i);
    tree += "</span>";
    for (let k = 0; k <= i + i; k += 1) {
      const treePart = getTreePart();
      const treePartSymbol = treePart === "branch" ? "x" : "o";
      const treePartClass =
        treePart === "branch" ? "branch" : `lamp ${getLampColor()}`;
      tree += `<span class="${treePartClass}">${treePartSymbol}</span>`;
    }
    tree += "</div>";
  }

  // trunk
  const trunkHeight = 2;
  for (let i = 0; i < trunkHeight; i += 1) {
    tree += '<div class="trunk">';
    tree += "&nbsp".repeat(height);
    tree += "8";
    tree += "</div>";
  }

  tree += "<br></div>";

  return tree;
};

const commandElement = document.getElementById("command");
const commandHistoryElement = document.getElementById("command-history");

const enterCommand = () => {
  commandHistoryElement.innerHTML += `${commandElement.innerHTML} <br>`;
  commandElement.innerHTML = "";
};

const lightsUp = () => {
  const tree = document.getElementById("tree");
  let counter = 0;
  setInterval(() => {
    tree.className = lampColors[counter % lampColors.length];
    counter += 1;
  }, 1000);
};

const run = () => {
  blink(document.getElementById("cursor"));
  type(commandElement, `drawChristmasTree(${treeHeight})`);
  setTimeout(() => enterCommand(), timeCursor);
  const tree = getTree(treeHeight);
  setTimeout(() => (commandHistoryElement.innerHTML += tree), timeCursor);
  timeCursor += 3000;
  setTimeout(() => type(commandElement, "lightsUp()"), timeCursor);
  timeCursor += 2000;
  setTimeout(() => enterCommand(), timeCursor);
  setTimeout(() => lightsUp(), timeCursor);
};

run();
