import React, { useState, useEffect } from 'react';
import { fetchDescriptions, createDescription, updateDescription } from '../../Services/descriptionService';
import { PageContainer, theme, Input, Button } from '../../Design/GlobalTheme'; 
import styled from 'styled-components';

// Styled components specific to TransactionEntry
const DescriptionMaintenanceContainer = styled.div`
  // Your specific styles for the container
`;

const Label = styled.label`
  color: ${theme.colors.text};
  // Additional label styling
`;

const SaveDescriptionButton = styled(Button)` // Assuming Button is a styled component from GlobalTheme
  // Additional styles for the submit button if needed
`;


function DescriptionMaintenance() {
    const [searchTerm, setSearchTerm] = useState('');
    const [descriptions, setDescriptions] = useState([]);
    const [descriptionForm, setDescriptionForm] = useState({ descriptionName: '', descriptionId: '' });

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    const handleSearch = async () => {
        try {
          const fetchedDescriptions = await fetchDescriptions(searchTerm);
          setDescriptions(fetchedDescriptions);
        } catch (error) {
          // Handle error
        }
      };
      // Call handleSearch
      handleSearch();

    const handleDescriptionFormChange = (e) => {
        setDescriptionForm({ ...descriptionForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (descriptionForm.descriptionId) {
                await updateDescription(descriptionForm.descriptionId, { descriptionName: descriptionForm.descriptionName });
            } else {
                await createDescription({ descriptionName: descriptionForm.descriptionName });
            }
            // Clear form, refresh descriptions
            setDescriptionForm({ descriptionName: '', descriptionId: '' });
            handleSearch();
        } catch (error) {
            // Handle error
        }
    };

    const handleEdit = (description) => {
        setDescriptionForm({ descriptionName: description.descriptionName, descriptionId: description._id });
    };

    return (
        <PageContainer>
        <DescriptionMaintenanceContainer>
        <div>
        <form onSubmit={handleSubmit}>   
        <Label>
            Search Description:
        <Input type="text" value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} />
        </Label>
        <Label>
            Description Name:
        <Input type="text" value={descriptionForm}  onChange={(e) => handleDescriptionFormChange(e.target.value)} />
        </Label>
      </form>
            <div>
            <SaveDescriptionButton type="submit">Save description</SaveDescriptionButton>
            </div>
            {descriptions.map((description) => (
                <div key={description._id}>
                    {description.descriptionName}
                    <SaveDescriptionButton onClick={() => handleEdit(description)}>Edit</SaveDescriptionButton>
                    {/* Add a delete button if needed */}
                </div>
                
            ))}
        </div>
        </DescriptionMaintenanceContainer>
    </PageContainer>
    );
}

export default DescriptionMaintenance;

