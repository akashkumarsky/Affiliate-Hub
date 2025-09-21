import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from './context/AuthContext'; // <-- THIS IS THE FIX
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import HeroSection from './components/HeroSection';
import { ArchiveX } from 'lucide-react';

function App() {
  // Now this line will work correctly
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState('home');


  // This useEffect hook fetches data and is correct
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('http://localhost:8081/api/products'),
          fetch('http://localhost:8081/api/categories')
        ]);
        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Could not load data. Please ensure the backend is running and refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // This useMemo hook for filtering is correct
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    return products.filter(product => product.categoryName === selectedCategory);
  }, [products, selectedCategory]);

  // This handler for adding products is correct
  const handleProductAdded = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setPage('home');
  };



  // --- ADD THIS NEW HANDLER ---
  const handleCategoryAdded = (newCategory) => {
    // Update the categories list in real-time
    setCategories(prevCategories => [...prevCategories, newCategory]);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold">Loading...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center h-screen text-xl text-red-600 bg-red-100 p-10 rounded-lg">{error}</div>;
  }

  // The rendering logic is correct
  const renderContent = () => {
    if (page === 'admin') {
      // If the user wants the admin page, check if they are authenticated
      return isAuthenticated
        ? <AdminDashboard
          onProductAdded={handleProductAdded}
          categories={categories} // <-- ADD THIS PROP
          onCategoryAdded={handleCategoryAdded}
        />
        : <LoginPage />;
    }

    return (
      <div className="flex">
        <Sidebar categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <main className="ml-64 flex-1 p-8 pt-24">
          {!selectedCategory && <HeroSection />}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedCategory || 'All Products'}</h2>

          {/* --- THIS IS THE UPDATED SECTION --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              // If there are products, map over them and display them
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              // If the array is empty, display this message component
              <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gray-100 rounded-lg text-center">
                <ArchiveX className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
                <p className="mt-2 text-gray-500">There are currently no products listed in this category.</p>
                <p className="mt-1 text-sm text-gray-400">Please check back later or select another category.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar onNavigate={setPage} />
      {renderContent()}
    </div>
  );
}sub


export default App;