const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT;

const HUGGING_FACE_API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;
const MODEL_URL = process.env.HUGGING_FACE_BASE_URL;

app.use(express.json());

app.post('/api/v1/generate', async (req, res) => {
    const inputText = req.body.text;

    try {
        const response = await axios.post(MODEL_URL+'/meta-llama/Llama-2-70b-hf', {
            inputs: inputText,
        }, {
            headers: {
                'Authorization': `Bearer ${HUGGING_FACE_API_TOKEN}`
            }
        });

        res.send(response.data);
    } catch (error) {
        console.error('Error calling the Hugging Face API:', error);
        res.status(500).send('An error occurred', error);
    }
});

app.get('/', async (req, res) => {
    res.send("Welcome to the Sample API with Hugging Face");
});

app.listen(port, () => {
    console.log(`AI server listening at port ${port}`);
});
