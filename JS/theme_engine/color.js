// Function to generate a random color when no picture link is provided in the JSON
function getRandomColor() {
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);

	const color = `rgb(${red},${green},${blue})`;

	return color;
}

// Declaration of constant that contains the different set of colors for the chat mockup GUI
const colorThemes = [
	{
		accent_color: "#489ed9",
		accent_color_interaction: "#62b7d9",
		gradient: "linear-gradient(150deg, rgba(87, 113, 254, 1) 0%, rgba(35, 158, 231, 1) 50%, rgba(137, 211, 196, 1) 100%)"
	},
	{
		accent_color: "#eb64ff",
		accent_color_interaction: "#f08eff",
		gradient: "linear-gradient(150deg, rgba(122, 8, 141, 1) 0%, rgba(203, 50, 172, 1) 50%, rgba(253, 81, 145, 1) 100%)"
	},
	{
		accent_color: "#59d948",
		accent_color_interaction: "#81e474",
		gradient: "linear-gradient(150deg, rgba(44, 141, 8, 1) 0%, rgba(92, 203, 50, 1) 50%, rgba(139, 253, 81, 1) 100%)"
	},
	{
		accent_color: "#ff9a8b",
		accent_color_interaction: "#ff6a88",
		gradient: "linear-gradient(150deg, rgba(255, 154, 139, 1) 0%, rgba(255, 106, 136, 1) 50%, rgba(255, 63, 63, 1) 100%)"
	},
	{
		accent_color: "#8e2de2",
		accent_color_interaction: "#4a00e0",
		gradient: "linear-gradient(150deg, rgba(142, 45, 226, 1) 0%, rgba(74, 0, 224, 1) 50%, rgba(0, 0, 128, 1) 100%)"
	},
	{
		accent_color: "#f7971e",
		accent_color_interaction: "#ffd200",
		gradient: "linear-gradient(150deg, rgba(247, 151, 30, 1) 0%, rgba(255, 210, 0, 1) 50%, rgba(255, 170, 0, 1) 100%)"
	},
	{
		accent_color: "#00c6ff",
		accent_color_interaction: "#0072ff",
		gradient: "linear-gradient(150deg, rgba(0, 198, 255, 1) 0%, rgba(0, 114, 255, 1) 50%, rgba(0, 50, 255, 1) 100%)"
	},
	{
		accent_color: "#76b852",
		accent_color_interaction: "#8dc26f",
		gradient: "linear-gradient(150deg, rgba(118, 184, 82, 1) 0%, rgba(141, 194, 111, 1) 50%, rgba(155, 210, 120, 1) 100%)"
	},
	{
		accent_color: "#fc4a1a",
		accent_color_interaction: "#f7b733",
		gradient: "linear-gradient(150deg, rgba(252, 74, 26, 1) 0%, rgba(247, 183, 51, 1) 50%, rgba(251, 114, 76, 1) 100%)"
	},
	{
		accent_color: "#11998e",
		accent_color_interaction: "#38ef7d",
		gradient: "linear-gradient(150deg, rgba(17, 153, 142, 1) 0%, rgba(56, 239, 125, 1) 50%, rgba(43, 212, 100, 1) 100%)"
	},
	{
		accent_color: "#ee0979",
		accent_color_interaction: "#ff6a00",
		gradient: "linear-gradient(150deg, rgba(238, 9, 121, 1) 0%, rgba(255, 106, 0, 1) 50%, rgba(255, 40, 0, 1) 100%)"
	},
	{
		accent_color: "#283c86",
		accent_color_interaction: "#45a247",
		gradient: "linear-gradient(150deg, rgba(40, 60, 134, 1) 0%, rgba(69, 162, 71, 1) 50%, rgba(56, 168, 50, 1) 100%)"
	},
	{
		accent_color: "#52cc92",
		accent_color_interaction: "#99f2c8",
		gradient: "linear-gradient(150deg, rgba(31, 64, 55, 1) 0%, rgba(153, 242, 200, 1) 50%, rgba(0, 184, 148, 1) 100%)"
	},
	{
		accent_color: "#c33764",
		accent_color_interaction: "#1d2671",
		gradient: "linear-gradient(150deg, rgba(195, 55, 100, 1) 0%, rgba(29, 38, 113, 1) 50%, rgba(0, 0, 50, 1) 100%)"
	},
	{
		accent_color: "#ff7e5f",
		accent_color_interaction: "#feb47b",
		gradient: "linear-gradient(150deg, rgba(255, 126, 95, 1) 0%, rgba(254, 180, 123, 1) 50%, rgba(255, 140, 0, 1) 100%)"
	},
	{
		accent_color: "#6a11cb",
		accent_color_interaction: "#2575fc",
		gradient: "linear-gradient(150deg, rgba(106, 17, 203, 1) 0%, rgba(37, 117, 252, 1) 50%, rgba(0, 64, 255, 1) 100%)"
	},
	{
		accent_color: "#e53935",
		accent_color_interaction: "#e35d5b",
		gradient: "linear-gradient(150deg, rgba(229, 57, 53, 1) 0%, rgba(227, 93, 91, 1) 50%, rgba(255, 0, 0, 1) 100%)"
	},
	{
		accent_color: "#56ab2f",
		accent_color_interaction: "#a8e063",
		gradient: "linear-gradient(150deg, rgba(86, 171, 47, 1) 0%, rgba(168, 224, 99, 1) 50%, rgba(124, 252, 0, 1) 100%)"
	},
	{
		accent_color: "#e44d26",
		accent_color_interaction: "#f16529",
		gradient: "linear-gradient(150deg, rgba(228, 77, 38, 1) 0%, rgba(241, 101, 41, 1) 50%, rgba(255, 165, 0, 1) 100%)"
	},
	{
		accent_color: "#34e89e",
		accent_color_interaction: "#0f3443",
		gradient: "linear-gradient(150deg, rgba(52, 232, 158, 1) 0%, rgba(15, 52, 67, 1) 50%, rgba(0, 128, 128, 1) 100%)"
	}
];

