const base_url = "http://localhost:5000/api"

// Function to submit contact data
export async function submitContact(form) {
	try {
		const response = await fetch(`${base_url}/contact`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
		});
		if (!response.ok) {
			throw new Error('Failed to submit contact');
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

