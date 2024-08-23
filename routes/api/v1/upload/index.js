var express = require('express');
var router = express.Router();

const UPLOAD_CLOUD_CONTROLLER = require('../../../../controller/upload-cloud.controller');
const UPLOAD_INTERNAL_CONTROLLER = require('../../../../controller/upload-internal.controller');
const { Cloud } = require('../../../../config/storage/cloud');

router.get('/', UPLOAD_INTERNAL_CONTROLLER.index);

router.post('/addimage/internal', UPLOAD_INTERNAL_CONTROLLER.uploadInternal);
router.put('/:id/updateinternal', UPLOAD_INTERNAL_CONTROLLER.updateInternal);
router.delete('/:id/deleteinternal', UPLOAD_INTERNAL_CONTROLLER.deleteInternal);

router.post('/addimage/cloud', Cloud(
		['image/png', 'image/jpeg']
	).single('images'), UPLOAD_CLOUD_CONTROLLER.uploadCloud);
router.put('/:id/updatecloud', Cloud(
		['image/png', 'image/jpeg']
	).single('images'), UPLOAD_CLOUD_CONTROLLER.updateCloud);
router.delete('/:id/deletecloud', UPLOAD_CLOUD_CONTROLLER.deleteCloud);

module.exports = router;