const { google } = require("googleapis");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();


const client = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Replace escaped newlines
    ["https://www.googleapis.com/auth/spreadsheets"]
);

const spreadsheetId = "1RonIwbjK4cpl4guNsW7IwYbw5BKnvgt9flv0vgmTPus";

app.post("/addUser", async (req, res) => {
    try {
        const { myname, username } = req.body;

        const sheets = google.sheets({ version: "v4", auth: client });

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Sheet1!D:E",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[myname, username]],
            },
        });

        res.status(200).send("User added successfully!");
    } catch (error) {
        res.status(500).send("Error adding user: " + error.message);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
