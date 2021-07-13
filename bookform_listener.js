document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("bookDataForm");
    submitForm.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
    });
    
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", function(event){
        event.preventDefault();
        const searchArr = document.getElementById("search").value;
        const splittedSearchArr = searchArr.split("=");
        const identifier = splittedSearchArr[0];
        const keyword = splittedSearchArr[1];
        console.log(keyword)
        const searchBookBox = document.getElementById("searchedBookListDetail");
        searchBookBox.innerHTML = "";
        const bookKey = localStorage.getItem("BOOK_STORAGE")
        const bookKeyArr = JSON.parse(bookKey)
        console.log(bookKeyArr)
        if (identifier === "title"){
            
            bookKeyArr.forEach((element) => {
                console.log(element.title)
                var isFound = false;
                const title = element.title;
                if (title.length >= keyword.length){
                    titleSplitArr = title.split(" ");
                    console.log(titleSplitArr)
                    for(let i = 0; i < titleSplitArr.length; i++){
                        console.log(titleSplitArr[i])
                        if (titleSplitArr[i].toLowerCase() === keyword.toLowerCase()){
                            isFound = true;
                        }
                    }
                }
                if (isFound == true){
                    const bookBox = createSearchBook(element.title, element.author, element.year, element.isCompleted);
                    searchBookBox.append(bookBox);
                }

            });
        } else if (identifier === "author"){
            bookKeyArr.forEach((element) => {
                var isFound = false;
                const author = element.author;
                if (author.length >= keyword.length){
                    authorSplitArr = author.split(" ");
                    console.log(authorSplitArr)
                    for(let i = 0; i < authorSplitArr.length; i++){
                        console.log(authorSplitArr[i])
                        if (authorSplitArr[i].toLowerCase() === keyword.toLowerCase()){
                            isFound = true;
                        }
                    }
                }
                if (isFound == true){
                    const bookBox = createSearchBook(element.title, element.author, element.year, element.isCompleted);
                    searchBookBox.append(bookBox);
                }

            });
        } else if (identifier === "year"){
            bookKeyArr.forEach((element) => {
                var isFound = false;
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