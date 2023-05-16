import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InformationPopup from '../../ModalWindow/InformationPopup';

export default function Parameter(props) {
    const { parameterName, defaultValue, info } = props;

    const [isOpen, setIsOpen] = useState(false);

    const handleClosePopup = () => {
      setIsOpen(false);
    };

    const handleInfoClick = () => {
        setIsOpen(true);
    };

    //returns a paramater view based on the given name and defaultvalue
    return (
        <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
                <InfoOutlinedIcon fontSize='small' onClick={handleInfoClick} />
            </ListItemIcon>
            <ListItemText primary={parameterName} />
            <TextField type={typeof defaultValue == 'number' ? 'number' : 'text'} variant="outlined" defaultValue={defaultValue} sx={{ ml: 1, width: 150 }} />
            <InformationPopup open={isOpen} onClose={handleClosePopup} headerText={parameterName} text={info} />
        </ListItem>
    );
}