import { useState, useEffect, useCallback } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import SearchBar from '../components/SearchBar';
import { Filter } from 'lucide-react';
import Pagination from '../components/Pagination';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState('');

    const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sport'];

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/products', {
                params: {
                    search,
                    category: category === 'All' ? '' : category,
                    page,
                    limit: 8
                }
            });
            setProducts(data.products);
            setTotalPages(data.pages);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    }, [search, category, page]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1); // Reset to first page on search
            fetchProducts();
        }, 400);

        return () => clearTimeout(timer);
    }, [search, category, fetchProducts]);

    // Handle page change
    useEffect(() => {
        fetchProducts();
    }, [page, fetchProducts]);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 py-16 mb-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
                            >
                                Discover <span className="text-sky-400">Premium</span> Items
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-400 mt-4 text-lg max-w-xl"
                            >
                                Explore our curated collection of amazing items, sourced from top manufacturers around the world.
                            </motion.p>
                        </div>
                        <SearchBar value={search} onChange={setSearch} />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {/* Categories */}
                <div className="flex items-center gap-6 mb-10 overflow-x-auto pb-4 no-scrollbar">
                    <div className="flex items-center gap-2 text-slate-400 flex-shrink-0">
                        <Filter size={20} />
                        <span className="text-sm font-bold uppercase tracking-widest">Filters:</span>
                    </div>
                    {categories.map((cat, idx) => (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={cat}
                            onClick={() => {
                                setCategory(cat);
                                setPage(1);
                            }}
                            className={`px-6 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all duration-300 ${category === cat || (cat === 'All' && !category)
                                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30 ring-2 ring-sky-600 ring-offset-2'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50'
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        <div className="mt-16 flex justify-center">
                            <Pagination
                                current={page}
                                total={totalPages}
                                onPageChange={setPage}
                            />
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-200"
                    >
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No items found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto">We couldn't find any products matching your current filters. Try adjusting your search.</p>
                        <button
                            onClick={() => { setSearch(''); setCategory('All'); }}
                            className="mt-8 text-sky-600 font-bold hover:text-sky-700 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Products;
