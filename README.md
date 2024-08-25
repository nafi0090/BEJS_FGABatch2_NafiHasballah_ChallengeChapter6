
# Upload Image Using Express.js Framework

This project provides a simple API for uploading images to ImageKit.io using the Express.js framework. The API allows users to upload, retrieve, and delete images through a set of endpoints.

## Features

- **Upload Image**: Upload images along with a title and description to ImageKit.io.
- **Retrieve Images**: Fetch a list of images stored in the database.
- **Delete Image**: Remove images from the database and ImageKit.io.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nafi0090/BEJS_FGABatch2_NafiHasballah_ChallengeChapter6
   ```
2. Navigate to the project directory:
   ```bash
   cd BEJS_FGABatch2_NafiHasballah_ChallengeChapter6
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Configure your environment variables:
   - Create a `.env` file in the root directory.
   - Add your ImageKit credentials and other necessary environment variables.

## Usage

1. **View Images**:
   - Endpoint: `GET /api/v1/upload`
   - Description: Retrieve the list of images stored in the database.

2. **Upload Image**:
   - Endpoint: `POST /api/v1/upload/addimage/cloud`
   - Description: Upload an image along with its title and description.
   - Request Body:
     ```json
     {
       "judul": "Image Title",
       "deskripsi": "Image Description",
       "images": "Base64 encoded image or file path"
     }
     ```

3. **Delete Image**:
   - Endpoint: `DELETE /api/v1/upload/:id/deletecloud`
   - Description: Delete an image by its ID from the database and ImageKit.io.

## Technologies Used

- **Express.js**: Backend framework used to build the API.
- **JavaScript**: Programming language used for the application logic.
- **ImageKit.io**: Image storage and processing service.

## Live Demo

You can access the live demo of this project [here](https://upload-files.up.railway.app/).

---

Feel free to contribute, report issues, or suggest features.
