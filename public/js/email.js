document
	.getElementById('email-form')
	.addEventListener('submit', function (event) {
		event.preventDefault();
		const email = document.getElementById('email').value;

		fetch('http://localhost:3000/submit-email', {
			// Use the full URL
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Email submitted:', data);
				alert('Thank you for subscribing!');
				document.getElementById('email-form').reset(); // Clear form fields
			})
			.catch((error) => {
				console.error('Error:', error);
				alert('There was an error submitting your email. Please try again.');
			});
	});
