//CategoryMaintenance.js
import React, { useState, useEffect } from 'react';
import { fetchCategories, searchCategoriesByName, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
import { PageContainer, theme, Input, Button, DeleteButton, EditButton } from '../styles/GlobalTheme';
import styled from 'styled-components';

const Spacer = styled.div`
  margin-top: 16px; // Adjust this value as needed for your design
`;

const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  };

const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff4d4d', // Red color for delete button
    color: 'white',
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#1B39E3', // blue color for edit button
    color: 'white',
  };

const CategoryMaintenanceContainer = styled.div`
  // Your specific styles for the container
`;

const Label = styled.label`
  color: ${theme.colors.text};
  // Additional label styling

  `;

const ActionButton = styled(Button)` // Assuming Button is a styled component from GlobalTheme
  // Additional styles for the action buttons if needed
`;

function CategoryMaintenance() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryForm, setCategoryForm] = useState({ CategoryName: '', CategoryId: '', isActive: true });
    const [hasSearched, setHasSearched] = useState(false);

    const fetchAllCategories = async () => {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
    };

    useEffect(() => {
        if (searchTerm && hasSearched) {
            const fetchSearchedCategories = async () => {
                const searchedCategories = await searchCategoriesByName(searchTerm);
                setCategories(searchedCategories);
            };
    
            fetchSearchedCategories();
        }
    }, [searchTerm, hasSearched]); 
 
    const handleSearch = async (e) => {
        e.preventDefault();
        setHasSearched(true);
    };

    const handleCategoryFormChange = (e) => {
        setCategoryForm({ ...categoryForm, [e.target.name]: e.target.value });
    };

    const handleSaveOrUpdate = async (e) => {
        e.preventDefault();
        try {
          const payload = {
            categoryName: categoryForm.CategoryName, 
            isActive: categoryForm.isActive,
          };
      
          if (categoryForm.CategoryId) {
            await updateCategory(categoryForm.CategoryId, payload);
            // Update state to reflect changes
            const updatedCategories = categories.map(category => 
              category._id === categoryForm.CategoryId ? { ...category, ...payload } : category
            );
            setCategories(updatedCategories);
          } else {
            const newCategory = await createCategory(payload);
            setCategories([...categories, newCategory]);
          }
          // Reset the form
          setCategoryForm({ CategoryName: '', CategoryId: null, isActive: true });
        } catch (error) {
          console.error('Failed to save or update the category:', error);
          await fetchAllCategories();
        }
      };

    const handleEdit = (category) => {
        setCategoryForm({
          CategoryName: category.CategoryName,
          CategoryId: category._id, 
          isActive: category.isActive,
        });
    };

    const handleDelete = async (categoryId) => {
        try {
            const newCategories = categories.filter(category => category._Id !== categoryId);
            setCategories(newCategories);
            await deleteCategory(categoryId);
        } catch (error) {
            console.error('Error deleting category:', error);
            await fetchAllCategories();
        }
    };

    const styles = () => ({
        table: {
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
        },
        thead: {
          backgroundColor: '#333',
          color: '#fff',
        },
        th: {
          padding: '10px 15px',
          border: '1px solid #ddd',
        },
        td: {
          padding: '10px 15px',
          border: '1px solid #ddd',
        },
        tr: {
          '&:nth-of-type(even)': {
            backgroundColor: '#f8f8f8',
          },
          '&:hover': {
            backgroundColor: '#f1f1f1',
          },
        },
    
    });

    const dynamicStyles = styles();

    return (
        <PageContainer>
          <CategoryMaintenanceContainer>
            <form onSubmit={handleSaveOrUpdate}>
              <Label>
                Category Name:
                <Input
                  type="text"
                  name="CategoryName"
                  value={categoryForm.CategoryName}
                  onChange={handleCategoryFormChange}
                />
              </Label>
              <ActionButton type="submit">Save/Update Category</ActionButton>
            </form>
            <Spacer />
            <form onSubmit={handleSearch}>
              <Label>
                Search Categories:
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Label>
              <ActionButton type="submit">Search</ActionButton>
            </form>
                {hasSearched && (
                 <table style={dynamicStyles.table}>
                  <thead style={styles.thead}>
                     <tr>
                       <th style={styles.th}>Category Name</th>
                       <th style={styles.th}>Is Active</th>
                       <th style={styles.th}>Created Date</th>
                       <th style={styles.th}>Updated Date</th>
                       <th style={styles.th}>Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {categories.map((category, index) => (
                       <tr key={index} style={styles.tr}>
                         <td style={styles.td}>{category.CategoryName}</td>
                         <td style={styles.td}>{category.isActive ? 'Yes' : 'No'}</td>
                         <td style={styles.td}>{category.createdAt}</td>
                         <td style={styles.td}>{category.updatedAt}</td>
                         <td style={styles.td}>
                         <EditButton style={editButtonStyle} onClick={() => handleEdit(category)}>
                             Edit
                           </EditButton>
                           <DeleteButton style={deleteButtonStyle} onClick={() => handleDelete(category._Id)}>
                             Delete
                           </DeleteButton>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
                )}
                <Spacer /> 
            </CategoryMaintenanceContainer>
        </PageContainer>
    );
}

export default CategoryMaintenance;
