function capitalizeFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function lowercaseFirst(word) {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

function resolveBbox2Array(bboxString) {
  //"BOX(115.43118019999604 39.446653199997186,117.49758059999543 41.04541610000314)"
  const regex = /(-?\d+\.\d+)/g;
  const numbers = [...bboxString.matchAll(regex)].map((match) =>
    parseFloat(match[0])
  );
  return numbers;
}

export { capitalizeFirst, lowercaseFirst, resolveBbox2Array };
