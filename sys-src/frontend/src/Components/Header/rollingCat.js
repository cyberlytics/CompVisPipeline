import React, { useEffect, useState } from 'react';
import cat from '../../resources/cat.png'
import './rollingCat.css';

export default function RollingCat() {
    const [isRolling, setIsRolling] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsRolling(true);
            setTimeout(() => {
                setIsRolling(false)
            }, 2000);
        }, 4000);
        return () => {
            clearInterval(interval)
        };
    }, []);

    return (
        <div className={`rolling-image ${isRolling ? 'rolling' : ''}`}>
            <img src={cat} alt="icon" />
        </div>
    );
}
