import React, { useEffect, useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import cat from '../resources/cat.png';
import CardMedia from "@mui/material/CardMedia";

export default function LoadingWindow({ open, onClose }) {
  const BOUNCINGWIDTH = 400;
  const BOUNCINGHEIGHT = 260;
  const IMAGESIZE = 60;

  const [animationSettings, setAnimationSettings] = useState(
    {
      positionX: BOUNCINGWIDTH / 2,
      positionY: BOUNCINGHEIGHT / 2,
      velocityX: 4,
      velocityY: 4,
      backgroundcolor: "transparent"
    })


  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle data-testid="loading-screen-title">
        Loading...
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }} >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ width: BOUNCINGWIDTH, height: BOUNCINGHEIGHT, padding: 0 }}>
        <CardMedia src={cat} component="img" alt="Loading" sx={{ width: `${IMAGESIZE}px`, objectFit: "contain", position: "absolute", transform: `translate(${animationSettings.positionX}px, ${animationSettings.positionY}px)`, backgroundColor: animationSettings.backgroundcolor }} />
      </DialogContent>
    </Dialog>
  );
}