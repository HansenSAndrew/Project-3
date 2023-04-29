
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
                bookTitle.innerText = data.docs[0].title;
                bookAuthor.innerText = data.docs[0].author_name[0];
                bookPublished.innerText = " (Published: " + data.docs[0].first_publish_year + ")";

                topField.appendChild(bookTitle);
                textField.appendChild(bookAuthor);
                topField.appendChild(bookPublished);


                newImage.src = `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;


                book.appendChild(bookCover);


                document.body.append(book);
                bookCardMaker(book);
            })
            .catch(error => alert("Could not find a book with this name."));


        // const moviePromise = fetch(`http://www.omdbapi.com/?s=${title}&apikey=6a9680f`);
        // moviePromise
        // .then(res => {return res.json()})
        // .then(data => console.log(data.Search));
    }


});


