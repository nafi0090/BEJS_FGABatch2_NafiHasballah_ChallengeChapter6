const { upload } = require('../config/storage');
const UPLOADIMAGES = require('../model/uploadImage.model');

async function index(req, res) {
    const result = await UPLOADIMAGES.index();
	res.json({
		message: "GET files API",
		data: result.rows
	});
}

async function uploadInternal(req, res) {
	upload.single('images')(req, res, async (err) => {

		// const {judul, deskripsi} = req.body;
		// const file = req.file;

		// console.log(judul);
		// console.log(deskripsi);

		// const data = {
		// 	judul: judul, 
		// 	deskripsi:deskripsi
		// };

		// console.log(data);
		// console.log(file);

		if (!req.file){
			return res.status(400).json({ error: 'No file uploaded' });
		}else {
			if (err) {
				return res.status(400).json({
					message: err.message
				});
			}
			const { judul, deskripsi } = req.body;
			const data = {
				judul: judul,
				deskripsi: deskripsi,
				images: req.file.path
			};
			const result = await UPLOADIMAGES.upload(data);
			res.json({
				message: "POST upload API",
				data: result.rows[0]
			});
		}
	});
}

async function updateInternal(req, res) {
	upload.single('images')(req, res, async (err) => {
		if(!req.file){
			
		}else{
			const { id } = req.params; 
			const { judul, deskripsi } = req.body;
			const data = {
				judul: judul,
				deskripsi: deskripsi,
			};

			if (req.file){
				data.images = req.file.path
			}

			if (err) {
				return res.status(400).json({
					message: err.message
				});
			}
			
			try {
				const result = await UPLOADIMAGES.updateUpload(id, data);
				if (result.rowCount === 0) {
					return res.status(404).json({ error: 'Data not found' });
				}
				res.json({
					message: "PUT update API",
					data: result.rows[0]
				});
			} catch (error) {
				res.status(500).json({
					message: error.message
				});
			}
		}
	});

}

async function deleteInternal(req, res) {
	const { id } = req.params;

	try {
		const rssult = await UPLOADIMAGES.deleteDataInternal(id);
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
    uploadInternal,
	updateInternal,
	deleteInternal
}