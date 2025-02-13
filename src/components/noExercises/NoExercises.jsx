import React from 'react'
import { MdUploadFile } from "react-icons/md"

function NoExercises({ loadExercises }) {
  return (
    <div className='no-exercises animate__animated animate__fadeInUp'>
        <div className='text-message'>
            <p>🏋️ Parece que você ainda não adicionou um exercício...</p>
            <br />
            <p>Se já tiver um treino salvo, pode carregá-lo abaixo: </p>
        </div>
        <button className='load-btn' onClick={loadExercises}>
            <MdUploadFile />
            Carregar
        </button>
    </div>

  )
}

export default NoExercises
