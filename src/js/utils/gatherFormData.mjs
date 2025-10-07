export function gatherFormData(event) {
     // Gather form data
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        return data;
}