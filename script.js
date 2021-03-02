const quoteContainer = document.querySelector("#quote-container")
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

let apiQuotes = [];
let count = 0;

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

function displayNewQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author)
        author.author = "Unknown";

    authorText.textContent = quote.author;

    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }

    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

async function getQuotesFromAPI() {

    showLoadingSpinner();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        displayNewQuote();
    } catch (err) {
        if (count < 3) {
            getQuotesFromAPI();
            count++;
        } else {
            quoteText.textContent = "Something Went Wrong"
            authorText.textContent = ":(";
            removeLoadingSpinner();
        }
    }
}
// Tweet the Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuotesFromAPI);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotesFromAPI(); 