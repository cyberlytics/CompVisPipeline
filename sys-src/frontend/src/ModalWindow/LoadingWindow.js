import React, { useEffect, useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SvgCat from '../resources/SvgCat';
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import { generateRandomColor } from '../randomColorGenerator';

export default function LoadingWindow({ open, onClose }) {
  const BOUNCINGWIDTH = 400;
  const BOUNCINGHEIGHT = 260;
  const IMAGESIZE = 80;

  const [animationSettings, setAnimationSettings] = useState(
    {
      positionX: BOUNCINGWIDTH / 2,
      positionY: BOUNCINGHEIGHT / 2,
      velocityX: 4,
      velocityY: 4,
      backgroundcolor: '#d22819'
    })

  const updateAnimationSettings = useCallback(() => {
    setAnimationSettings(prevAnimationSettings => {
      let newPosX = animationSettings.positionX + animationSettings.velocityX;
      let newVelX = newPosX + IMAGESIZE >= BOUNCINGWIDTH - animationSettings.velocityX || newPosX <= 0 - animationSettings.velocityX ? animationSettings.velocityX * -1 : animationSettings.velocityX

      let newPosY = animationSettings.positionY + animationSettings.velocityY;
      let newVelY = newPosY + IMAGESIZE >= BOUNCINGHEIGHT - animationSettings.velocityY || newPosY <= 0 - animationSettings.velocityY ? animationSettings.velocityY * -1 : animationSettings.velocityY

      let newColor = (newVelX !== animationSettings.velocityX) || (newVelY !== animationSettings.velocityY) ? generateRandomColor() : animationSettings.backgroundcolor

      return {
        ...prevAnimationSettings,
        positionX: newPosX,
        positionY: newPosY,
        velocityX: newVelX,
        velocityY: newVelY,
        backgroundcolor: newColor
      };
    });
  }, [animationSettings.positionX, animationSettings.positionY, animationSettings.velocityX, animationSettings.velocityY, animationSettings.backgroundcolor]);

  useEffect(() => {
    if (open === true) {
      const intervalId = setInterval(updateAnimationSettings, 10);
      return () => clearInterval(intervalId);
    }
  }, [open, updateAnimationSettings]);

  return (
    <Dialog open={open} width={`${BOUNCINGWIDTH}px`}>
      <DialogTitle data-testid="loading-screen-title">
        Loading...
        <IconButton data-testid="loading-screen-abort" aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }} >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <Box sx={{ width: BOUNCINGWIDTH, height: BOUNCINGHEIGHT+6, padding: 0 }}>
        <Box data-testid="loading-screen-cat" sx={{ width: `${IMAGESIZE}px`, height: `${IMAGESIZE}px`, objectFit: "contain", position: "absolute", transform: `translate(${animationSettings.positionX}px, ${animationSettings.positionY}px)`, padding:0}}>
          <SvgCat data-testid="loading-screen-cat" fill={animationSettings.backgroundcolor} size={IMAGESIZE}/>
        </Box>
      </Box>
    </Dialog>
  );
}