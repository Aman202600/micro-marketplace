const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');

dotenv.config();

const users = [
    {
        name: 'User One',
        email: 'user1@test.com',
        password: 'password123',
    },
    {
        name: 'User Two',
        email: 'user2@test.com',
        password: 'password123',
    },
];

const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sport'];

const products = [
    // Electronics
    {
        title: 'iPhone 15 Pro',
        price: 1099,
        description: 'Titanium design, A17 Pro chip, versatile 48MP camera.',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop',
        category: 'Electronics',
    },
    {
        title: 'MacBook Air M2',
        price: 1199,
        description: 'Strikingly thin design, blazing-fast performance.',
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop',
        category: 'Electronics',
    },
    {
        title: 'Sony WH-1000XM5',
        price: 349,
        description: 'Industry-leading noise cancellation headphones.',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop',
        category: 'Electronics',
    },
    {
        title: 'iPad Pro 11"',
        price: 799,
        description: 'Supercharged by Apple M2 chip.',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop',
        category: 'Electronics',
    },
    // Clothing
    {
        title: 'Premium Linen Shirt',
        price: 85,
        description: 'Breathable 100% organic linen for maximum comfort.',
        image: 'https://images.unsplash.com/photo-1594932224010-70f443585093?q=80&w=1000&auto=format&fit=crop',
        category: 'Clothing',
    },
    {
        title: 'Designer Silk Dress',
        price: 240,
        description: 'Elegant silk dress for special occasions.',
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop',
        category: 'Clothing',
    },
    {
        title: 'Winter Puffer Jacket',
        price: 180,
        description: 'Ultra-warm insulated jacket for extreme cold.',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
        category: 'Clothing',
    },
    // Books
    {
        title: 'Atomic Habits',
        price: 28,
        description: 'An easy and proven way to build good habits.',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop',
        category: 'Books',
    },
    {
        title: 'The Psychology of Money',
        price: 22,
        description: 'Timeless lessons on wealth, greed, and happiness.',
        image: 'https://images.unsplash.com/photo-1592492159418-39f319320569?q=80&w=1000&auto=format&fit=crop',
        category: 'Books',
    },
    {
        title: 'Deep Work',
        price: 26,
        description: 'Rules for focused success in a distracted world.',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop',
        category: 'Books',
    },
    // Home
    {
        title: 'Minimalist Floor Lamp',
        price: 110,
        description: 'Sleek design to brighten up your living space.',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed657f9971?q=80&w=1000&auto=format&fit=crop',
        category: 'Home',
    },
    {
        title: 'Ergonomic Desk Chair',
        price: 299,
        description: 'Premium lumbar support for long working hours.',
        image: 'https://images.unsplash.com/photo-1505797149-43b00fe9ee1b?q=80&w=1000&auto=format&fit=crop',
        category: 'Home',
    },
    {
        title: 'Ceramic Vase Set',
        price: 55,
        description: 'Handcrafted ceramic vases for home decor.',
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1000&auto=format&fit=crop',
        category: 'Home',
    },
    // Sport
    {
        title: 'Adjustable Dumbbells',
        price: 320,
        description: 'Space-saving weights for your home gym.',
        image: 'https://images.unsplash.com/photo-1584735975616-d474fd2b0c51?q=80&w=1000&auto=format&fit=crop',
        category: 'Sport',
    },
    {
        title: 'Smart Fitness Tracker',
        price: 145,
        description: 'Monitor your health and workout data 24/7.',
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1000&auto=format&fit=crop',
        category: 'Sport',
    },
    {
        title: 'Outdoor Mountain Bike',
        price: 850,
        description: 'Durable frame for off-road adventures.',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1000&auto=format&fit=crop',
        category: 'Sport',
    },
];

const importData = async () => {
    console.log('Starting seed script...');
    try {
        console.log('Connecting to MongoDB at:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);

        const user1 = createdUsers[0]._id;
        const user2 = createdUsers[1]._id;

        const sampleProducts = products.map((product, index) => {
            return { ...product, seller: index < 5 ? user1 : user2 };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
