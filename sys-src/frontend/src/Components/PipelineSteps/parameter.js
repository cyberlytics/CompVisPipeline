import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import TextField from '@mui/material/TextField';

export default function Parameter(props) {
    const { parameterName, defaultValue } = props;

    return (
        <ListItem sx={{ pl: 4 }}>
            <ListItemIcon>
                <FiberManualRecordOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary={parameterName} />
            <TextField type={typeof defaultValue == 'number' ? 'number' : 'text'} variant="outlined" defaultValue={defaultValue} sx={{ ml: 1, width: 150 }} />
        </ListItem>
    );
}