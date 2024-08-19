const socket = io();

// Fetch and display email submissions
fetch('/emails')
	.then((response) => response.json())
	.then((emails) => {
		const tableBody = document
			.getElementById('emails-table')
			.getElementsByTagName('tbody')[0];
		emails.forEach((email) => {
			const row = tableBody.insertRow();
			row.insertCell(0).textContent = email.id;
			row.insertCell(1).textContent = email.email;
		});
	})
	.catch((error) => console.error('Error fetching emails:', error));

// Socket.io logic for updating counter
socket.on('updateCounter', (count) => {
	document.getElementById('counter').textContent = count;
});
