const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Endpoint to fetch the API Key
app.get('/api/config/maps', (req, res) => {
  res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY || '' });
});

// Endpoint for Gemini Chat
app.post('/api/chat', async (req, res) => {
  const { prompt, contextData } = req.body;
  try {
    const systemInstruction = `You are the SupplyChain AI Manager. Use the provided active shipment data context to accurately answer user queries. Format answers clearly and concisely. Shipment Context: ${JSON.stringify(contextData)}`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: systemInstruction
        }
    });
    
    res.json({ reply: response.text });
  } catch (error) {
    console.error('Error with Gemini AI:', error);
    res.status(500).json({ error: 'Failed to communicate with AI Assistant.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
