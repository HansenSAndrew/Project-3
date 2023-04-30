
// Waits for HTML to load
window.addEventListener('load', function () {

    // Declaring arrays to hold all the information from each search locally, to do sorting and filtering on.
    const books = [];
    const movies = [];
    const shows = [];
    const everything = [];

    // Search Button
    const button = document.getElementById('searchButton');
    console.log(button);



    // Book Style
    const cardMaker = (mediaObj, isBook) => {

        console.log(mediaObj);

        // Cover Information
        const mediaCover = document.createElement('div');
        mediaCover.id = "info";

        // All Text
        const allText = document.createElement('div');
        allText.id = "allText";
        mediaCover.append(allText);

        // Top Field
        const topField = document.createElement('div');
        topField.id = "topField";
        allText.append(topField);

        // Book Title
        const title = document.createElement('span');
        title.id = "title";
        if (isBook) {
            title.innerText = mediaObj.title;
            topField.append(title);
        }
        else {
            title.innerText = mediaObj.Title;
            topField.append(title);
        }

        // Year Published
        const published = document.createElement('span');
        published.id = "year";
        if (isBook) {
            published.innerText = mediaObj.first_publish_year;
            topField.append(published);
        }
        else {
            published.innerText = mediaObj.Year;
            topField.append(published);
        }

        // Text field
        const textField = document.createElement('div');
        textField.id = "textField";
        allText.appendChild(textField);

        // Book Author
        if (isBook) {
            const author = document.createElement('span');
            author.id = "author";
            author.innerText = mediaObj.author_name[0];
            textField.appendChild(author);
        }

        // cover
        const cover = document.createElement('div');
        cover.id = "cover";
        const newImage = document.createElement('img');
        newImage.id = "newImage";
        newImage.alt = "Selected Book Cover"
        if (isBook) {
            newImage.src = `https://covers.openlibrary.org/b/id/${mediaObj.cover_i}-L.jpg`;
            cover.appendChild(newImage);
            mediaCover.append(cover);
        }
        else {
            newImage.src = mediaObj.Poster;
            cover.appendChild(newImage);
            mediaCover.append(cover);
        }


        mediaCover.style = `
        position: static;
        border-style: solid;
        border-right: transparent;
        border-left: transparent;
        border-top: transparent;
        height: 250px;
        padding-top: 10px;
        `

        cover.style = `
        position: static;
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


        let container = document.getElementById('results-container');
        container.appendChild(mediaCover);
    }
    // Event listener for the filter type dropdown for after results are displayed.
    this.document.getElementById('filter-results').onclick = function () {
        const filterValue = document.getElementById('filter-results').value;
        console.log(filterValue);
    }

    // When Search Button is Clicked
    button.onclick = function () {
        document.getElementById("results-container").innerHTML = "";


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
            bookSearch(title);

        }
        // if (authorFlag == true) {
        //     // searching for book authors
        //     const splitSearch = authorValue.split(" ");
        //     console.log(splitSearch);

        //     // Format Title for API Search
        //     let author = "";
        //     for (let i = 0; i < splitSearch.length; i++) {
        //         author += splitSearch[i];
        //         if (i < splitSearch.length - 1)
        //             author += "+"
        //     }
        //     author = author.toLowerCase();
        //     console.log(author);
        //     let link = 'https://openlibrary.org/search.json?author=';
        //     bookSearch(author, link);

        // }
        // if (startDateFlag == true && endDateFlag == true) {
        //     // Format Title for API Search
        //     let dates = `[${startDateValue}+TO+${endDateValue}]`;
        //     console.log("Dates in the search: " + dates);
        //     let link = 'https://openlibrary.org/search.json?q=first_publish_year%3A';
        //     bookSearch(dates, link);
        // }


    }

    // Function to search for books, takes in the link and the data to search for.
    const bookSearch = (title) => {

        for (let i = 0; i < 3; i++) {
            const bookPromise = fetch(`https://openlibrary.org/search.json?q=${title}`);
            bookPromise
                .then(res => { return res.json() })
                .then(data => { cardMaker(data.docs[i], true) });

            const moviePromise = fetch(`http://www.omdbapi.com/?s=${title}&apikey=6a9680f`);
            moviePromise
                .then(res => { return res.json() })
                .then(data => { cardMaker(data.Search[i], false) });


        }
    }






});


