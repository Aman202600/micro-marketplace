import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-slate-50 flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Navigate to="/products" replace />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                            <Route
                                path="/favorites"
                                element={
                                    <PrivateRoute>
                                        <Favorites />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="*" element={<Navigate to="/products" replace />} />
                        </Routes>
                    </main>
                    <footer className="py-12 bg-white border-t border-slate-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <p className="text-slate-400 font-medium pb-2">
                                &copy; {new Date().getFullYear()} MicroMarket App. All rights reserved.
                            </p>
                            <div className="flex justify-center gap-6 mt-4">
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Built with MERN Stack</span>
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Premium Design</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
