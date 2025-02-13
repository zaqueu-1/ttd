import React, { useState } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import "./saveModal.css"
import * as XLSX from "xlsx"

function SaveModal({ isOpen, onClose, exercises }) {
  const { t } = useTranslation()
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
      toast.success(t("modal.export.success"))
      onClose()
    } else if (listName.trim("") === "") {
      toast.warn(t("modal.export.error"))
    }
  }

  if (!isOpen) return null

  return (
    <div className='modal-overlay'>
      <div className='modal-content animate__animated animate__fadeInUp'>
        <h2>{t("modal.export.title")}</h2>
        <input
          className='save-input'
          type='text'
          placeholder={t("modal.export.placeholder")}
          maxLength='20'
          required
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <div className='modal-buttons'>
          <button className='export-btn' onClick={downloadExercises}>
            {t("actions.export")}
          </button>
          <button className='cancel-btn' onClick={onClose}>
            {t("actions.cancel")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SaveModal
