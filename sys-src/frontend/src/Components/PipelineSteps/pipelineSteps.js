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
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Step from './step'

export default function PipelineSteps() {
    return (
        <Card style={{ height: 1000 }}>
            <CardContent>
                <Typography sx={{ width: '100%' }} align="center" variant="h5" component="div">Available Steps</Typography>
            </CardContent>
            <CardContent>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <List component="nav">
                            <Step />
                            <Divider />
                            <Step />
                            <Divider />
                            <Step />
                            <Divider />
                            <Step />
                        </List>
                </Box>
            </CardContent>
        </Card>
    );
}