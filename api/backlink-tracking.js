import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { target } = req.body;

  if (!target) {
    res.status(400).json({ error: 'Target (domain) is required' });
    return;
  }

  // Prepare the request payload as an array
  const payload = [
    {
      target: target,
      limit: 10,
      // Include other parameters if needed
    },
  ];

  try {
    // Make the API request to the sandbox environment
    const response = await axios({
      method: 'post',
      url: 'https://sandbox.dataforseo.com/v3/backlinks/backlinks/live',
      auth: {
        username: process.env.DATAFORSEO_LOGIN,
        password: process.env.DATAFORSEO_PASSWORD,
      },
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Access the result from the response
    const resultData = response.data.tasks[0].result[0];

    res.status(200).json(resultData);
  } catch (error) {
    const errorData = error.response ? error.response.data : { status_message: error.message };
    console.error('Error in Backlink Tracking:', errorData);
    res.status(500).json({ error: errorData.status_message || 'An error occurred' });
  }
}
