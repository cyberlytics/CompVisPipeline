import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';

export default function Step() {

    const [isExpanded, setIsExpandend] = useState(false)

    const handleItemClick = () => {
        //todo
    };

    const handleExpandClick = () => {
        setIsExpandend(!isExpanded);
    };

    const handleShowResultClick = () => {
        //todo
    };

    const handleDeleteClick = () => {
        //todo
    };

    return (
        <List>
            <ListItemButton onClick={handleItemClick}>
                <ListItemIcon onClick={handleExpandClick}>
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemIcon>
                <ListItemText primary="Teststep" />
                <VisibilityOutlinedIcon onClick={handleShowResultClick} sx={{mr: 2}}/>
                <DeleteOutlineOutlinedIcon onClick={handleDeleteClick}/>
            </ListItemButton>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <FiberManualRecordOutlinedIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText primary="Parameter A" />
                        <TextField id="param1" type='number' variant="outlined" sx={{ml: 1, width: 100}}/>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}