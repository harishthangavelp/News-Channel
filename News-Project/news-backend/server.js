// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle registration
app.post('/register', (req, res) => {
    const { myname, username } = req.body;

    // Check if the file exists, else create it
    const filePath = 'registered_users.xlsx';
    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
    } else {
        workbook = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, sheet, 'Users');
        XLSX.writeFile(workbook, filePath);
    }

    // Append new data
    const sheet = workbook.Sheets['Users'];
    const data = XLSX.utils.sheet_to_json(sheet);
    data.push({ Name: myname, Username: username });
    const updatedSheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets['Users'] = updatedSheet;

    // Save the file
    XLSX.writeFile(workbook, filePath);

    res.json({ message: 'Data saved successfully!' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
