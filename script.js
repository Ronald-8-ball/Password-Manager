const siteName = document.getElementById("siteName");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const elements = document.getElementById("elements");

// Load entries from localStorage and render them on page load
let entries = loadEntries();
renderEntries(entries);

submitBtn.addEventListener("click", function() {
    if (siteName.value === "" || password.value === "") {
        alert("Please fill in both fields.❗");
        return;
    }
    else{
        const entry = { id: Date.now(), site: siteName.value, password: password.value };
        entries.push(entry);
        saveEntries(entries);
        renderEntries(entries);
        siteName.value = "";
        password.value = "";
    }
});

function saveEntries(items) {
    try {
        localStorage.setItem('passwordEntries', JSON.stringify(items));
    } 
    catch (e) {
        console.error('Failed to save entries to localStorage', e);
    }
}

function loadEntries() {
    try {
        const raw = localStorage.getItem('passwordEntries');
        return raw ? JSON.parse(raw) : [];
    } 
    catch (e) {
        console.error('Failed to load entries from localStorage', e);
        return [];
    }
}

function renderEntries(items) {
    elements.innerHTML = "";
    items.forEach(e => {
        const li = document.createElement("li");
        li.textContent = `Site: ${e.site} | Password: ${e.password}`;

        const del = document.createElement('button');
        del.textContent = 'X';
        del.style.marginLeft = '8px';
        del.style.cursor = 'pointer';
        del.style.backgroundColor = '#ff1b1bff';
        del.style.color = 'white';
        del.style.borderRadius = '10px';
        del.addEventListener('click', () => {
            entries = entries.filter(x => x.id !== e.id);
            saveEntries(entries);
            renderEntries(entries);
        });

        li.appendChild(del);
        elements.appendChild(li);
    });
}