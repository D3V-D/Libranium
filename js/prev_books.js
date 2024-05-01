document.getElementById("bookinput").addEventListener("keyup", function(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    searchBooks(document.getElementById("bookinput").value)
  }
})

async function fetchBooks() {
  return fetch("../books_dataset/filtered_books.json")
    .then(response => response.json())
    .catch(error => console.error(error))
}

async function searchBooks(query) {
  if (query.length < 2) {
    return
  }
  const books = await fetchBooks()
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