// Function to take the random color and the color theme and apply it to the chat GUI
function setRandomTheme() {
	const profilePic = document.querySelector(".profilePic");
	
	const randomIndex = Math.floor(Math.random() * colorThemes.length);
	const theme = colorThemes[randomIndex];
	
	profilePic.style.backgroundColor = theme.accent_color;
	document.documentElement.style.setProperty("--accent-color", theme.accent_color);
	document.documentElement.style.setProperty("--accent-color-interact", theme.accent_color_interaction);
	document.body.style.background = theme.gradient;

	let incomingMessages = document.querySelectorAll(".inBubble");
	incomingMessages.forEach((element) => {
		setTextColorBasedOnBg(element, theme.accent_color);
	});
}

// Functions that use the accent color defined with setRandomTheme() and calculate brightness to update incoming message bubble font color
function getBrightness(color) {
    // Convert hex color to RGB
    let r, g, b;
    if (color.charAt(0) === '#') {
        color = color.substring(1);
        if (color.length === 3) {
            r = parseInt(color.charAt(0) + color.charAt(0), 16);
            g = parseInt(color.charAt(1) + color.charAt(1), 16);
            b = parseInt(color.charAt(2) + color.charAt(2), 16);
        } else {
            r = parseInt(color.substring(0, 2), 16);
            g = parseInt(color.substring(2, 4), 16);
            b = parseInt(color.substring(4, 6), 16);
        }
    } else {
        [r, g, b] = color.match(/\d+/g).map(Number);
    }
    // Calculate brightness
    return (r * 299 + g * 587 + b * 114) / 1000;
}

function setTextColorBasedOnBg(element, bgColor) {
    const brightness = getBrightness(bgColor);
    element.style.color = brightness > 128 ? 'black' : 'white';
}