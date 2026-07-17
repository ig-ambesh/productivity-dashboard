const quoteText = document.getElementById("widget-quote-text");
const quoteAuthor = document.getElementById("widget-quote-author");
const quoteButton = document.getElementById("btn-new-quote");
const loading = document.getElementById("quote-loading");
const quoteBody = document.querySelector(".widget-quote-body");

async function fetchQuote() {

    try {

        loading.style.display = "flex";
        quoteBody.style.display = "none";

        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await response.json();

        quoteText.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `— ${data.author}`;

    } catch (error) {

        quoteText.textContent = '"Unable to load quote."';
        quoteAuthor.textContent = "— Try again later";

    } finally {

        loading.style.display = "none";
        quoteBody.style.display = "flex";

    }

}

quoteButton.addEventListener("click", fetchQuote);

fetchQuote();