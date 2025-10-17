import { expect } from "chai";
import isTenMinutesWalk from "../src/isTenMinutesWalk.js";

describe("isTenMinutesWalk", function () {
	it("should return true in case of valid pattern", function () {
		expect(isTenMinutesWalk(["n", "s", "n", "s", "n", "s", "n", "s", "n", "s"])).to.be.true;
	});
	it("should return false if there are less or more than 10 elements in array", function () {
		expect(isTenMinutesWalk(["w", "e", "w", "e", "w", "e", "w", "e", "w", "e", "w", "e"])).to.be.false;
		expect(isTenMinutesWalk(["w"])).to.be.false;
	});
	it("should return false if starting and ending points are different", function () {
		expect(isTenMinutesWalk(["n", "n", "n", "s", "n", "s", "n", "s", "n", "s"])).to.be.false;
	});
	it("should return false in case of invalid destination", function () {
		expect(isTenMinutesWalk(["n", "s", "n", "s", "n", "s", "n", "r", "n", "s"])).to.be.false;
	});
});
