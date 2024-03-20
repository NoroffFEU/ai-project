
export function sidebar() {
    const dialog = document.querySelector("dialog")
    const openDialog = document.querySelector("#openDialog")
    const closeDialog = document.querySelector("#closeDialog")
    
    openDialog.addEventListener("click", () => {
        dialog.showModal();
    })
    
    closeDialog.addEventListener("click", () => {
        dialog.setAttribute("closing", "")
        dialog.addEventListener("animationend", () => {
            dialog.removeAttribute("closing")
            dialog.close()
        }, {once: true})
    })
    
    dialog.addEventListener("click", (e) => {
        if(e.target.nodeName == "DIALOG") {
            dialog.close()
        }
    })
}
