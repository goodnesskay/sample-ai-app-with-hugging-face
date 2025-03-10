const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

const HUGGING_FACE_API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;
const MODEL_URL = process.env.HUGGING_FACE_BASE_URL;

app.use(express.json());
app.use(cors());

app.post('/api/v1/generate', async (req, res) => {
    const inputText = req.body.text;

    try {
        const response = await axios.post(MODEL_URL+'/HuggingFaceH4/zephyr-7b-beta', {
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

app.post('/api/v1/image/generate', async (req, res) => {
    const inputText = req.body.text;

    try {
        const response = await axios.post(MODEL_URL+'/CompVis/stable-diffusion-v1-4', {
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

app.post('/api/v1/music/generate', async (req, res) => {
    const inputText = req.body.text;

    try {
        const response = await axios.post(MODEL_URL+'/HeyLucasLeao/gpt-neo-small-emo-lyrics', {
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
