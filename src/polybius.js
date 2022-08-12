// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  // you can add any code you want here.
  const keys = {
    alphaKey: _createKey("alpha"),
    coordKey: _createKey("coord"),
};


  function polybius(input, encode = true) {
    //Instead of hardcoding the keys, I created key matrices with developer functions 
    try {
      if (!input.length) throw new Error(`Input cannot be empty!`);
      return input
        .split(" ")
        .map((word) => _iterateWord(word, encode, keys))
        .join(" ");
    } catch (error) {
      return false; //if any of the words gives an error, it'll return false
    }
  }


  //Helper function to handle iteration differences between encoding and decoding
  function _iterateWord(word, encode, { alphaKey, coordKey }) {

    if (encode)
      return word
        .toLowerCase()
        .split("")
        .map((letter) => _mapMatrixTo(letter, alphaKey, coordKey))
        .join("");


    if (word.length % 2 !== 0)
      throw new Error(
        `Polybius coordinates come in pairs.\nIgnoring spaces, you cannot decrypt with an odd numbered total!`
      ); //if we're decoding an odd-length word, the output is false
    //iterate by each code, which is composed of 2 characters
    let output = "";
    for (let char = 0; char < word.length; char += 2) {
      const col = word[char];
      const row = word[char + 1];
      const code = `${col}${row}`;
      output += _mapMatrixTo(code, coordKey, alphaKey);
    }
    return output;
  }

  function _mapMatrixTo(input, fromKey, toKey) {
    const coordinate = _findCoordinate(input, fromKey); //finds the matching coordinate in fromKey
    if (!coordinate) throw new Error(`"${input}" is not a valid input!`); //if it finds a match in the fromKey and is an invalid input, return false.
    const row = coordinate[0]; // 1st element
    const col = coordinate[1]; // 2nd element
    return toKey[row][col]; //puts on display
  }
  
  function _findCoordinate(input, key) {
    if (input === "i" || input === "j") input = "(i/j)"; //if its i or j, then it'll be treated as (i/j)
    for (let row = 0; row < 5; row++)
      for (let col = 0; col < 5; col++) {
        if (key[row][col] === input) return [row, col];
      }
    return false; //if we don't find a match, return false
  }

 
  function _createKey(type = "alpha", size = 5) {
    //Creates a matrix of the specified type and size to use as an encryption key
    const grid = [];
    for (let row = 0; row < size; row++) {
      const thisRow = [];
      for (let col = 0; col < size; col++) {
        type === "alpha"
          ? thisRow.push(_alphaIndex(row, col, size))
          : thisRow.push(_coordIndex(row, col));
      }
      grid.push(thisRow);
    }
    return grid;
  }
  //resolves row and col into a 1d numberline, then add 97 to make it charcode lowercase alpha
  function _alphaIndex(row, col, size) {
    const number = row * size + col;
    let charCode = number + 97; //Add 97 to start from charCode "a".
    if (charCode === 105) return "(i/j)";
    const shift = charCode > 105 ? 1 : 0; 
    return String.fromCharCode(charCode + shift);
  }
  //resolves row and col into `${col}${row}` where both start at 1 instead of zero
  function _coordIndex(row, col) {
    return `${col + 1}${row + 1}`;
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };