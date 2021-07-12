document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("bookDataForm");
    submitForm.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
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