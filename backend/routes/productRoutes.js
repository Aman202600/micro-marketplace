const express = require('express');
const { body } = require('express-validator');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post(
    '/',
    protect,
    [
        body('title', 'Title is required').not().isEmpty(),
        body('price', 'Price must be a number').isNumeric(),
        body('description', 'Description is required').not().isEmpty(),
        body('category', 'Category is required').not().isEmpty(),
        body('image', 'Image URL is required').not().isEmpty(),
    ],
    validate,
    createProduct
);

router.put(
    '/:id',
    protect,
    [
        body('title', 'Title is required').optional().not().isEmpty(),
        body('price', 'Price must be a number').optional().isNumeric(),
        body('description', 'Description is required').optional().not().isEmpty(),
        body('category', 'Category is required').optional().not().isEmpty(),
        body('image', 'Image URL is required').optional().not().isEmpty(),
    ],
    validate,
    updateProduct
);

router.delete('/:id', protect, deleteProduct);

module.exports = router;
