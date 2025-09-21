import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';

const AddProductForm = ({ onProductAdded, categories = [] }) => {
    const [formData, setFormData] = useState({
        name: '', price: '', asin: '', imageUrl: '',
        categoryName: '', rating: '', discount: '0'
    });
    const [status, setStatus] = useState({ message: '', type: '' });

    useEffect(() => {
        if (categories.length > 0 && !formData.categoryName) {
            setFormData(prev => ({ ...prev, categoryName: categories[0].name }));
        }
    }, [categories, formData.categoryName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: 'Submitting product...', type: 'info' });

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            rating: parseFloat(formData.rating),
            discount: parseInt(formData.discount, 10)
        };
        const credentials = localStorage.getItem('authCredentials');

        try {
            const response = await fetch('http://localhost:8081/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const newProduct = await response.json();
            onProductAdded(newProduct);
            setStatus({ message: 'Product added successfully!', type: 'success' });
            setFormData(prev => ({
                name: '', price: '', asin: '', imageUrl: '',
                categoryName: prev.categoryName,
                rating: '', discount: '0'
            }));

        } catch (error) {
            console.error('Submission failed:', error);
            setStatus({ message: `Submission failed. (Error: ${error.message})`, type: 'error' });
        }
    };

    const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent";
    const selectClass = `${inputClass} bg-white`;

    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Add New Product</h3>
            <p className="text-gray-600 mb-6">Use this form to add a new affiliate product to the website catalog.</p>
            {status.message && (
                <div className={`p-3 mb-4 rounded-md text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' :
                        status.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                    {status.message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="categoryName" value={formData.categoryName} onChange={handleChange} className={selectClass} required>
                            <option value="" disabled>Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className={inputClass} step="0.01" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                        <input type="number" name="discount" value={formData.discount} onChange={handleChange} className={inputClass} min="0" max="100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amazon ASIN</label>
                        <input type="text" name="asin" value={formData.asin} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                        <input type="number" name="rating" value={formData.rating} onChange={handleChange} className={inputClass} step="0.1" min="1" max="5" required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className={inputClass} placeholder="https://placehold.co/..." required />
                </div>
                <div className="text-right">
                    <button type="submit" className="inline-flex items-center bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors">
                        <PlusCircle size={20} className="mr-2" /> Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;