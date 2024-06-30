// Function to generate a random color when no picture link is provided in the JSON
function getRandomColor() {
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);

	const color = `rgb(${red},${green},${blue})`;

	return color;
}

// Declaration of constant that contains the different set of colors for the chat mockup GUI
const colorThemes = {
	1: [
		"#489ed9",
		"#62b7d9",
		"linear-gradient(150deg,rgba(87, 113, 254, 1) 0%, rgba(35, 158, 231, 1) 50%, rgba(137, 211, 196, 1) 100%)"
	],
	2: [
		"#eb64ff",
		"#f08eff",
		"linear-gradient(150deg, rgba(122,8,141,1) 0%, rgba(203,50,172,1) 50%, rgba(253,81,145,1) 100%)"
	],
	3: [
		"#59d948",
		"#81e474",
		"linear-gradient(150deg, rgba(44,141,8,1) 0%, rgba(92,203,50,1) 50%, rgba(139,253,81,1) 100%)"
	]
};

// Function to take the random color and the color them and apply it to the chat GUI
function setRandomTheme() {
	const profilePic = document.querySelector(".profilePic");
	profilePic.style.backgroundColor = getRandomColor();
	const randomKey = Object.keys(colorThemes)[
		Math.floor(Math.random() * Object.keys(colorThemes).length)
	];
	const theme = colorThemes[randomKey];

	document.documentElement.style.setProperty("--accent-color", theme[0]);
	document.documentElement.style.setProperty(
		"--accent-color-interact",
		theme[1]
	);
	document.body.style.background = theme[2];
}