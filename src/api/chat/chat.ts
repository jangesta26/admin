const express = require('express');
const { SessionsClient } = require('@google-cloud/dialogflow');

const app = express();
const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionClient = new SessionsClient();
const sessionPath = sessionClient.projectAgentSessionPath(projectId, 'unique-session-id');

app.use(express.json());

app.post('/api/chat', async (req:any, res:any) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US',
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    const fulfillmentText = result.fulfillmentText;

    return res.status(200).json({ response: fulfillmentText });
  } catch (error) {
    console.error('Error handling chat request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
