const imageKitConfig = require("../config/lib/imagekit");
const UPLOADIMAGES = require('../model/uploadImage.model');

async function index(req, res) {
    const result = await UPLOADIMAGES.index();
	res.json({
		message: "GET files API",
		data: result.rows
	});
}

async function uploadCloud(req, res) {
	if(!req.file){
		return res.status(404).json({error: 'no file uploaded'});
	} else {
		const file = req.file;
		const { judul, deskripsi } = req.body;
		
		imageKitConfig.upload({
			file: file.buffer.toString('base64'),
			fileName: file.originalname,
			folder: "/binar-assets",
			tags: ["upload-banner"]
		}).then((response) => {
	
			const data = {
				judul: judul,
				deskripsi:deskripsi,
				images: response.url
			};
	
			return UPLOADIMAGES.upload(data);
		}).then((result) =>{
			res.json({
				message: "POST upload API",
				data: result.rows[0]
			});
	
		}).catch((error) => {
			// Failure
			console.log(error);
			res.status(400).json({
				message: error
			});
		});
	}
};

async function updateCloud(req, res) {
	if(!req.file){
		return res.status(400).json({ error: 'No file uploaded' });
	}else {
		const { id } = req.params; 
		const file = req.file;
		const { judul, deskripsi } = req.body;

		imageKitConfig.upload({
			file: file.buffer.toString('base64'),
			fileName: file.originalname,
			folder: "/binar-assets",
			tags: ["upload-banner"]
		}).then((response) => {

			const data = {
				judul: judul,
				deskripsi:deskripsi,
				images: response.url
			};

			return UPLOADIMAGES.updateUpload(id, data);
		}).then((result) =>{
			res.json({
				message: "PUT upload API",
				data: result.rows[0]
			});

		}).catch((error) => {
			// Failure
			console.log(error);
			res.status(400).json({
				message: error
			});
		});
	}
}

async function deleteCloud(req, res) {
	const { id } = req.params;

	try {
		const rssult = await UPLOADIMAGES.deleteDataCloud(id);
		res.json({
			message: "DELETE file API",
			data: rssult
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}

module.exports = {
    index,
    uploadCloud,
	updateCloud,
	deleteCloud
}