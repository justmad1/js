document.querySelector(".search input").addEventListener('focus', () => {
    document.querySelector(".search input").value = '';
});
document.querySelector(".search input").addEventListener('blur', () => {
    if (document.querySelector(".search input").value == '')
        document.querySelector(".search input").value = 'Search Our Website...';
});
document.querySelector("#name").addEventListener('focus', () => {
    document.querySelector("#name").value = '';
});
document.querySelector("#name").addEventListener('blur', () => {
    if (document.querySelector("#name").value == '')
        document.querySelector("#name").value = 'Name';
});
document.querySelector("#email").addEventListener('focus', () => {
    document.querySelector("#email").value = '';
});
document.querySelector("#email").addEventListener('blur', () => {
    if (document.querySelector("#email").value == '')
        document.querySelector("#email").value = 'Email';
});
