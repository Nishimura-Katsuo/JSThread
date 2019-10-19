'use strict';
/* global JSThread */

let getId = document.getElementById.bind(document);

window.onload = JSThread.create(function *(e) {
	console.log('window.onload', e);
	getId('polyfillStatus').innerText = JSThread.polyfillStatus;
	console.log('Setting up threads...');

	// create + generator
	let genThread = JSThread.create(function *(id, loops = 1000, wait = 0) {
		console.log('Initializing', id);

		for (let c = 1; c < loops; c++) {
			getId(id).innerText = c;
			yield wait; // yield to the event loop
		}

		return id;
	});

	// create + async
	let asyncThread = JSThread.create(async function (id, loops = 1000, wait = 0) {
		console.log('Initializing', id);

		for (let c = 1; c < loops; c++) {
			getId(id).innerText = c;
			await JSThread.sleep(wait);
		}

		return id;
	});

	// spawn some threads
	genThread('genThreadA', 200).then(id => {
		getId(id).innerText = id + ' done!';
	});

	genThread('genThreadB', 500).then(id => {
		getId(id).innerText = id + ' done!';
	});

	genThread('genThreadC', 1000).then(id => { // 60 fps
		getId(id).innerText = id + ' done!';
	});

	asyncThread('asyncThreadA', 200).then(id => {
		getId(id).innerText = id + ' done!';
	});

	asyncThread('asyncThreadB', 500).then(id => {
		getId(id).innerText = id + ' done!';
	});

	asyncThread('asyncThreadC', 1000).then(id => { // 60 fps
		getId(id).innerText = id + ' done!';
	});

	console.log('Done setting up threads...');

	// infinitely do some work
	for (let c = 0; true; c++) {
		getId('onload').innerText = c;
		yield 1000 / 60; // yield to the event loop (allows DOM updates, prevents warnings about lengthy event handlers)
	}
});
