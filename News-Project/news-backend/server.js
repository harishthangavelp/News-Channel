const { google } = require("googleapis");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
require('dotenv').config();

const client = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Replace escaped newlines
    ["https://www.googleapis.com/auth/spreadsheets"]
);


app.post('/delete-news', (req, res) => {
  const { id } = req.body; // Get the id of the item to delete

  fs.readFile('../my-news-channel/src/Components/newsDetails.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Failed to read file.');
    }

    const newsData = JSON.parse(data);
    const updatedData = newsData.filter(item => item.id !== id); // Remove the item with the specified id

    fs.writeFile('../my-news-channel/src/Components/newsDetails.json', JSON.stringify(updatedData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).send('Failed to update file.');
      }
      res.send('News item deleted successfully.');
    });
  });
});


app.post('/update-news', (req, res) => {
  const updatedData = req.body;

  fs.writeFile('../my-news-channel/src/Components/newsDetails.json', JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Failed to update file.');
    }
    res.send('File updated successfully.');
  });
});

// Endpoint to add user data to `userDetails.json`
app.post('/addNews', (req, res) => {
  const newNews = req.body; // Get data sent in the request body

  // Read the current content of newsdetails.json
  fs.readFile('newsdetails.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    
    // Parse the existing news data and add the new entry
    const newsArray = JSON.parse(data);
    newsArray.push(newNews);

    // Write the updated data back to newsdetails.json
    fs.writeFile('newsdetails.json', JSON.stringify(newsArray, null, 2), (err) => {
      if (err) return res.status(500).send('Error writing to file');
      
      res.status(200).send('News added successfully');
    });
  });
});

// Google Sheets API route (for adding user to Google Sheets)
const spreadsheetId = "1GrpES7bpeQjzSrRjtINNI_BIkG0MaUUgdgzQaY_kLZo";
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

        res.status(200).send("User added to sheet successfully!");
    } catch (error) {
        res.status(500).send("Error adding user: " + error.message);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});