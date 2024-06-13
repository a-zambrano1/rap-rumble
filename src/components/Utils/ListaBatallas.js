import React from 'react';
import { Batalla } from '../Utils/Batalla';

const ListaBatallas = ({ votes, idx, handleModal }) => {
  // Check if votes[idx] is an array before mapping
  const content = Array.isArray(votes[idx]) ? votes[idx].map((vote, index) => {
    console.log("oelo aqui estoy");
    return (
      <Batalla
        key={index}
        mc1={vote ? vote.mc1 : ''}
        mc2={vote ? vote.mc2 : ''}
        pts1={vote ? vote.totalScoreMC1 : 0}
        pts2={vote ? vote.totalScoreMC2 : 0}
        winner={vote ? vote.winner : ''}
        clicked={() => handleModal({
          mc1: vote ? vote.mc1 : '', 
          mc2: vote ? vote.mc2 : '', 
          pts1: vote ? vote.totalScoreMC1 : 0, 
          pts2: vote ? vote.totalScoreMC2 : 0,
          winner: vote ? vote.winner : ''
        })}
      />
    );
  }) : <div>Loading...</div>; // Or any other placeholder you prefer

  return [content];
};

export default ListaBatallas;