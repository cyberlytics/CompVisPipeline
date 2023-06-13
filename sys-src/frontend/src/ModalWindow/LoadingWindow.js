import React, { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import cat from '../resources/cat.png';
import CardMedia from "@mui/material/CardMedia";

export default function LoadingWindow({ open, onClose }) {
  const cardMediaRef = useRef(null);
  const containerRef = useRef(null);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  let velocityX = 2;
  let velocityY = 2;

  useEffect(() => {
    const container = containerRef.current;
    const cardMedia = cardMediaRef.current;

    if (!container || !cardMedia) {
      return;
    }

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const cardMediaWidth = cardMedia.offsetWidth;
    const cardMediaHeight = cardMedia.offsetHeight;

    const animate = () => {
      setPositionX((prevX) => {
        let nextX = prevX + velocityX;
        if (nextX + cardMediaWidth >= containerWidth || nextX <= 0) velocityX *= -1;
        return nextX;
      });

      setPositionY((prevY) => {
        let nextY = prevY + velocityY;
        if (nextY + cardMediaHeight >= containerHeight || nextY <= 0) velocityY *= -1;
        return nextY;
      });

      requestAnimationFrame(animate);
    };

    if (open) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animate);
    };
  }, [open]);

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle data-testid="loading-screen-title">
        Loading...
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8,  top: 8, color: (theme) => theme.palette.grey[500] }} >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ width: 400, height: 250 }}>
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}} >
          <CardMedia ref={cardMediaRef} sx={{ width: "20%", position: "absolute", objectFit: "contain", transform: `translate(${positionX}px, ${positionY}px)`}} src={cat} component="img" alt="Loading"/>
        </div>
      </DialogContent>
    </Dialog>
  );
}
