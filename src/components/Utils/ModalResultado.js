import React, { useState, useEffect } from 'react';
import { getBattleVotesApi } from '../../Services/APIS/GetBattleVotes'

const ModalResult = ({ isOpen, onCancel, batallaData }) => {
    const [votes, setVotes] = useState([])

    const handleOuterClick = (e) => {
        if (e.target === e.currentTarget) {
        onCancel();
        }
    }

    const GetBattleVotes = async (competition, idMC1, idMC2) => {
        try {
            let result = await getBattleVotesApi(competition, idMC1, idMC2)
            return result }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const fetchVotos = async () => {
            if (!batallaData) {
                return
            }
            const result = await GetBattleVotes("1", batallaData.mc1, batallaData.mc2)
            setVotes(result)
            console.log(result)
            console.log("chi")
        }
        fetchVotos()
        console.log("cha")
    }, [batallaData])

    if (!isOpen) {
        return null;
    }

    return (
    <div onClick={handleOuterClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '3em', maxWidth: '90%', maxHeight: '90%', overflow: 'auto', borderRadius: '10%' }}>
        <div className='flex flex-col items-center gap-7 w-full text-[25px] text-[#3d405b]'>
            <div className='flex flex-col w-full gap-5'>
                <h1 className='text-4xl'>Votaciones de los jueces</h1>
                {batallaData && (
                <div className="flex flex-col w-full items-center">
                    {votes.map((vote, index) => {
                    return (
                        <div key={index} className='flex flex-col w-full '>
                        <h1 className='text-3xl text-center'>Juez # {index + 1}</h1>
                        <div className='flex justify-between mx-10  p-3'>
                            <span className="text-3xl">{votes[index].scoreMC1}</span>
                            <span className="text-3xl">{votes[index].scoreMC2}</span>
                        </div>
                        < hr className='w-full border-2 m-2' />
                        </div>
                    );
                    } )}
                </div>
                )}
                <div className='flex flex-col w-full gap-5'>
                    <h1 className='text-3xl text-center'>Resultado Total</h1>
                    <div className='flex justify-between mx-10 p-1'>
                        <span className="text-3xl">{batallaData.pts1}</span>
                        <span className="text-3xl">{batallaData.pts2}</span>
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-around'>
                <button onClick={onCancel} className='bg-verdesito hover:bg-verde text-white p-3 rounded-xl'>Cerrar</button>
            </div>
        </div>
        </div>
    </div>
    );
}

export default ModalResult