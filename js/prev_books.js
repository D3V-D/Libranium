document.getElementById("bookinput").addEventListener("keyup", function(event) {
  event.preventDefault();
  searchBooks(document.getElementById("bookinput").value)
})

async function fetchBooks() {
  return fetch("../datasets/filtered_data.json")
    .then(response => response.json())
    .catch(error => console.error(error))
}

let books
document.addEventListener("DOMContentLoaded", async () => {
  books = await fetchBooks()
})

async function searchBooks(query) {
  if (query.length < 3) {
    return
  }
  const completions = books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase()) || book.ISBN === query || book.publisher.toLowerCase().includes(query.toLowerCase()))
  fillAutocomplete(completions)
}


function fillAutocomplete(completions) {

  const autocompleteBox = document.getElementById("book-autocomplete")
  autocompleteBox.innerHTML = ""
  
  if (!completions || completions.length == 0) {
    autocompleteBox.innerText = "No results found"
    return
  }
  
  for (completion of completions) {
    const title = completion.title
    const authors = completion.author
    const image = completion.imageUrlM || completion.imageUrlL || completion.imageUrlS || "public/homebg.png"
    const isbn10 = completion.ISBN

    // first check that isbn is not already in read list
    const readList = document.getElementById("current-books-list")
    if (readList.querySelector(`[data-isbn="${isbn10}"]`)) {
      continue
    }

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

    const completionButton = document.createElement("button")
    completionButton.classList.add("book-completion-button")
    completionButton.textContent = "Add"

    completionInfo.append(completionTitle, completionAuthors, completionButton)
    completionElement.append(completionImage, completionInfo)

    autocompleteBox.append(completionElement)

    completionButton.addEventListener("click", () => {
      const bookList = document.getElementById("current-books-list")

      // change completion button text and function
      completionButton.innerText = "Remove"
      completionButton.classList.add("remove-button")
      completionButton.addEventListener("click", () => {
        completionElement.remove()
      })

      // add rating input
      const ratingInputContainer = document.createElement("div")
      ratingInputContainer.classList.add("rating-input-container")

      const ratingLabel = document.createElement("label")
      ratingLabel.classList.add("rating-label")
      ratingLabel.innerText = "Rate out of 10: "

      const ratingInput = document.createElement("input")
      ratingInput.classList.add("rating-input")
      ratingInput.type = "number"
      ratingInput.min = 0
      ratingInput.max = 10
      ratingInput.step = 1
      ratingInput.value = 0
      ratingInput.id = isbn10 + "-rating"

      ratingInputContainer.append(ratingLabel, ratingInput)

      completionInfo.append(ratingInputContainer)

      bookList.append(completionElement)

      if (autocompleteBox.children.length == 0) {
        autocompleteBox.innerText = "No more books for this query. Try a different search term, or search the same query again if you've already added the full list."
      }
    })
  }

  autocompleteBox.style.visibility = "visible"
  document.getElementById("bookinput").classList.add("square-bottom-corners")
}

document.getElementById("generate-button").addEventListener("click", () => {
  // first, make sure already read list has at least one book
  const readList = document.getElementById("current-books-list")
  if (readList.children.length == 1) {
    alert("Please add at least one book to the list before generating")
    return
  }

  document.getElementById("loader").style.display = "flex"

  const books = {}

  for (book of readList.children) {
    if (book.id === "already-read") {
      continue // skip the header
    }
    // add each book and its rating to the list
    bookRating = document.getElementById(book.dataset.isbn + "-rating").value
    bookISBN = book.dataset.isbn
    books[bookISBN] = bookRating
  }

  generate(books)
})

function generate(books) {
  // generates based on isbn json
  
  // api url
  let api = "https://libranium-api.azurewebsites.net/api/recommend"

  // make request
  console.log(JSON.stringify(books))
  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(books)
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    showResults(response.json())
  }).then(data => {
    console.log("Server response:", data)
  }).catch(error => {
    console.error("Error:", error)
  })
}

async function showResults(data) {
  const results = await data
  
  for (key in results) {
    if (key.length != 10) { // key isnt an ISBN
      continue
    }
    
    const recommendation = document.createElement("li")
    recommendation.classList.add("recommendation")

    const recommendationTitle = document.createElement("h3")
    recommendationTitle.textContent = results[key]
    recommendationTitle.classList.add("recommendation-title")

    // can get more rec details via the key here

    recommendation.append(recommendationTitle)
    document.getElementById("loader").style.display = "none"
    document.getElementById("results-list").append(recommendation)
    document.getElementById("results-overlay").style.display = "flex"
  }
}

document.getElementById("close-overlay").addEventListener("click", () => {
  document.getElementById("results-overlay").style.display = "none"
  document.getElementById("results-list").innerHTML = ""
})
