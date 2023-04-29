
// Waits for HTML to load
window.addEventListener('load', function () {

    // Search Button
    const button = document.getElementById('searchButton');
    console.log(button);

    // Book Information
    let book = document.createElement('div')
    book.id = "bookInfo"
    const bookTitle = document.createElement('span');
    const bookAuthor = document.createElement('span');
    const bookPublished = document.createElement('span');

    // When Search Button is Clicked
    button.onclick = function () {

        // Gets search value from input field
        const searchValue = document.getElementById('search').value;
        console.log(searchValue);

        // Splits String
        const splitSearch = searchValue.split(" ");
        console.log(splitSearch);

        // Format Title for API Search
        let title = "";
        for (let i = 0; i < splitSearch.length; i++) {
            title += splitSearch[i];
            if (i < splitSearch.length - 1)
                title += "+"
        }

        title = title.toLowerCase();
        console.log(title);

        const bookPromise = fetch(`https://openlibrary.org/search.json?q=${title}`);
        bookPromise
            .then(res => { return res.json() })
            .then(data => {

                console.log(data.docs[0]);

                // Gets information about the books
                bookTitle.innerText = data.docs[0].title + " by: ";
                bookAuthor.innerText = data.docs[0].author_name[0];
                bookPublished.innerText = " (Published: " + data.docs[0].first_publish_year + ")";

                book.appendChild(bookTitle);
                book.appendChild(bookAuthor);
                book.appendChild(bookPublished);

                document.body.append(book);
            })
            .catch(error => alert(error));
    }

});

// API for getting movies (I only get 1000 a day so it's not implemented)

// const moviePromise = fetch(`http://www.omdbapi.com/?s=${book}&apikey=6a9680f`);
// moviePromise
// .then(res => { return res.json() })
// .then(data => console.log(data.Search));

