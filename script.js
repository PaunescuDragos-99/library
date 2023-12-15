let myLibrary =[];
let itemContainer = document.querySelector('.item-container');
let modal = document.getElementById("modal");
let addBtn = document.getElementById("addBook");
let close = document.getElementsByClassName("close")[0];
let formBtn = document.getElementById("formBtn");
let bookCounter = 0;

function Book(name,pages,read) {
    this.title = name;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function deleteBook(number) {
    myLibrary.splice(number, 1);
    showBooks();
}



let book1 = new Book("book1",14,"true");
let book2 = new Book("book2",44,"false");

addBookToLibrary(book1);
addBookToLibrary(book2);

function showBooks() {
    bookCounter = 0;
    let pastItems = document.querySelectorAll(".items");
    pastItems.forEach((div) => div.remove());
    myLibrary.forEach((element) => {
        let newDiv = document.createElement("div");
        newDiv.className = 'items';
        newDiv.setAttribute('data-number',`${bookCounter}`);
        itemContainer.insertAdjacentElement("beforeend",newDiv);
        let itemTitle = document.createElement("p");
        itemTitle.className = 'item-data';
        itemTitle.innerText = `Name: ${element.title}`;
        let itemPages = document.createElement("p");
        itemPages.className = 'item-data';
        itemPages.innerText = `Pages: ${element.pages}`;
        let itemRead = document.createElement("p");
        itemRead.className = 'item-data';
        itemRead.innerText = `Name: ${element.read}`;
        itemRead.value = element.read;
        if(itemRead.value === "true"){
            itemRead.innerText = "I have read it :)";
        }else{
            itemRead.innerText = "Not read it yet :(";
        }
        let itemDelete = document.createElement("button");
        itemDelete.className = 'delete-btn';
        itemDelete.id = 'delete-btn'
        itemDelete.innerText = 'Delete';
        itemDelete.setAttribute('number',`${bookCounter}`);
        let btnRead = document.createElement("button");
        btnRead.className = 'read-btn';
        btnRead.innerText = "Update book";
        
        newDiv.appendChild(itemTitle);
        newDiv.appendChild(itemPages);
        newDiv.appendChild(itemRead);
        newDiv.appendChild(itemDelete);
        newDiv.appendChild(btnRead);

        btnRead.addEventListener("click", function(e) {
            updateBook(itemRead.value);
            console.log(itemRead.value);
        });

        itemDelete.addEventListener("click", function(e) {
            deleteBook(e.target.getAttribute("number"));          
        });

        function updateBook(read) {
            if(read === "true"){
                itemRead.innerText = "Not read it yet :(";
                itemRead.value = "false";
            }else{
                itemRead.innerText = "I have read it :)";
                itemRead.value = "true";
            }
        }
        bookCounter++;
    });
    console.log(bookCounter);
}

let form = document.forms["book-add"];
form.addEventListener("submit", getValues);

function getValues(event){
    event.preventDefault();
    let newBook = new Book(this.book.value, this.pages.value, this.read.value);
    addBookToLibrary(newBook);
    showBooks();
    closeModal();
}

addBtn.onclick = function() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

close.onclick = function() {
    closeModal();
}

window.onclick = function(event) {
    if(event.target == modal) {
        closeModal();
    }
}

showBooks();
