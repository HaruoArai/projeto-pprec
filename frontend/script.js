fetch('header.html')
    .then(res => res.text())
    .then(data => document.getElementById('common-header').innerHTML = data);

// Carrega conteúdo do footer
fetch('footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('common-footer').innerHTML = data);