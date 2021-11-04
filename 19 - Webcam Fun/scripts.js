const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const greenEffectBtn = document.querySelector('.green-effect-btn');
const rgbSplitBtn = document.querySelector('.rgb-split-btn');
let greenEffectOn = false;
let rgbSplitOn = false;

function getMedia(constraints, callback) {
	if (navigator.mediaDevices) {
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(stream => {
				// get a MediaStream object
				console.log(stream);
				callback(stream);
			})
			.catch(err => {
				alert(err.message);
			});
	} else {
		alert('Please load the website in a secure origin.');
	}
}

function streamVideo(stream) {
	video.srcObject = stream;
	video.play();
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;

	// make canvas display in 100% resolution
	canvas.width = width;
	canvas.height = height;
	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;

	ctx.drawImage(video, 0, 0, width, height);
	setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageData(0, 0, width, height);
		// console.log(pixels);
		// ctx.globalAlpha = 0.1; // ghost effect
        if(greenEffectOn) pixels = greenEffect(pixels);
        if(rgbSplitOn) pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);
		ctx.putImageData(pixels, 0, 0);
	}, 16);
}

function takePhoto() {
	snap.currentTime = 0;
	snap.play();

	// add a selfie photo to the strip
	const base64Str = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = base64Str;
	link.setAttribute('download', 'selfie');
	link.insertAdjacentHTML('afterbegin', `<img src=${base64Str} />`);
	strip.insertAdjacentElement('afterbegin', link);
}

function greenEffect(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i] = pixels.data[i] - 50; // r
		pixels.data[i + 1] = pixels.data[i + 1] + 10; // g
		pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // b
	}
	return pixels;
}

function rgbSplit(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i - 150] = pixels.data[i]; // r
		pixels.data[i + 500] = pixels.data[i + 1]; // g
		pixels.data[i - 550] = pixels.data[i + 2]; // b
	}
	return pixels;
}

function greenScreen(pixels) {
	const levels = {};

	document.querySelectorAll('.rgb input').forEach(input => {
		levels[input.name] = input.value;
	});

	for (let i = 0; i < pixels.data.length; i += 4) {
        const red = pixels.data[i];
        const green = pixels.data[i + 1];
        const blue = pixels.data[i + 2];
        // take out the pixel that's within the selected range
		if (
			red >= levels.rmin &&
			red <= levels.rmax &&
			green >= levels.gmin &&
			green <= levels.gmax &&
			blue >= levels.bmin &&
			blue <= levels.bmax
		) {
            pixels.data[i + 3] = 0;
		}
	}

	return pixels;
}

// Main
getMedia({ video: true, audio: false }, streamVideo);
video.addEventListener('canplay', paintToCanvas);
greenEffectBtn.addEventListener('click', () => greenEffectOn = !greenEffectOn);
rgbSplitBtn.addEventListener('click', () => rgbSplitOn = !rgbSplitOn);
