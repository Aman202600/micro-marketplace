const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    const { search, category, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }

    if (category) {
        query.category = category;
    }

    const skip = (page - 1) * limit;

    try {
        const products = await Product.find(query)
            .populate('seller', 'name email')
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(query);

        res.status(200).json({
            products,
            page: Number(page),
            pages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('seller', 'name email');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
    const { title, price, description, image, category } = req.body;

    const product = new Product({
        title,
        price,
        description,
        image,
        category,
        seller: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
    const { title, price, description, image, category } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        if (product.seller.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized to update this product');
        }

        product.title = title || product.title;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.category = category || product.category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        if (product.seller.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized to delete this product');
        }

        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
