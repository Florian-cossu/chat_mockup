// Define constant that capture the HTML and converts it into a PNG file
const capture = () => {
	html2canvas(document.body).then((canvas) => {
		const ctx = canvas.getContext("2d");

		const elementsWithBoxShadow = document.querySelectorAll(
			'*[style*="box-shadow"]'
		);
		elementsWithBoxShadow.forEach((element) => {
			const computedStyle = window.getComputedStyle(element);
			const boxShadow = computedStyle.getPropertyValue("box-shadow");
			const [offsetX, offsetY, blurRadius, spreadRadius, color] = boxShadow
				.match(/(-?\d+)px (-?\d+)px (-?\d+)px (-?\d+)px (.*)/)
				.slice(1);

			ctx.shadowOffsetX = parseInt(offsetX);
			ctx.shadowOffsetY = parseInt(offsetY);
			ctx.shadowBlur = parseInt(blurRadius);
			ctx.shadowColor = color;

			const rect = element.getBoundingClientRect();
			ctx.beginPath();
			ctx.rect(rect.left, rect.top, rect.width, rect.height);
			ctx.closePath();
			ctx.fill();
		});

		const imageData = canvas.toDataURL("image/png");
		const link = document.createElement("a");
		link.href = imageData;
		link.download = "screenshot.png";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	});
};