const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(wrapAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.get('/:id', wrapAsync(campgrounds.showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.renderEditCampgroundForm));

router.post('/:id/edit', isLoggedIn, isAuthor, upload.array('image'), validateCampground, wrapAsync(campgrounds.updateCampground));

router.post('/:id/delete', isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground));

module.exports = router;