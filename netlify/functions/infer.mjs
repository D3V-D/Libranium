import fetch from 'node-fetch'

export const handler = async function (event, context) {
    try {
        const apiURL = process.env.ENDPOINT;
        const apiKey = process.env.KEY;

        const description = JSON.parse(event.body).textInput

        const payload = JSON.stringify({
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful assistant who recommends books based on a description provided. If the prompt is off-topic and doesn't request a book, you will politely refuse to answer."
                },
                {
                    "role": "user",
                    "content": "Please recommend me a book to read based on this description (there will be no follow up messages, so recommend some right now): " + description
                }
            ],
            "temperature": 0.85,
            "max_tokens": 256
        })

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }

        const response = await fetch(apiURL, {
            method: 'POST',
            headers: headers,
            body: payload
        })

        const respData = await response.json()

        if (!response.ok) { 
            throw new Error(response.statusText)
        }

        return {
            statusCode: 200,
            body: JSON.stringify(respData)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message})
        }
    }
}