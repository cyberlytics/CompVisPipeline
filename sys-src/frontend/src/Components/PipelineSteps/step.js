import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Collapse from '@mui/material/Collapse';
import Parameter from './parameter.js'

export default function Step(props) {
    const { isClickable, title, id, params } = props;

    const [isExpanded, setIsExpandend] = useState(false)

    const stepId = id //todo

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

    //returns a single parameterstep with containing parameters
    return (
        <List key={id}>
            <ListItemButton onClick={handleItemClick}>
                <ListItemIcon onClick={isClickable && handleExpandClick} >
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemIcon>
                <ListItemText primary={title} />
                <VisibilityOutlinedIcon onClick={isClickable && handleShowResultClick} sx={{ mr: 2 }} />
                <DeleteOutlineOutlinedIcon onClick={isClickable && handleDeleteClick} />
            </ListItemButton>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {params.map(param => {
                        return (
                            <Parameter sx={{ pl: 4 }} parameterId={param.id} parameterName={param.title} defaultValue={param.defaultValue} key={param.id}/>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
}