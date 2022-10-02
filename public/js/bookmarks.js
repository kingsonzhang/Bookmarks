const TRASHCANS = document.querySelectorAll(".fa-trash")
const EDITS = document.querySelectorAll(".fa-pencil");
const NAMECHANGEFORM = document.querySelectorAll(".bookmarkNameChange");

TRASHCANS.forEach(x => x.addEventListener("click", deleteLink));
EDITS.forEach(x => x.addEventListener("click", editLink));
NAMECHANGEFORM.forEach(x => x.addEventListener("keypress", changeName));

async function deleteLink(){
    try{
        const res = await fetch("bookmarks/deleteBookmark", {
            method: "delete",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                linkName : this.parentNode.childNodes[0].innerText
            })
        });
        const data = await res.json();
        console.log(data);
        location.reload();
    }
    catch(err){
        console.log(err);
    }
}

function editLink(){
    this.parentNode.childNodes[0].classList.toggle("hide");
    this.parentNode.childNodes[1].classList.toggle("hide");
    this.parentNode.childNodes[1].focus();
}

async function changeName(event){
    if (event.key === "Enter"){
        const ID = this.parentNode.id;
        const NAME = this.value;
        try{
            const response = await fetch('bookmarks/changeBookmarkName', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    "postID": ID,
                    "bookmarkName" : NAME
                })
            })
            const data = await response.json()
            location.reload()
        }catch(err){
            console.log(err)
        }
    }
}