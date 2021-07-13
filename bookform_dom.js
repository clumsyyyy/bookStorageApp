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
    container.classList.add("item", "shadow");
    container.append(bookContainer);

    const deleteButton = createDeleteButton();
    deleteButton.innerText = "Delete"
    container.append(deleteButton)
    

    if(completion === true){
        const restoreButton = createRestoreButton();
        restoreButton.innerText = "Restore"
        container.append(restoreButton)

    } else {
        const finishedButton = createFinishedButton();
        finishedButton.innerText = "Finish"
        container.append(finishedButton)
    }    

    container.style["backgroundColor"] = "rgb(204, 204, 204)";
    container.style["borderRadius"] = "20px";
    container.style["paddingLeft"] = "20px";
    container.style["height"] = "150px";
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

function addBookToCompleted(taskElement){
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
}

function UndoBookFromCompleted(taskElement){
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
}

function removeBook(taskElement){
    const bookPosition = findBookIndex(taskElement[bookItemID]);
    books.splice(bookPosition, 1);
    taskElement.remove();
    updateData();
}
function createFinishedButton(){
    return createButton("finished-button", function(event){
        addBookToCompleted(event.target.parentElement);
    })
}

function createDeleteButton(){
    return createButton("delete-button", function(event){
        removeBook(event.target.parentElement);
    });
}

function createRestoreButton(){
    return createButton("restore-button", function(event){
        UndoBookFromCompleted(event.target.parentElement);
    });
}