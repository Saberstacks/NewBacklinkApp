document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('input-field');
  const submitButton = document.getElementById('submit-button');
  const resultDiv = document.getElementById('result');

  submitButton.addEventListener('click', () => {
    const userInput = inputField.value.trim();
    if (!userInput) {
      alert('Please enter the required domain.');
      return;
    }

    const payload = { target: userInput };

    fetch('/api/backlink-tracking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error || 'An error occurred');
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          resultDiv.innerHTML = `<div class="error">Error: ${data.error}</div>`;
        } else {
          resultDiv.textContent = JSON.stringify(data, null, 2);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        resultDiv.innerHTML = `<div class="error">An error occurred: ${error.message}</div>`;
      });
  });
});
