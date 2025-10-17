function isTenMinutesWalk(walk) {
	if (walk.length != 10) return false;

	let x = 0,
		y = 0;

	for (const direction of walk) {
		switch (direction) {
			case "n":
				y++; continue;
			case "s":
				y--; continue;
			case "e":
				x++; continue;
			case "w":
				x--; continue;
			default:
				console.error("Invalid value for walk direction: ", direction);
				return false;
		}
	}

	return x == 0 && y == 0;
}

export default isTenMinutesWalk;
