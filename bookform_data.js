const STORAGE_KEY = "BOOK_STORAGE";

let books = [];

function storageCheck(){
    return (typeof(Storage) !== undefined)
}

function saveData() {
    const parsedJSON = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsedJSON);
    document.dispatchEvent(new Event("ondatasaved"));
 }

 function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
 }

 function updateData(){
     if (storageCheck()){
         saveData();
     }
 }

 function createBookObject(title, author, year, isCompleted){
     return {
         id: + new Date(),
         title,
         author,
         year,
         isCompleted
     };
 }

 function findBook(bookID){
     for (book of books){
         if (book.id === bookID){
             return book;
         }
     }
     return null;
 }

 function findBookIndex(bookID){
    let index = 0;
    for (book of books){
        if (book.id === bookID){
            return index;
        }
        index++;
    }
    return -1;
}


function refreshData(){
    const uncompletedBooks = document.getElementById("unfinishedBookListDetail");
    const completedBooks = document.getElementById("finishedBookListDetail");

    for (book of books){
        const newBook = createBook(book.title, book.author, book.year, book.isCompleted);
        newBook[bookItemID] = book.id;

        if(book.isCompleted){
            completedBooks.append(newBook);
        } else {
            uncompletedBooks.append(newBook);
        }
    }
}