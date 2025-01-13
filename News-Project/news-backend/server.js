const { google } = require("googleapis");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

app.use(express.json());
require('dotenv').config();

const client = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Replace escaped newlines
    ["https://www.googleapis.com/auth/spreadsheets"]
);

app.delete('/delete-news', (req, res) => {
  const { id } = req.body; // Extract the ID from the request body

  // Path to the JSON file
  const filePath = path.join(__dirname, '../my-news-channel/src/Components/newsDetails.json');

  // Read the current JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Failed to read the file.');
    }

    let newsData;
    try {
      newsData = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return res.status(500).send('Invalid JSON format.');
    }

    // Filter out the item with the given ID
    const updatedData = newsData.filter((item) => item.id !== id);

    // Write the updated data back to the JSON file
    fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing file:', writeErr);
        return res.status(500).send('Failed to update the file.');
      }

      // Send a 204 status indicating successful deletion with no content
      res.status(204).end();
    });
  });
});


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
    const newUser = req.body;
  
    // Path to the user JSON file
    const filePath = path.join(__dirname, '../my-news-channel/src/Components/newsDetails.json');
  
    // Read current data
    fs.readFile(filePath, 'utf8', (err, data) => {
      let userData = [];
      if (!err && data) {
        try {
          userData = JSON.parse(data); // Parse existing data
        } catch (parseError) {
          console.error('Invalid JSON, resetting to empty array');
        }
      }
  
      // Add the new user entry
      userData.push(newUser);
  
      // Write updated data
      fs.writeFile(filePath, JSON.stringify(userData, null, 2), (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).json({ error: 'Failed to write user data' });
        }
        res.status(200).json({ message: 'User added successfully' });
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

const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
