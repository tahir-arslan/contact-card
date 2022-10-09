const form = document.getElementById("formToggle");
console.log(form);

export const toggleForm = () => {
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

export const clearForm = () => {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}

// const newContactButton = document.getElementById("new-contact");

// newContactButton.addEventListener('click', event => {
//     toggleForm()
// })
