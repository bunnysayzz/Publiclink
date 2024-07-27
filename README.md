# Publiclink

Publiclink is a web application that allows users to share files with anyone via a unique link. Easily upload and share files of any type with just a few clicks.

## Features

- **File Upload**: Upload files of any type and size.
- **Link Generation**: Generate a unique link for each uploaded file.
- **File Sharing**: Share the generated link with anyone to allow them to download the file.
- **User-Friendly Interface**: Simple and intuitive user interface for easy file sharing.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Storage**: AWS S3 (or any other storage solution)
- **Authentication**: JWT (optional, for secured file sharing)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/bunnysayzz/Publiclink.git
    cd Publiclink
    ```

2. **Install backend dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

4. **Setup environment variables**:
    - Create a `.env` file in the `backend` directory with the following variables:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_uri
        AWS_ACCESS_KEY_ID=your_aws_access_key_id
        AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
        JWT_SECRET=your_jwt_secret
        ```

5. **Run the backend server**:
    ```bash
    cd backend
    npm start
    ```

6. **Run the frontend development server**:
    ```bash
    cd ../frontend
    npm start
    ```

## Usage

1. **Upload a file**: Visit the home page and click on the "Upload" button. Select the file you want to upload.
2. **Generate link**: After the file is uploaded, a unique link will be generated.
3. **Share the link**: Copy the link and share it with anyone you want to provide access to the file.
4. **Download file**: The recipient can click on the link to download the file.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request



## Contact

For any questions or feedback, please reach out to [bunnysayzz](https://github.com/bunnysayzz).
