import React, { useState } from "react"
import { toast } from "react-toastify"
import "./saveModal.css"
import * as XLSX from "xlsx"

function SaveModal({ isOpen, onClose, exercises }) {
  const [listName, setListName] = useState("")

  const downloadExercises = () => {
    if (listName.length > 0 && listName.trim("") !== "") {
      // Preparar os dados para o Excel
      const workbookData = exercises.map((exercise) => ({
        "Exercício": exercise.exerciseName,
        "Séries": exercise.setsNum,
        "Reps": exercise.repsNum,
        "Carga (kg)": exercise.weightsNum,
      }))

      // Criar uma nova planilha
      const worksheet = XLSX.utils.json_to_sheet(workbookData)
      const workbook = XLSX.utils.book_new()

      // Ajustar a largura das colunas
      const columnWidths = [
        { wch: 30 }, // Exercício
        { wch: 10 }, // Séries
        { wch: 10 }, // Reps
        { wch: 12 }, // Carga
      ]
      worksheet["!cols"] = columnWidths

      // Adicionar a planilha ao workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Treino")

      // Gerar e baixar o arquivo
      XLSX.writeFile(workbook, `${listName}.xlsx`)

      setListName("")
      toast.success("Treino exportado com sucesso!")
      onClose()
    } else if (listName.trim("") === "") {
      toast.warn("Digite um nome para o treino!")
    }
  }

  if (!isOpen) return null

  return (
    <div className='modal-overlay'>
      <div className='modal-content animate__animated animate__fadeInUp'>
        <h2>Exportar Treino</h2>
        <input
          className='save-input'
          type='text'
          placeholder='Nome do treino'
          maxLength='20'
          required
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <div className='modal-buttons'>
          <button className='export-btn' onClick={downloadExercises}>
            Exportar
          </button>
          <button className='cancel-btn' onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SaveModal
