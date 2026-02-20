const User = require('../models/User');

// @desc    Get user favorites
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
    const user = await User.findById(req.user._id).populate('favorites');
    res.status(200).json(user.favorites);
};

// @desc    Add product to favorites
// @route   POST /api/favorites/:productId
// @access  Private
const addFavorite = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user.favorites.includes(req.params.productId)) {
        return res.status(400).json({ message: 'Product already in favorites' });
    }

    user.favorites.push(req.params.productId);
    await user.save();

    res.status(200).json({ message: 'Product added to favorites' });
};

// @desc    Remove product from favorites
// @route   DELETE /api/favorites/:productId
// @access  Private
const removeFavorite = async (req, res) => {
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
        (fav) => fav.toString() !== req.params.productId
    );

    await user.save();

    res.status(200).json({ message: 'Product removed from favorites' });
};

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite,
};
