import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InformationPopup from '../../ModalWindow/InformationPopup';
import { ParameterType } from './parameterType';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Parameter(props) {
    const { parameterName, defaultValue, info } = props;

    const [isOpen, setIsOpen] = useState(false);

    const initalizeParameterType = () => {
        if (typeof defaultValue === 'number') return ParameterType.Number
        else if (defaultValue === 'true' || defaultValue === 'false') return ParameterType.Boolean
        else return ParameterType.Text
    }

    const [parameterType, setParameterType] = useState(initalizeParameterType)

    //function to open modalwindow for information
    const handleInfoClick = () => {
        setIsOpen(true);
    };

    //function to close modalwindow
    const handleClosePopup = () => {
        setIsOpen(false);
    };

    //returns a paramater view based on the given name and defaultvalue
    return (
        <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
                <InfoOutlinedIcon className="infoOutlinedIcon" fontSize='small' onClick={handleInfoClick} />
            </ListItemIcon>
            <ListItemText primary={parameterName} />
            {parameterType === ParameterType.Number &&
                <TextField className='parameter-type-number' type={'number'} variant="outlined" defaultValue={defaultValue} sx={{ ml: 1, width: 150 }} />
            }
            {parameterType === ParameterType.Text &&
                <TextField className='parameter-type-text' type={'text'} variant="outlined" defaultValue={defaultValue} sx={{ ml: 1, width: 150 }} />
            }
            {parameterType === ParameterType.Boolean &&
                <Select className='parameter-type-boolean' defaultValue={defaultValue} sx={{ ml: 1, width: 150 }}>
                    <MenuItem value={'true'}>true</MenuItem>
                    <MenuItem value={'false'}>false</MenuItem>
                </Select>
            }
            <InformationPopup open={isOpen} onClose={handleClosePopup} headerText={parameterName} text={info} />
        </ListItem>
    );
}