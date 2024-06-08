function fetchRandomQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            const quote = data.content;
            const author = data.author;
            document.getElementById("quote").textContent = quote;
            document.getElementById("author").textContent = `— ${author}`;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
        });
}

function fetchQuoteByAuthor(authorName) {
    fetch(`https://api.quotable.io/quotes?author=${encodeURIComponent(authorName)}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const quote = data.results[0].content;
                const author = data.results[0].author;
                document.getElementById("quote").textContent = quote;
                document.getElementById("author").textContent = `— ${author}`;
            } else {
                document.getElementById("quote").textContent = 'No quotes found for this author.';
                document.getElementById("author").textContent = '';
            }
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
        });
}


document.getElementById("new-quote").addEventListener("click", fetchRandomQuote);
document.getElementById("search-quote").addEventListener("click", () => {
    const authorName = document.getElementById("author-name").value;
    if (authorName) {
        fetchQuoteByAuthor(authorName);
    } else {
        document.getElementById("quote").textContent = 'Please enter an author name.';
        document.getElementById("author").textContent = '';
    }
});

fetchRandomQuote();

