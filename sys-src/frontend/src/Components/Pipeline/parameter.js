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
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import Tooltip from '@mui/material/Tooltip';

export default function Parameter(props) {
    const { index, parameterName, defaultValue, value, setValue, info } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [parameterValue, setParameterValue] = useState(defaultValue)

    const initalizeParameterType = () => {
        if (typeof defaultValue === 'number') return ParameterType.Number
        else if (defaultValue === false || defaultValue === true) return ParameterType.Boolean
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

    //function to change parameter value when input changed
    const handleParameterChange = (e) => {

        let newValue = e.target.value;

        if (parameterType === ParameterType.Number) {
          newValue = e.target.valueAsNumber;
        } 
        else if (parameterType === ParameterType.Boolean) {
          newValue = e.target.value === 'true';
        }
      
        setParameterValue(newValue);
        setValue(index, newValue);
    };

    //function to set parameter to defaultValue
    const handleDiscardChangesClick = () => {
        setParameterValue(defaultValue) 
        setValue(index, defaultValue);
    };

    //returns a paramater view based on the given name and defaultvalue
    return (
        <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
                <InfoOutlinedIcon data-testid="info-button" className="infoOutlinedIcon" fontSize='small' onClick={handleInfoClick} />
            </ListItemIcon>
            <ListItemText primary={parameterName} />
            {parameterType === ParameterType.Number &&
                <TextField data-testid="parameter-input" className='parameter-type-number' type={'number'} variant="outlined" value={parameterValue} onChange={handleParameterChange} sx={{ ml: 1, width: 150 }} />
            }
            {parameterType === ParameterType.Text &&
                <TextField data-testid="parameter-input" className='parameter-type-text' type={'text'} variant="outlined" value={parameterValue} onChange={handleParameterChange} sx={{ ml: 1, width: 150 }} />
            }
            {parameterType === ParameterType.Boolean &&
                <Select data-testid="parameter-select" className='parameter-type-boolean' value={parameterValue} onChange={handleParameterChange} sx={{ ml: 1, width: 150 }}>
                    <MenuItem value={'true'}>true</MenuItem>
                    <MenuItem value={'false'}>false</MenuItem>
                </Select>
            }
            <ListItemIcon sx={{ pl: 4 }}>
                <Tooltip title="Set parameter to default.">
                    <RestartAltOutlinedIcon data-testid="discard-changes-button" className="restartAltOutlinedIcon" fontSize='medium' onClick={handleDiscardChangesClick} />
                </Tooltip>
            </ListItemIcon>
            <InformationPopup data-testid="information-popup" open={isOpen} onClose={handleClosePopup} headerText={parameterName} text={info} />
        </ListItem>
    );
}