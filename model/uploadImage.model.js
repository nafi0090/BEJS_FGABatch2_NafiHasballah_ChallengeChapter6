const DB = require('../config/db');
const fs = require('fs');
const imageKitConfig = require("../config/lib/imagekit");
const path = require('path');

const UPLOADIMAGES = {
    index: async () => {
		try {
			const query = 'SELECT * FROM files';
			const result = await DB.query(query);
			return result;
		} catch (err) {
			console.error(err.message);
			return err
		}
	},

	upload: async (data) => {
		try {
			const { judul, deskripsi, images } = data; 

			const query = `
			INSERT INTO files
				(judul, deskripsi, images) 
			VALUES 	
				($1, $2, $3)
			RETURNING *`;

			const result = await DB.query(
				query,[judul, deskripsi, images]
			);

			console.log(result);
	
			return result;
		} catch (err) {
			console.error(err.message);
			return err
		}
	},

	updateUpload: async (id, data) => {
		try {
			const {judul, deskripsi, images } = data; 

			const query = `
			UPDATE files 
			SET
				judul = $1,
				deskripsi = $2,
				images = $3
			WHERE id = $4
			RETURNING *
			`;

			const result = await DB.query(
				query,
				[judul, deskripsi, images, id]
			);
	
			return result;

		} catch (err) {
			console.error(err.message);
			return err
		}
	},
	
	deleteDataInternal:async (id) =>{
		try {
			const query = `DELETE FROM files WHERE id = $1 RETURNING *`;
			const result = await DB.query(query, [id]);

			if (result.rowCount === 0) {
				return 'data tidak ada'
			}

			const fileName = result.rows[0].images;
			const filePath = path.join(__dirname,'../', fileName);

			fs.unlink(filePath, (err) => {
				if (err) {
					console.error(`Failed to delete file: ${filePath}`, err.message);
				}
			});

			return result.rows[0];
		} catch (err) {
			console.error(err.message);
			return err
		}
	},

	deleteDataCloud:async (id)=>{
		try {
			const querycloud = `SELECT images FROM files WHERE id = $1`;
			const filePath = await DB.query(querycloud, [id]);
			const url = filePath.rows[0].images;

			const files = await imageKitConfig.listFiles({
				url: url,
			});
			const query = `DELETE FROM files WHERE id = $1 RETURNING *`;
			const result = await DB.query(query, [id]);
			
			if (result.rowCount === 0) {
				return 'data tidak ada'
			}
			const fileid = files[0].fileId;
			
			await imageKitConfig.deleteFile(fileid);
			
			return result.rows[0];
		} catch (err) {
			console.error(err.message);
			return err
		}
	},
};

module.exports = UPLOADIMAGES;