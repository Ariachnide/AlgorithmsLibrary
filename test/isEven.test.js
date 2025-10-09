import { expect } from "chai";
import isEven from "../src/isEven.js";

describe("isEven", function() {
    it("should identify positive even numbers", function() {
        expect(isEven(0)).to.be.true;
        expect(isEven(10)).to.be.true;
    });
    it("should identify positive odd numbers", function() {
        expect(isEven(1)).to.be.false;
        expect(isEven(7)).to.be.false;
    });
    it("should identify negative numbers correctly", function() {
        expect(isEven(-12)).to.be.true;
        expect(isEven(-31)).to.be.false;
    });
    it("should identify large numbers correctly", function() {
        expect(isEven(500000)).to.be.true;
        expect(isEven(500001)).to.be.false;
    });
});
