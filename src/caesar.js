// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  // you can add any code you want within this function scope
  function caesar(input, shift, encode = true) {
    try {
      if (!shift || shift < -25 || shift > 25)
        throw new Error(`Shift must be defined and be between -25 and 25`); // valid shift checking
      if (typeof input !== "string")
        throw new Error(`Input provided must be a defined`); // valid input checking

      shift *= encode ? 1 : -1; //if we are decoding, we need to shift in the opposite direction

      return input //iterate through the input string and map our shifted characters
        .toLowerCase()
        .split("")
        .map((character) => _shifter(character, shift))
        .join("");
    } catch (error) {
      //console.log(`${error}`); //uncomment to print the error to our console for debugging
      return false; //if we throw an error, we return false
    }
  }

  //Helper function that preforms the actual mathematical algorithm
  function _shifter(character, shift) {
    const key = "abcdefghijklmnopqrstuvwxyz".split(""); //array of alphabet as our cipher key

    if (!character.match(/[a-z]/)) return character; //if the current character isn't a letter, we aren't transforming it

    let index = key.indexOf(character); //find index number from key array
    let shifted = (((index + shift) % 26) + 26) % 26; //remainder of index plus shift plus the remainder of that plus 26
    return key[shifted];
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };