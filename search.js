
// Waits for HTML to load
window.addEventListener('load', function () {

    // Search Button
    const button = document.getElementById('searchButton');
    console.log(button);


    // Book Information
    let book = document.createElement('div');
    book.id = "bookInfo";

    // All Text
    const allText = document.createElement('div');
    allText.id = "allText";
    book.append(allText);

    //Top Field
    const topField = document.createElement('div');
    topField.id = "topField";
    allText.append(topField);

    // Book Title
    const bookTitle = document.createElement('span');
    bookTitle.id = "title";

    // Year Published
    const bookPublished = document.createElement('span');
    bookPublished.id = "year";

    // Text field
    const textField = document.createElement('div');
    textField.id = "textField";
    allText.appendChild(textField);

    // Book Author
    const bookAuthor = document.createElement('span');
    bookAuthor.id = "author";

    // Book Cover
    const bookCover = document.createElement('div');
    bookCover.id = "cover";
    const newImage = document.createElement('img');
    newImage.id = "newImage";
    newImage.alt = "Selected Book Cover"
    bookCover.appendChild(newImage);

    // Book Style
    const bookCardMaker = (bookObj) => {
        bookObj.style = `
        border-style: solid;
        border-right: transparent;
        border-left: transparent;
        border-top : transparent;
        height: 250px
        `

        allText.style = `
        position: absolute;
        left: 225px;
        margin-right: 100px;
        `

        title.style = `
        font-weight: bold;
        font-size : 30px;
        `

        year.style = `
        `

        author.style = `
        font-size: 20px;
        `

        cover.style = `
        float : left;
        height: 240px;
        `

        newImage.style = `
        height: 240px;
        width : 160px;
        position: absolute;
        `
    }
    // Event listener for the filter type dropdown for after results are displayed.
    this.document.getElementById('filter-results').onclick = function () {
        const filterValue = document.getElementById('filter-results').value;
        console.log(filterValue);
    }

    // When Search Button is Clicked
    button.onclick = function () {
        // flags for the search:

        let titleFlag = false;
        let authorFlag = false;
        let startDateFlag = false;
        let endDateFlag = false;


        // Collecting all potential search values from the search criteria.
        const titleValue = document.getElementById('title').value;
        const authorValue = document.getElementById('author').value;
        const startDateValue = document.getElementById('start-year').value;
        const endDateValue = document.getElementById('end-year').value;
        const filterValue = document.getElementById('filter-type').value;


        // console logging all search values to make sure nothings weird. We should use these as starting points for what searches we want to do.
        if (document.getElementById('title').value != "") {
            titleFlag = true;
            console.log("Title: " + titleValue);
            // implement search type here

        }
        if (document.getElementById('author').value != "") {
            authorFlag = true;
            console.log("Author: " + authorValue);
            // implement search type here

        }
        if (document.getElementById('start-year').value != "") {
            startDateFlag = true;
            console.log("Start Year: " + startDateValue);
            // implement search type here

        }
        if (document.getElementById('end-year').value != "" && document.getElementById('start-year').value != "" &&
            document.getElementById('end-year').value > document.getElementById('start-year').value) {
            endDateFlag = true;
            console.log("End Year: " + endDateValue);
            // implement search type here
        }
        if (document.getElementById('filter-type').value != "") {
            console.log("Filter Type: " + filterValue);
            // implement search type here

        }

        // handling the search based on the flags.

        if (titleFlag == true) {
        // Searching book titles
        const splitSearch = titleValue.split(" ");
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
            let link = 'https://openlibrary.org/search.json?q=';
            bookSearch(title, link);

        }
        if (authorFlag == true) {
            // searching for book authors
            const splitSearch = authorValue.split(" ");
        console.log(splitSearch);

        // Format Title for API Search
        let author = "";
        for (let i = 0; i < splitSearch.length; i++) {
            author += splitSearch[i];
            if (i < splitSearch.length - 1)
                author += "+"
        }
        author = author.toLowerCase();
            console.log(author);
            let link = 'https://openlibrary.org/search.json?author=';
            bookSearch(author, link);

        }
        if (startDateFlag == true && endDateFlag == true) {
            const splitSearch = authorValue.split(" ");
        console.log(splitSearch);

        // Format Title for API Search
        let dates = `[${startDateValue}TO${endDateValue}]`;
            console.log(dates);
            let link = 'https://openlibrary.org/search.json?q=first_publish_year';
            bookSearch(dates, link);
        }
        // const moviePromise = fetch(`http://www.omdbapi.com/?s=${title}&apikey=6a9680f`);
        // moviePromise
        // .then(res => {return res.json()})
        // .then(data => console.log(data.Search));
    }

    // Function to search for books, takes in the link and the data to search for.
    const bookSearch = (data, link) => {

        const bookPromise = fetch(`${link}${data}`);
        bookPromise
            .then(res => { return res.json() })
            .then(data => {

                console.log(data.docs[0]);

                // Gets information about the books
                bookTitle.innerText = data.docs[0].title;
                bookAuthor.innerText = data.docs[0].author_name[0];
                bookPublished.innerText = " (Published: " + data.docs[0].first_publish_year + ")";

                topField.appendChild(bookTitle);
                textField.appendChild(bookAuthor);
                topField.appendChild(bookPublished);


                newImage.src = `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;


                book.appendChild(bookCover);

                // Changed the append statement to append books to a result container instead of the body. Will be able to sort and update the results using this approach.
                document.getElementById('results-container').append(book);
                bookCardMaker(book);
            })
            .catch(error => alert("Could not find a book with this name."));
    }


});


