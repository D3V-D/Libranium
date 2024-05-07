document.getElementById("generate-button").addEventListener("click", function() {
    const textarea = document.querySelector("textarea")

    if (!textarea.value ) {
        alert("Description cannot be empty!")
        return
    }

    if (textarea.value.length > 500) {
        alert("Description is too long!")
        return
    }

    if (textarea.value.length < 10) {
        alert("Please use a longer description for better results.")
        return
    }

    generate(textarea.value)
})

async function generate(description) {
    document.getElementById("loader").style.display = "flex"

    fetch('../.netlify/functions/infer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            textInput: description
        })
    }).then(response => {
        if (!response.ok) {
            document.getElementById("loader").style.display = "none"
            alert("Error when generating. Try again.")
            console.error(response)
        }
        return response.json()
    }).then(data => {
        // handle
        displayResponse(data)
    }).catch(error => {
        console.error(error)
    })
}

function displayResponse(data) {
    document.getElementById("loader").style.display = "none"

    document.getElementById("results-overlay").style.display = "flex"
    document.getElementById("results-text").innerText = data.choices[0].message.content
}


document.getElementById("close-overlay").addEventListener("click", () => {
    document.getElementById("results-overlay").style.display = "none"
    document.getElementById("results-text").innerText = ""
})
  