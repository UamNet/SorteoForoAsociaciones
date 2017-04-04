//This is the crappiest code I have ever written please forgive me
var numberEntries = 0;

function addEntry() {
    var newRow = document.createElement("tr");
    newRow.classList.add("entry");
    newRow.innerHTML = `
            <td><input type="text" data-entry=${numberEntries} class="name"/></td>
            <td><input type="text" data-entry=${numberEntries} class="email"/></td>
            <td><input class="challengeCheckbox" type="checkbox" data-entry=${numberEntries} data-challenge=0 /></td>
            <td><input class="challengeCheckbox" type="checkbox" data-entry=${numberEntries} data-challenge=1 /></td>
            <td><input class="challengeCheckbox" type="checkbox" data-entry=${numberEntries} data-challenge=2 /></td>
            <td><input class="challengeCheckbox" type="checkbox" data-entry=${numberEntries} data-challenge=3 /></td>
            <td><input class="challengeCheckbox" type="checkbox" data-entry=${numberEntries} data-challenge=4 /></td>
            <td><input class="challengeCheckbox" type="checkbox" data-entry=${numberEntries} data-challenge=5 /></td>
            <td><input class="challengeCheckbox" type="checkbox" data-entry=${numberEntries} data-challenge=6 /></td>
            <td><input class="challengeCheckbox" type="checkbox" data-entry=${numberEntries} data-challenge=7 /></td>
            <td><input class="challengeCheckbox" type="checkbox" data-entry=${numberEntries} data-challenge=8 /></td>`;
    document.getElementById("entriesTable").appendChild(newRow);
    document.querySelector(`.name[data-entry="${numberEntries}"]`).addEventListener("change", updateValues);
    document.querySelector(`.email[data-entry="${numberEntries}"]`).addEventListener("change", updateValues);
    for (var i = 0; i < 9; i++) {
        document.querySelector(`.challengeCheckbox[data-entry="${numberEntries}"][data-challenge="${i}"]`).addEventListener("change", updateValues);
    }
    numberEntries++;
}

function updateValues() {
    localStorage.entries=serializeValues();
    document.getElementById("backupArea").value=(serializeValues());    
}

function serializeValues() {
    var entries = [];
    for (var i = 0; i < numberEntries; i++) {
        var thisEntry = {};
        thisEntry.name = document.querySelector(`.name[data-entry="${i}"]`).value;
        thisEntry.email = document.querySelector(`.email[data-entry="${i}"]`).value;
        thisEntry.values = [];
        for (var j = 0; j < 9; j++) {
            thisEntry.values.push(document.querySelector(`.challengeCheckbox[data-entry="${i}"][data-challenge="${j}"]`).checked);
        }   
        entries.push(thisEntry);
    }
    return JSON.stringify(entries);
}

function deserializeValues(value) {
    var entries= JSON.parse(value);
    entries.forEach(function(thisEntry){
        addEntry();
        var entryId=numberEntries-1;
        document.querySelector(`.name[data-entry="${entryId}"]`).value=thisEntry.name;
        document.querySelector(`.email[data-entry="${entryId}"]`).value=thisEntry.email;
        thisEntry.values.forEach(function(value,i){
            document.querySelector(`.challengeCheckbox[data-entry="${entryId}"][data-challenge="${i}"]`).checked=value;
        })
    });
}

window.addEventListener("load", function () {
    if(localStorage.entries){
        deserializeValues(localStorage.entries);
    }
    document.getElementById("addEntry").addEventListener("click", addEntry);
})