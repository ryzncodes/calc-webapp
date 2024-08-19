// Initialize Socket.io client
const socket = io(); // This connects to the server using the Socket.io client library

// Handle form submission
document
	.getElementById('calculator-form')
	.addEventListener('submit', function (event) {
		event.preventDefault();
		const input1 = parseFloat(document.getElementById('input1').value);
		const input2 = parseFloat(document.getElementById('input2').value);
		const input3 = parseFloat(document.getElementById('input3').value);
		const input4 = parseFloat(document.getElementById('input4').value);
		const input5 = parseFloat(document.getElementById('input5').value);

		// Placeholder logic for outputs
		const output1 = input1 + input2 + input3 + input4 + input5;
		const output2 = input1 * input2 * input3 * input4 * input5;

		document.getElementById('output1').textContent = output1;
		document.getElementById('output2').textContent = output2;

		// Emit the incrementCounter event to the server
		socket.emit('incrementCounter');
	});
