const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../schemas.js');
const {validateReview, isReviewAuthor, isLoggedIn} = require('../middleware')
const reviews = require('../controllers/reviews');

router.post('/',isLoggedIn, validateReview, wrapAsync(reviews.createReview));

router.post('/:reviewId/delete', isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview));

module.exports = router;