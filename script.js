function fetchAndParseCSV(url) {
    return fetch(url)
        .then((response) => response.text())
        .then((csvData) => {
            // Get the lines of csv
            const lines = csvData.split("\n");
            const headers = lines[0].split(",");
            const data = [];

            // Loop through lines for data
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(",");
                const entry = {};

                // Loop through object for the line (Index and Value)
                for (let j = 0; j < headers.length; j++) {
                    entry[headers[j]] = values[j];
                }

                data.push(entry);
            }

            return data;
        });
}

const csvUrl = "./Table_Input.csv";
const table1Header = document.getElementById("table1__header");
const table1Body = document.getElementById("table1__body");

// Create required variables with initial value
let a5 = 0;
let a20 = 0;
let a15 = 0;
let a7 = 0;
let a13 = 0;
let a12 = 0;
let alphaValue = 0;
let betaValue = 0;
let charlieValue = 0;

fetchAndParseCSV(csvUrl)
    .then((parsedData) => {
        // Create table header
        const headerRow = document.createElement("tr");

        const th_index = document.createElement("th");
        const th_value = document.createElement("th");

        // Insert name of table headers
        th_index.textContent = Object.keys(parsedData[0])[0];
        th_value.textContent = Object.keys(parsedData[0])[1];

        headerRow.appendChild(th_index);
        headerRow.appendChild(th_value);

        table1Header.appendChild(headerRow);

        // Create table rows
        for (let j = 0; j < parsedData.length; j++) {
            const row = document.createElement("tr");

            const td_index = document.createElement("td");
            const td_value = document.createElement("td");

            // Insert value for Index and Value column
            td_index.textContent = parsedData[j]["Index #"];
            td_value.textContent = parsedData[j]["Value\r"];

            console.log(parsedData[j]["Index #"]);
            console.log(parsedData[j]["Value\r"]);

            // Conditional statements to get the required variable
            if (parsedData[j]["Index #"] === "A5") {
                a5 = parseInt(parsedData[j]["Value"]);
            } else if (parsedData[j]["Index #"] === "A20") {
                a20 = parseInt(parsedData[j]["Value"]);
            } else if (parsedData[j]["Index #"] === "A15") {
                a15 = parseInt(parsedData[j]["Value"]);
            } else if (parsedData[j]["Index #"] === "A7") {
                a7 = parseInt(parsedData[j]["Value"]);
            } else if (parsedData[j]["Index #"] === "A13") {
                a13 = parseInt(parsedData[j]["Value"]);
            } else if (parsedData[j]["Index #"] === "A2") {
                a12 = parseInt(parsedData[j]["Value"]);
            }

            row.appendChild(td_index);
            row.appendChild(td_value);

            table1Body.appendChild(row);
        }

        // Update the second table with operations
        document.getElementById("alpha__value").textContent = a5 + a20;
        document.getElementById("beta__value").textContent = a15 / a7;
        document.getElementById("charlie__value").textContent = a13 * a12;
    })
    .catch((error) => {
        console.error("Error:", error);
    });
