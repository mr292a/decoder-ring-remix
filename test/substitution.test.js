// Write your tests here!
const { expect } = require("chai");
const substitutionModule = require("../src/substitution");

describe("substitution", () => {
  it("should encode a message", () => {
        const actual = substitutionModule.substitution("thinkful", "xoyqmcgrukswaflnthdjpzibev");
    const expected = "jrufscpw";
        expect(actual).to.eql(expected);
  });
  it("should encode a message that has spaces in it", () => {
        const actual = substitutionModule.substitution("You are an excellent spy", "xoyqmcgrukswaflnthdjpzibev");
    const expected = "elp xhm xf mbymwwmfj dne";
        expect(actual).to.eql(expected);
  });
  it("should ignores capital letters", () => {
        const actual = substitutionModule.substitution("You are an excellent spy", "xoyqmcgrukswaflnthdjpzibev");
    const expected = "elp xhm xf mbymwwmfj dne";
        expect(actual).to.eql(expected);
  });
  it("should decode a message", () => {
        const actual = substitutionModule.substitution("y&ii$r&", "$wae&zrdxtfcygvuhbijnokmpl", false);
    const expected = "message";
        expect(actual).to.eql(expected);
  });
  it("should decode a message that has spaces in it", () => {
        const actual = substitutionModule.substitution("elp xhm xf mbymwwmfj dne", "xoyqmcgrukswaflnthdjpzibev", false);
    const expected = "you are an excellent spy";
        expect(actual).to.eql(expected);
  });
      it("should return false if the alphabet parameter isn't exactly 26 characters", () => {
        const actual = substitutionModule.substitution("thinkful", "short");
    expect(actual).to.be.false;
      });
  it("should return false if the alphabet parameter has duplicate characters", () => {
        const actual = substitutionModule.substitution("thinkful", "shhorrt");
    expect(actual).to.be.false;
  });
  
  


});