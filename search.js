
// Waits for HTML to load
window.addEventListener('load', function () {

    // Declaring arrays to hold all the information from each search locally, to do sorting and filtering on.
    const books = [];
    const movies = [];
    const shows = [];
    let everything = [];

    // Search Button
    const button = document.getElementById('searchButton');
    console.log(button);


    // CARD MAKING FUNCTIONALITY STARTS HERE

    // movieCardMaker, needs to be implemented, only way I could think of to have the filter work correctly.
    const movieCardMaker = (mediaObj) => {

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

        // Movie Title
        const title = document.createElement('span');
        title.id = "title";
        title.innerText = mediaObj.Title;
        topField.append(title);

        // Year Published
        const published = document.createElement('span');
        published.id = "year";
        published.innerText = mediaObj.Year;
        topField.append(published);


        // Text field
        const textField = document.createElement('div');
        textField.id = "textField";
        allText.appendChild(textField);

        // Movie Poster (cover)
        const cover = document.createElement('div');
        cover.id = "cover";
        const newImage = document.createElement('img');
        newImage.id = "newImage";
        newImage.alt = "Selected Movie Cover"
        newImage.src = mediaObj.Poster;
        cover.appendChild(newImage);
        mediaCover.append(cover);

        // Stylizes Card
        stylize(mediaCover);

        let container = document.getElementById('results-container');
        container.appendChild(mediaCover);
        // if the movies array doesnt have the mediaObj, push it to the array.
        if (!movies.includes(mediaObj)) {
            movies.push(mediaObj);
            console.log("movies:");
            console.log(movies);
        }
    }

    // renamed this to bookCardMaker for functionality.
    const bookCardMaker = (mediaObj) => {

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
        title.innerText = mediaObj.title;
        topField.append(title);

        // Year Published
        const published = document.createElement('span');
        published.id = "year";
        published.innerText = mediaObj.first_publish_year;
        topField.append(published);

        // Text field
        const textField = document.createElement('div');
        textField.id = "textField";
        allText.appendChild(textField);

        // Book Author
        const author = document.createElement('span');
        author.id = "author";
        author.innerText = mediaObj.author_name[0];
        textField.appendChild(author);

        // cover
        const cover = document.createElement('div');
        cover.id = "cover";
        const newImage = document.createElement('img');
        newImage.id = "newImage";
        newImage.alt = "Selected Book Cover"
        newImage.src = `https://covers.openlibrary.org/b/id/${mediaObj.cover_i}-L.jpg`;
        cover.appendChild(newImage);
        mediaCover.append(cover);

        // Stylizes card
        stylize(mediaCover);

        // Seperate style for just books
        author.style = `
        font-size: 20px;
        `

        let container = document.getElementById('results-container');
        container.appendChild(mediaCover);
        // if the books array doesnt have the mediaObj, push it to the array.
        if (!books.includes(mediaObj)) {
            books.push(mediaObj);
            console.log("books:");
            console.log(books);
        }
    }

    // This function is used to stylize cards (results)
    function stylize(mediaCover) {

        const allText = mediaCover.childNodes[0];
        const cover = mediaCover.childNodes[1];

        const topField = allText.childNodes[0];
        const textField = allText.childNodes[1];

        const title = topField.childNodes[0];
        const year = topField.childNodes[1];

        const author = textField.childNodes[0];

        const newImage = cover.childNodes[0];

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

    // CARD MAKER FUNCTIONS END HERE

    // SORTING AND FILTERING FUNCTIONALITY STARTS HERE

    // helper method to extract title and year from an item.
    function getTitleAndYear(item) {
    let title, year;
    if (item.hasOwnProperty("author_name")) { // book
        title = item.title;
        year = item.first_publish_year;
    } else { // movie or show
        title = item.Title;
        year = item.Year;
    }
    return { title, year };
}


    // Event listener for the filter type dropdown for after results are displayed.
    this.document.getElementById('filter-results').onclick = function () {
        const filterValue = document.getElementById('filter-results').value;
        everything = [...books, ...movies, ...shows];
        console.log("Everything");
        console.log(everything);
        console.log(filterValue);
        if (filterValue == "alphabetical") {
            // filter the results in alphabetical order.
            everything.sort(function (a, b) {
            const titleA = getTitleAndYear(a).title;
            const titleB = getTitleAndYear(b).title;
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
            });
        }
        else if (filterValue == "oldest") {
            // filter the results from the oldest to newest.
            everything.sort(function (a, b) {
                const yearA = getTitleAndYear(a).year;
                const yearB = getTitleAndYear(b).year;
                if (yearA < yearB) { return -1; }
                if (yearA > yearB) { return 1; }
                return 0;
            });
        }
        else if (filterValue == "newest") {
            // filter the results from the newest to oldest.
            everything.sort(function (a, b) {
                const yearA = getTitleAndYear(a).year;
                const yearB = getTitleAndYear(b).year;
                if (yearA > yearB) { return -1; }
                if (yearA < yearB) { return 1; }
                return 0;
            });
        }
        else if (filterValue == "reverse-alphabetical") {
            // filter the results in reverse alphabetical order.
            everything.sort(function (a, b) {
                const titleA = getTitleAndYear(a).title;
                const titleB = getTitleAndYear(b).title;
                if (titleA > titleB) { return -1; }
                if (titleA < titleB) { return 1; }
                return 0;
            });
        }


        let book = false;
        document.getElementById("results-container").innerHTML = "";
        for (let i = 0; i < everything.length; i++) {
            // check if everything[i] contains an author field.
            if (everything[i].hasOwnProperty("author_name")) {
                book = true;
                bookCardMaker(everything[i], true);
            } else {
                movieCardMaker(everything[i], true);
            }
        }
    }

// SORTING AND FILTERING FUNCTIONALITY ENDS HERE
    
    
    // SEARCH HANDLING FUNCTIONALITY BEGINS HERE

    // When Search Button is Clicked
    button.onclick = function () {
        document.getElementById("results-container").innerHTML = "";


        // flags for the search:

        let titleFlag = false;
        let authorFlag = false;
        let startDateFlag = false;
        let endDateFlag = false;
        let sameYear = false;


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
            document.getElementById('end-year').value >= document.getElementById('start-year').value) {
            if (document.getElementById('start-year').value == document.getElementById('end-year').value) {
                sameYear = true;
            }
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
            movieSearch(title);

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
            // Format Title for API Search
            let dates = `[${startDateValue}+TO+${endDateValue}]`;
            console.log("Dates in the search: " + dates);
            let link = 'https://openlibrary.org/search.json?q=first_publish_year%3A';
            bookSearch(dates, link);
            if (sameYear) {
                movieYearSearch(startDateValue);
            }
        }


    }

    // Function to search for books, takes in the link and the data to search for.
    const bookSearch = (title, link) => {

        for (let i = 0; i < 3; i++) {
            const bookPromise = fetch(`${link}${title}`);
            bookPromise
                .then(res => { return res.json() })
                .then(data => { bookCardMaker(data.docs[i]) });

        }
    }

    const movieSearch = title => {
        for (let i = 0; i < 3; i++) {
            const moviePromise = fetch(`http://www.omdbapi.com/?s=${title}&apikey=6a9680f`);
            moviePromise
                .then(res => { return res.json() })
                .then(data => { movieCardMaker(data.Search[i]) });
        }
    }

    const movieYearSearch = (year) => {
        for (let i = 0; i < 3; i++) {
            const moviePromise = fetch(`http://www.omdbapi.com/?s=${title}&y=${year}&apikey=6a9680f`);
            moviePromise
                .then(res => { return res.json() })
                .then(data => { movieCardMaker(data.Search[i]) });
        }
    }

// SEARCH HANDLING FUNCTIONALITY ENDS HERE




});


