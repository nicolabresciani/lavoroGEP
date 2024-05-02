var costanti = [[30,20],[20,15]];
var altezze = [0.78, 0.85, 0.93, 1.00, 0.93, 0.85, 0.78, 0.00];
var dislocazioni = [1.00, 0.97, 0.93, 0.91, 0.88, 0.87, 0.85, 0.00];
var distanze = [1.00, 0.83, 0.63, 0.50, 0.45, 0.42, 0.00];
var angoli = [1.00, 0.90, 0.81, 0.71, 0.62, 0.57, 0.00];
var prese = [1.00, 0.90];
var frequenze = [[1.00, 0.94, 0.84, 0.75, 0.52, 0.37, 0.00],
[0.95, 0.88, 0.72, 0.50, 0.30, 0.21, 0.00],
[0.85, 0.75, 0.45, 0.27, 0.15, 0.00, 0.00]];

function calcola() {
    var eta = document.querySelector('input[name="eta"]:checked').value;
    var sesso = document.querySelector('input[name="sesso"]:checked').value;
    var costante = costanti[eta][sesso];
    var altezza = altezze[document.getElementById("altezza").value];
    var dislocazione = dislocazioni[document.getElementById("dislocazione").value];
    var distanza = distanze[document.getElementById("distanza").value];
    var angolo = angoli[document.getElementById("angolo").value];
    var presa = prese[document.querySelector('input[name="presa"]:checked').value];
    var frequenza = document.getElementById("frequenza").value;
    var durata = document.querySelector('input[name="durata"]:checked').value;
    var relazione = frequenze[durata][frequenza];
    var peso = document.getElementById("peso").value;


    var limite = costante * altezza * dislocazione * distanza * angolo * presa * relazione;
    var indiceEsposizione = peso / limite;

    var url = "risultato.html?";
    url += "eta=" + eta;
    url += "&sesso=" + sesso;
    url += "&altezza=" + altezza;
    url += "&dislocazione=" + dislocazione;
    url += "&distanza=" + distanza;
    url += "&angolo=" + angolo;
    url += "&presa=" + presa;
    url += "&frequenza=" + frequenza;
    url += "&durata=" + durata;
    url += "&peso=" + peso;
    url += "&indice_esposizione=" + indiceEsposizione;
    
    window.location.href = url;
    return indiceEsposizione;

}
// Funzione per ottenere il dato corrispondente dal valore selezionato
function getDato(value, array) {
    // Verifica se il valore è null o undefined
    if (value == null) {
        return "";
    }
    return array[value];
}window.addEventListener('DOMContentLoaded', (event) => {
    // Estrai i parametri dall'URL
    var urlParams = new URLSearchParams(window.location.search);

    // Array per contenere i dati da visualizzare nella tabella
    var tableData = [
        ["Età", urlParams.get("eta")],
        ["Sesso", urlParams.get("sesso") === "0" ? "Maschio" : "Femmina"],
        ["Altezza (cm)", urlParams.get("altezza")],
        ["Dislocazione (cm)", urlParams.get("dislocazione"), dislocazioni],
        ["Distanza (cm)", urlParams.get("distanza"), distanze],
        ["Angolo (gradi)", urlParams.get("angolo"), angoli],
        ["Presa", urlParams.get("presa"), prese],
        ["Frequenza (atti al minuto)", urlParams.get("frequenza"), frequenze[urlParams.get("sesso")]],
        ["Durata", urlParams.get("durata")],
        ["Peso (kg)", urlParams.get("peso")],
        ["Indice di Esposizione", urlParams.get("indice_esposizione")] // Aggiungiamo l'indice di esposizione qui
    ];

    // Funzione per ottenere l'etichetta della durata basata sul valore
    function getDurataLabel(value) {
        switch (value) {
            case "0":
                return "CONTINUO (1 ora)";
            case "1":
                return "CONTINUO (1-2 ore)";
            case "2":
                return "CONTINUO (2-8 ore)";
            default:
                return "";
        }
    }

    // Ottenere il riferimento alla tabella
    var table = document.querySelector("#risultatoDiv table");

    // Aggiungi righe di dati alla tabella
    tableData.forEach(function (data) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.textContent = data[0];
        cell2.textContent = data[1];
    });
});


function esportaPdf(){
     // Verifica che jsPDF sia definito e la pagina sia completamente caricata
     if (typeof jsPDF !== 'undefined') {
        const doc = new jsPDF();
        const source = document.querySelector('table');
        doc.autoTable({ html: source });
        doc.save('tabella.pdf');
    } else {
        // jsPDF non è definito, gestisci l'errore o notifica l'utente
        console.error('jsPDF non è definito. Assicurati di aver incluso correttamente la libreria.');
    }
}