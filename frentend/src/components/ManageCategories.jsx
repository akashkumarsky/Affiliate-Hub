import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const ManageCategories = ({ onCategoryAdded }) => {
    const [categoryName, setCategoryName] = useState('');
    const [status, setStatus] = useState({ message: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: 'Adding category...', type: 'info' });
        const credentials = localStorage.getItem('authCredentials');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                },
                body: JSON.stringify({ name: categoryName }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Request failed: ${response.status}`);
            }

            const newCategory = await response.json();
            onCategoryAdded(newCategory); // Update the global state
            setStatus({ message: 'Category added successfully!', type: 'success' });
            setCategoryName(''); // Clear the input field

        } catch (error) {
            console.error('Failed to add category:', error);
            setStatus({ message: error.message, type: 'error' });
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Add New Category</h3>
            {status.message && (
                <div
                    className={`p-3 mb-4 rounded-md text-sm ${status.type === 'success'
                            ? 'bg-green-100 text-green-800'
                            : status.type === 'error'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                        }`}
                >
                    {status.message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter new category name"
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
                    required
                />
                <button
                    type="submit"
                    className="inline-flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <PlusCircle size={20} className="mr-2" /> Add Category
                </button>
            </form>
        </div>
    );
};

export default ManageCategories;
