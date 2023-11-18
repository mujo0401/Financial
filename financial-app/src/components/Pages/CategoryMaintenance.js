import React, { useState, useEffect } from 'react';
import { fetchCategories, createCategory, updateCategory } from '../../Services/categoryService';
import { PageContainer, theme, Input, Button } from '../../Design/GlobalTheme'; 
import styled from 'styled-components';

// Styled components specific to TransactionEntry
const CategoryMaintenanceContainer = styled.div`
  // Your specific styles for the container
`;

const Label = styled.label`
  color: ${theme.colors.text};
  // Additional label styling
`;

const SaveCategoryButton = styled(Button)` // Assuming Button is a styled component from GlobalTheme
  // Additional styles for the submit button if needed
`;


function CategoryMaintenance() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryForm, setCategoryForm] = useState({ categoryName: '', categoryId: '' });

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    const handleSearch = async () => {
        try {
          const fetchedCategories = await fetchCategories(searchTerm);
          setCategories(fetchedCategories);
        } catch (error) {
          // Handle error
        }
      };
      // Call handleSearch
      handleSearch();

    const handleCategoryFormChange = (e) => {
        setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (categoryForm.categoryId) {
                await updateCategory(categoryForm.categoryId, { categoryName: categoryForm.categoryName });
            } else {
                await createCategory({ categoryName: categoryForm.categoryName });
            }
            // Clear form, refresh categories
            setCategoryForm({ categoryName: '', categoryId: '' });
            handleSearch();
        } catch (error) {
            // Handle error
        }
    };

    const handleEdit = (category) => {
        setCategoryForm({ categoryName: category.categoryName, categoryId: category._id });
    };

    return (
        <PageContainer>
        <CategoryMaintenanceContainer>
        <div>
        <form onSubmit={handleSubmit}>   
        <Label>
            Search Categories:
        <Input type="text" value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} />
        </Label>
        <Label>
            Category Name:
        <Input type="text" value={categoryForm}  onChange={(e) => handleCategoryFormChange(e.target.value)} />
        </Label>
      </form>
            <div>
            <SaveCategoryButton type="submit">Save Category</SaveCategoryButton>
            </div>
            {categories.map((category) => (
                <div key={category._id}>
                    {category.categoryName}
                    <SaveCategoryButton onClick={() => handleEdit(category)}>Edit</SaveCategoryButton>
                    {/* Add a delete button if needed */}
                </div>
                
            ))}
        </div>
        </CategoryMaintenanceContainer>
    </PageContainer>
    );
}

export default CategoryMaintenance;

