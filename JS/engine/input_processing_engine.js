// Function that takes the input data and modifies the top bar of the GUI
function inputMessage() {
	setRandomTheme();
	let data = document.getElementById("inputData").value;
	let profilePic = document.querySelector("#profilePicLetter");
	let contact = document.querySelector("#contactName");
	let body = document.querySelector(".conversationBody");
	body.innerHTML = "";

	if (isJsonString(data)) {
		let jsonData = JSON.parse(data);

		contact.innerText = jsonData.contact;
		let picUrl = jsonData.pic_url;
		let picUrlDiv = document.querySelector(".profilePic");

		if (picUrl && picUrl != "" && picUrl != null) {
			picUrlDiv.innerHTML = "";
			let profilePicImg = document.createElement("img");
			profilePicImg.src = picUrl;
			picUrlDiv.appendChild(profilePicImg);
		} else {
			picUrlDiv.innerHTML = "";
			profilePicText = document.createElement("p");
			profilePicText.id = "profilePicLetter";
			profilePicText.innerText = jsonData.contact[0].toUpperCase();
			picUrlDiv.append(profilePicText);
		}

		updatedJsonParse(jsonData);
	}
	document.getElementById("inputData").value = "";
}

// Function to parse the input JSON and generate the chat bubbles interface
function updatedJsonParse(json) {
	let body = document.querySelector(".conversationBody");
	body.innerHTML = "";

	for (let [key, value] of Object.entries(json.messages)) {
		for (let direction of ["in", "out"]) {
			if (value[direction]) {
				value[direction].forEach((messageData, index) => {
					let bubble = document.createElement("div");
					bubble.classList.add(`${direction}Bubble`);

					if (index === 0) {
						bubble.classList.add("messageStackFirst");
					}
					if (index === value[direction].length - 1) {
						bubble.classList.add("messageStackLast");
					}
					if (index > 0 && index < value[direction].length - 1) {
						bubble.classList.add("messageStackBetween");
					}

					let p = document.createElement("p");
					p.textContent = messageData.message;
					let emoji = null;

					if (messageData.emoji) {
						emoji = document.createElement("div");
						emoji.innerText = messageData.emoji;
						emoji.setAttribute("class", "emojiReaction");
					}

					bubble.appendChild(p);
					emoji != null ? bubble.appendChild(emoji) : null;
					body.appendChild(bubble);
				});
			}
		}
	}
}

// Function to check whether input data is JSON
function isJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}