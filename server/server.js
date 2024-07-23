const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const cors = require('cors');
const { Readable } = require('stream');
const request = require("request");

dotenv.config();

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Add CORS middleware

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Convert buffer to readable stream
const bufferToStream = (buffer) => {
  const readable = new Readable();
  readable._read = () => {}; // No-op
  readable.push(buffer);
  readable.push(null);
  return readable;
};

// Rebrandly API module
const apiRequest = (endpoint, httpMethod, body, success, failure) => {
  request({
    uri: `https://api.rebrandly.com/v1/${endpoint}`,
    method: httpMethod,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.URL_SHORTENER_API_KEY
    }
  }, (err, response, body) => {
    if (err) failure(err);
    else success(JSON.parse(body));
  });
};

const createNewLink = (link, success, failure) => {
  apiRequest("links", "POST", link, success, failure);
};

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send({ error: 'No file uploaded.' });
    }

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      async (error, result) => {
        if (error) {
          console.error('Upload Error:', error);
          return res.status(500).send({ error: 'Failed to upload file.' });
        }

        const linkDef = {
          destination: result.secure_url,
          domain: { fullName: "rebrand.ly" } // Use your Rebrandly domain
        };

        createNewLink(linkDef, (link) => {
          res.status(200).json({ url: `https://${link.shortUrl}` });
        }, (err) => {
          console.error('Shortening Error:', err);
          res.status(500).json({ error: 'Failed to shorten URL.' });
        });
      }
    );

    bufferToStream(file.buffer).pipe(stream);
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).send({ error: 'Failed to upload file.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});