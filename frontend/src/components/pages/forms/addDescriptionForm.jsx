import React, { useState } from 'react';
import DescriptionService from 'components/services/descriptionService';
const { addDescription } = DescriptionService;

const NewDescriptionForm = ({ onClose, onDescriptionAdded }) => {
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const saveDescription = async () => {
        if (!description) {
            setError('Description cannot be empty');
            return;
        }

        try {
            await addDescription(description);
            onDescriptionAdded(description);
            onClose();
        } catch (e) {
            setError('Failed to save description');
            console.error(e);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Enter description" 
            />
            <button onClick={saveDescription}>Save</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default NewDescriptionForm;
