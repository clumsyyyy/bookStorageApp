const completedListBookId = "completed";
const uncompletedListBookId = "uncompleted";
const bookItemID = "itemID"

function addBook(){

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const completion = document.getElementById("isCompleted").checked;

    let bookList = "";
    if (completion){
        bookList = document.getElementById("finishedBookListDetail")
    } else {bookList = document.getElementById("unfinishedBookListDetail")}

    const book = createBook(title, author, year, completion);
    const bookObject = createBookObject(title, author, year, completion);

    book[bookItemID] = bookObject.id;
    books.push(bookObject);

    bookList.append(book);
    console.log(title, author, year, completion);


    updateData();

    
}

function createBook(title, author, year, completion){

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;
    bookTitle.style["margin-right"] = "2%";
    bookTitle.style["margin-bottom"] = "-20px";
    bookTitle.style["margin-top"] = "20px";

    const bookAuthor = document.createElement("h4");
    bookAuthor.innerText = author;
    bookAuthor.style["margin-right"] = "2%";
    bookAuthor.style["display"] = "inline-block";

    const bookYear = document.createElement("p");
    bookYear.innerText = year;
    bookYear.style["display"] = "inline-block";

    const bookContainer = document.createElement("div");
    bookContainer.classList.add("inner");
    bookContainer.append(bookTitle, bookAuthor, bookYear);


    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.style["padding"] = "5px";
    container.append(bookContainer);

    const deleteButton = createDeleteButton();
    deleteButton.innerText = "Delete"
    deleteButton.style["margin-top"] = "-70px";
    deleteButton.style["display"] = "inline-block";
    container.append(deleteButton)
    

    if(completion === true){
        const restoreButton = createRestoreButton();
        restoreButton.innerText = "Restore"
        restoreButton.style["margin-top"] = "-70px";
        restoreButton.style["margin-right"] = "110px";
        container.append(restoreButton)

    } else {
        const finishedButton = createFinishedButton();
        finishedButton.innerText = "Finish"
        finishedButton.style["margin-top"] = "-70px";
        finishedButton.style["margin-right"] = "110px";
        container.append(finishedButton)
    }    
    container.setAttribute("class", "listBox")
    container.style["backgroundColor"] = "rgb(204, 204, 204)";
    container.style["borderRadius"] = "20px";
    container.style["paddingLeft"] = "20px";
    container.style["height"] = "80px";
    container.style["margin-bottom"] = "20px";
    return container;
}

function createSearchBook(title, author, year, completion){

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;
    bookTitle.style["margin-right"] = "2%";
    bookTitle.style["display"] = "inline-block";

    const bookAuthor = document.createElement("h4");
    bookAuthor.innerText = author;
    bookAuthor.style["margin-right"] = "2%";
    bookAuthor.style["display"] = "inline-block";

    const bookYear = document.createElement("p");
    bookYear.innerText = year;
    bookYear.style["display"] = "inline-block";

    const bookContainer = document.createElement("div");
    bookContainer.classList.add("inner");
    bookContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement("div");
    container.setAttribute("class", "searchedBox")
    container.classList.add("item", "shadow");
    container.style["backgroundColor"] = "rgb(204, 204, 204)";
    container.style["borderRadius"] = "20px";
    container.style["paddingLeft"] = "20px";
    container.style["margin-bottom"] = "20px";
    container.append(bookContainer);
    return container;
}


function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function finishBook(taskElement){
    const bookTitle = taskElement.querySelector(".inner > h3").innerText;
    const bookAuthor = taskElement.querySelector(".inner > h4").innerText;
    const bookYear = taskElement.querySelector(".inner > p").innerText;

    const newBook = createBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(taskElement[bookItemID]);
    book.isCompleted = true;
    newBook[bookItemID] = book.id;
    const completedBooks = document.getElementById("finishedBookListDetail")

    completedBooks.append(newBook);
    taskElement.remove();

    updateData();
    const string = "The book " + bookTitle + " has been succesfully moved to the Finished list."
    setTimeout(alert.bind(null, string));
}

function restoreBook(taskElement){
    const bookTitle = taskElement.querySelector(".inner > h3").innerText;
    const bookAuthor = taskElement.querySelector(".inner > h4").innerText;
    const bookYear = taskElement.querySelector(".inner > p").innerText;

    
    const newBook = createBook(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(taskElement[bookItemID]);
    book.isCompleted = false;
    newBook[bookItemID] = book.id;
    const uncompletedBooks = document.getElementById("unfinishedBookListDetail")

    uncompletedBooks.append(newBook);
    taskElement.remove();
    updateData();
    const string = "The book " + bookTitle + " has been succesfully moved to the Unfinished list."
    setTimeout(alert.bind(null, string));
}

function removeBook(taskElement){
    const bookTitle = taskElement.querySelector(".inner > h3").innerText;
    const bookPosition = findBookIndex(taskElement[bookItemID]);
    books.splice(bookPosition, 1);
    taskElement.remove();
    updateData();
    const string = "The book " + bookTitle + " has been succesfully deleted."
    setTimeout(alert.bind(null, string));
}
function createFinishedButton(){
    return createButton("finished-button", function(event){
        finishBook(event.target.parentElement);
        
    })
}

function createDeleteButton(){
    return createButton("delete-button", function(event){
        removeBook(event.target.parentElement);
    });
}

function createRestoreButton(){
    return createButton("restore-button", function(event){
        restoreBook(event.target.parentElement);
    });
}