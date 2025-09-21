import React, { useState } from 'react';
import AddProductForm from './AddProductForm'; // We will create this next
import ManageCategories from './ManageCategories';
import { LayoutDashboard, ShoppingBag, FolderPlus } from 'lucide-react';

const AdminDashboard = ({ onProductAdded, categories, onCategoryAdded }) => {
    const [activeTab, setActiveTab] = useState('products'); // 'products' or 'categories'

    const tabClass = (tabName) =>
        `flex items-center px-4 py-2 text-lg font-semibold rounded-t-lg cursor-pointer transition-colors ${activeTab === tabName
            ? 'bg-white text-gray-800 border-b-4 border-yellow-500'
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`;

    return (
        <main className="p-8 pt-24 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-6">
                    <LayoutDashboard size={32} className="text-yellow-500 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
                </div>

                {/* --- TAB NAVIGATION --- */}
                <div className="flex border-b border-gray-200">
                    <button onClick={() => setActiveTab('products')} className={tabClass('products')}>
                        <ShoppingBag size={20} className="mr-2" /> Manage Products
                    </button>
                    <button onClick={() => setActiveTab('categories')} className={tabClass('categories')}>
                        <FolderPlus size={20} className="mr-2" /> Manage Categories
                    </button>
                </div>

                {/* --- TAB CONTENT --- */}
                <div className="bg-white p-8 rounded-b-xl shadow-lg">
                    {activeTab === 'products' && (
                        <AddProductForm onProductAdded={onProductAdded} categories={categories} />
                    )}
                    {activeTab === 'categories' && (
                        <ManageCategories onCategoryAdded={onCategoryAdded} />
                    )}
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;