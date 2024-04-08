import React from 'react';
import '../../styles/styles.css'
import leoteo from '../../media/leoteo.png';
import dkarlos from '../../media/dkarlos.png';
import vs from '../../media/vs.png';
import micro from '../../media/micro.png';
import uderap from '../../media/uderap.png';

// Create an object that maps names to images
const images = {
    leoteo, dkarlos, micro, uderap
  };

function Batalla(props) {
    const { mc1, mc2, pts1, pts2} = props;
    
    return (
        <div className='h-auto w-auto flex hover:scale-110 cursor-pointer flex-col'>
            <div className='flex flex-col gap-5 my-auto items-center border-2 rounded-3xl relative'>
                <div className='flex w-full'>
                    <div className='flex flex-col items-center w-1/2'>
                        <img className= "h-full w-full rounded-3xl" src={images[mc1]} alt={mc1}/>
                        <span className='text-[20px]'>{mc1}</span>
                    </div>
                    <img src={vs} alt="vs" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                    <div className='flex flex-col items-center w-1/2'>
                        <img className= "h-full w-full rounded-3xl" src={images[mc2]} alt={mc1}/>
                        <span className='text-[20px]'>{mc2}</span>
                    </div>
                </div>
            </div>
            <div className='h-full w-full flex'>
                <div className={`flex w-1/2 justify-center gap-5 my-auto py-3 border-2 rounded-3xl ${Number(pts1) > Number(pts2) ? 'border-verde' : 'border-red-500'}`}>
                    <span>{pts1}</span>
                </div>
                <div className={`flex w-1/2 justify-center gap-5 my-auto py-3 border-2 rounded-3xl ${Number(pts2) > Number(pts1) ? 'border-verde' : 'border-red-500'}`}>
                    <span>{pts2}</span>
                </div>
            </div>
        </div>
    )
}

export {Batalla};