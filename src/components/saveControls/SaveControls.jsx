import React from 'react'
import { MdUploadFile, MdDelete, MdSave } from "react-icons/md"
import './saveControls.css'

function SaveControls({ setIsSaveModalOpen, loadExercises, clearList }) {
  return (
    <div className='save-controls'>
        <button
            className='save-btn'
            onClick={() => setIsSaveModalOpen(true)}
        >
            <MdSave /> Exportar
        </button>
        <button className='load-btn' onClick={loadExercises}>
            <MdUploadFile /> Carregar
        </button>
        <button className='clear-btn' onClick={clearList}>
            <MdDelete /> Limpar
        </button>
    </div>
  )
}

export default SaveControls
