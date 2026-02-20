const express = require('express');
const {
    getFavorites,
    addFavorite,
    removeFavorite,
} = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getFavorites);
router.post('/:productId', protect, addFavorite);
router.delete('/:productId', protect, removeFavorite);

module.exports = router;
