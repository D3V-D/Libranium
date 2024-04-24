document.getElementById("bookinput").addEventListener("keyup", function(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    searchBooks(document.getElementById("bookinput").value)
  }
})

async function searchBooks(query) {
  let url = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(query)

  await fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network response was not ok. " + response.statusText)
      }

      return response.json()
    })
    .then(function(data) {
      fillAutocomplete(data.items)
    })
    .catch(function(error) {
      console.error("Issue fetching books. " + error)
    })
}


function fillAutocomplete(completions) {
  const autocompleteBox = document.getElementById("book-autocomplete")
  autocompleteBox.innerHTML = ""
  for (completion of completions) {
    const title = completion.volumeInfo.title
    const authors = completion.volumeInfo.authors
    const snippet = completion.searchInfo && completion.searchInfo.textSnippet
    const image = completion.volumeInfo.imageLinks && completion.volumeInfo.imageLinks.thumbnail
    const isbn10 = completion.volumeInfo.industryIdentifiers && completion.volumeInfo.industryIdentifiers[0].identifier

    const completionElement = document.createElement("div")
    completionElement.classList.add("book-completion")
    completionElement.dataset.isbn = isbn10

    const completionImage = document.createElement("img")
    completionImage.classList.add("book-completion-image")
    completionImage.src = image || "public/homebg.png"

    const completionInfo = document.createElement("div")
    completionInfo.classList.add("book-completion-info")

    const completionTitle = document.createElement("h3")
    completionTitle.classList.add("book-completion-title")
    completionTitle.textContent = title

    const completionAuthors = document.createElement("p")
    completionAuthors.classList.add("book-completion-authors")
    completionAuthors.textContent = authors

    const completionSnippet = document.createElement("p")
    completionSnippet.classList.add("book-completion-snippet")
    completionSnippet.textContent = snippet

    const completionButton = document.createElement("button")
    completionButton.classList.add("book-completion-button")
    completionButton.textContent = "Add"

    completionInfo.append(completionTitle, completionAuthors, completionSnippet, completionButton)
    completionElement.append(completionImage, completionInfo)

    autocompleteBox.append(completionElement)
  }

  autocompleteBox.style.display = "flex"
}