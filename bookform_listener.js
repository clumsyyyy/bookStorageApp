document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("bookDataForm");
    submitForm.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
        const completion = document.getElementById("isCompleted").checked;
        const submitTitle = document.getElementById("title").value;
        if (completion){
            const string = "The book " + submitTitle + " has successfully been added into the Finished book list."
            setTimeout(alert.bind(null, string));
        } else {
            const string = "The book " + submitTitle + " has successfully been added into the Unfinished book list."
            setTimeout(alert.bind(null, string));
        }
    });
    
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", function(event){
        event.preventDefault();
        const searchArr = document.getElementById("search").value;
        const splittedSearchArr = searchArr.split("=");
        const identifier = splittedSearchArr[0];
        const keyword = splittedSearchArr[1];
        console.log(splittedSearchArr)
        console.log(keyword)
        const searchBookBox = document.getElementById("searchedBookListDetail");
        searchBookBox.innerHTML = "";
        const bookKey = localStorage.getItem("BOOK_STORAGE")
        const bookKeyArr = JSON.parse(bookKey)
        console.log(bookKeyArr)
        if (identifier === "title"){
            bookKeyArr.forEach((element) => {
                const title = element.title;
                if (title.length > keyword.length){
                    titleSplitArr = title.split(" ");
                    for(let i = 0; i < titleSplitArr.length; i++){
                        var isFound = false;
                       
                        if (titleSplitArr[i].toLowerCase() === keyword.toLowerCase()){
                            isFound = true;
                        };

                        if (isFound === true){
                            const bookBox = createSearchBook(element.title, element.author, element.year, element.isCompleted);
                            searchBookBox.append(bookBox);
                        };
                    };
                    
                }else if(title.length === keyword.length){
                    if (title.toLowerCase() === keyword.toLowerCase()){
                        const bookBox = createSearchBook(element.title, element.author, element.year, element.isCompleted);
                        searchBookBox.append(bookBox);
                    }
                }
            });
        } else if (identifier === "author"){
            
            bookKeyArr.forEach((element) => {
                const author = element.author;
                console.log(author.toLowerCase(), author.length, keyword.toLowerCase(), keyword.length)
                if (author.length > keyword.length){
                    authorSplitArr = author.split(" ");
                    for(let i = 0; i < authorSplitArr.length; i++){
                        var isFound = false;
                       
                        if (authorSplitArr[i].toLowerCase() === keyword.toLowerCase()){
                            isFound = true;
                        };

                        if (isFound === true){
                            const bookBox = createSearchBook(element.title, element.author, element.year, element.isCompleted);
                            searchBookBox.append(bookBox);
                        };
                    };
                    
                }else if(author.length === keyword.length){
                    if (author.toLowerCase() === keyword.toLowerCase()){
                        const bookBox = createSearchBook(element.title, element.author, element.year, element.isCompleted);
                        searchBookBox.append(bookBox);
                    }
                }
            });
        } else if (identifier === "year"){
            bookKeyArr.forEach((element) => {
                const year = element.year;
                if (year == keyword){
                    const bookBox = createSearchBook(element.title, element.author, element.year, element.isCompleted);
                    searchBookBox.append(bookBox);
                }
            })
        }
        
    });

    if (storageCheck()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });
 document.addEventListener("ondataloaded", () => {
    refreshData();
 });