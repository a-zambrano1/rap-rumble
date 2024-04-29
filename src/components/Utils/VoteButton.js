import Fab from '@mui/material/Fab';
import React, { useState } from 'react';

export default function VoteButton({ onVote, count = 0 }) {
    const [refreshCount, setRefreshCount] = useState(count);
    const handleAdd = () => {
        if (refreshCount < 4) {
            setRefreshCount(refreshCount + 0.5);
            onVote(0.5);
        }
    };

    const handleSubtract = () => {
        if (refreshCount > 0) {
            setRefreshCount(refreshCount - 0.5);
            onVote(-0.5);
        }
    };

    return (
        <div className='flex items-center gap-5'>
            <Fab size="small" style={{ backgroundColor: refreshCount === 0? '#4CAF50': '#2D8F1D', color: 'white' }} aria-label="subtract" onClick={handleSubtract} disabled={refreshCount === 0}>-</Fab>
            <label className='text-xl w-10'>{refreshCount}</label>
            <Fab size="small" style={{ backgroundColor: refreshCount === 4? '#4CAF50': '#2D8F1D', color: 'white' }} aria-label="add" onClick={handleAdd} disabled={refreshCount === 4}>+</Fab>
        </div>
    );
}