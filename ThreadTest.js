'use strict';
/* global JSThread */

let $ = document.getElementById.bind(document); // jquery extra super lite, lol

window.onload = JSThread.create(function *(e) {
	console.log('window.onload', e);
	console.log('Setting up threads...');

	// create + generator
	let genThread = JSThread.create(function *(id, loops = 1000, work = 15000000) {
		console.log('Initializing', id);

		for (let c = 1; c < loops; c++) {
			for (let d = 0; d < work; d++) {
				// do some work!
			}

			$(id).innerText = c;
			yield; // yield to the event loop
		}

		return id;
	});

	// create + async
	let asyncThread = JSThread.create(async function (id, loops = 1000, wait = 4) {
		console.log('Initializing', id);

		for (let c = 1; c < loops; c++) {
			$(id).innerText = c;
			await JSThread.sleep(wait);
		}

		return id;
	});

	// spawn some threads
	genThread('genThreadA', 200).then(id => {
		$(id).innerText = id + ' done!';
	});

	genThread('genThreadB', 500).then(id => {
		$(id).innerText = id + ' done!';
	});

	genThread('genThreadC', 1000).then(id => {
		$(id).innerText = id + ' done!';
	});

	asyncThread('asyncThreadA', 200).then(id => {
		$(id).innerText = id + ' done!';
	});

	asyncThread('asyncThreadB', 500).then(id => {
		$(id).innerText = id + ' done!';
	});

	asyncThread('asyncThreadC', 1000, 1000 / 60).then(id => { // 60 fps
		$(id).innerText = id + ' done!';
	});

	console.log('Done setting up threads...');

	// infinitely do some work
	for (let c = 0; true; c++) {
		$('onload').innerText = c;
		yield; // yield to the event loop (allows DOM updates, prevents warnings about lengthy event handlers)
	}
});
