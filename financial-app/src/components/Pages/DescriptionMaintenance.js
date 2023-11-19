import React, { useState, useEffect } from 'react';    
import { fetchDescriptions, searchDescriptionsByName, createDescription, updateDescription, deleteDescription } from '../../Services/descriptionService';
import { PageContainer, theme, Input, Button, DeleteButton, EditButton } from '../../Design/GlobalTheme';
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

// Styled components specific to CategoryMaintenance
const DescriptionMaintenanceContainer = styled.div`
  // Your specific styles for the container
`;

const Label = styled.label`
  color: ${theme.colors.text};
  // Additional label styling

  `;

const ActionButton = styled(Button)` // Assuming Button is a styled component from GlobalTheme
  // Additional styles for the action buttons if needed
`;

function DescriptionMaintenance() {
    const [searchTerm, setSearchTerm] = useState('');
    const [descriptions, setDescriptions] = useState([]);
    const [descriptionForm, setDescriptionForm] = useState({ DescriptionName: '', DescriptionId: '', isActive: true });
    const [hasSearched, setHasSearched] = useState(false);

    const fetchAllDescriptions = async () => {
        const fetchedDescriptions = await fetchDescriptions();
        setDescriptions(fetchedDescriptions);
    };

    useEffect(() => {
        if (searchTerm && hasSearched) {
            const fetchSearchedDescriptions = async () => {
                const searchedDescription = await searchDescriptionsByName(searchTerm);
                setDescriptions(searchedDescription);
            };
    
            fetchSearchedDescriptions();
        }
    }, [searchTerm, hasSearched]); 
 
    const handleSearch = async (e) => {
        e.preventDefault();
        setHasSearched(true);
    };

    const handleDescriptionFormChange = (e) => {
        setDescriptionForm({ ...descriptionForm, [e.target.name]: e.target.value });
    };

const handleSaveOrUpdate = async (e) => {
        e.preventDefault();
        try {
          // Check if DescriptionId is not null (i.e., editing an existing description)
          if (descriptionForm.DescriptionId) {
            await updateDescription(descriptionForm.DescriptionId, {
              DescriptionName: descriptionForm.DescriptionName,
              isActive: descriptionForm.isActive,
            });
            // Update state to reflect changes
            const updatedDescriptions = descriptions.map(description => 
              description._id === descriptionForm.DescriptionId ? {...description, DescriptionName: descriptionForm.DescriptionName, isActive: descriptionForm.isActive} : description
            );
            setDescriptions(updatedDescriptions);
          } else {
            const newDescription = await createDescription({
              DescriptionName: descriptionForm.DescriptionName,
              isActive: descriptionForm.isActive,
            });
            setDescriptions([...descriptions, newDescription]);
          }
          setDescriptionForm({ DescriptionName: '', DescriptionId: null, isActive: true });
        } catch (error) {
          console.error('Failed to save or update the description:', error);
          // Optionally, fetch descriptions again to ensure sync with server
          await fetchAllDescriptions();
        }
    };

    const handleEdit = (description) => {
        setDescriptionForm({
          DescriptionName: description.DescriptionName,
          DescriptionId: description._id, 
          isActive: description.isActive,
        });
    };

    const handleDelete = async (descriptionId) => {
        try {
            const newDescriptions = descriptions.filter(description => description._id !== descriptionId);
            setDescriptions(newDescriptions);
            await deleteDescription(descriptionId);
        } catch (error) {
            console.error('Error deleting description:', error);
            await fetchAllDescriptions();
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
          <DescriptionMaintenanceContainer>
            <form onSubmit={handleSaveOrUpdate}>
              <Label>
                Description Name:
                <Input
                  type="text"
                  name="DescriptionName"
                  value={descriptionForm.DescriptionName}
                  onChange={handleDescriptionFormChange}
                />
              </Label>
              <ActionButton type="submit">Save/Update Description</ActionButton>
            </form>
            <Spacer />
            <form onSubmit={handleSearch}>
              <Label>
                Search Descriptions:
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
                       <th style={styles.th}>Description Name</th>
                       <th style={styles.th}>Is Active</th>
                       <th style={styles.th}>Created Date</th>
                       <th style={styles.th}>Updated Date</th>
                       <th style={styles.th}>Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {descriptions.map((description, index) => (
                       <tr key={index} style={styles.tr}>
                         <td style={styles.td}>{description.DescriptionName}</td>
                         <td style={styles.td}>{description.isActive ? 'Yes' : 'No'}</td>
                         <td style={styles.td}>{description.createdAt}</td>
                         <td style={styles.td}>{description.updatedAt}</td>
                         <td style={styles.td}>
                         <EditButton style={editButtonStyle} onClick={() => handleEdit(description)}>
                             Edit
                           </EditButton>
                           <DeleteButton style={deleteButtonStyle} onClick={() => handleDelete(description._Id)}>
                             Delete
                           </DeleteButton>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
                )}
                <Spacer /> 
            </DescriptionMaintenanceContainer>
        </PageContainer>
    );
}

export default DescriptionMaintenance;
