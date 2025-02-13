import React from "react"
import { MdUploadFile, MdDelete, MdSave } from "react-icons/md"
import "./saveControls.css"
import { useTranslation } from "react-i18next"

function SaveControls({ setIsSaveModalOpen, loadExercises, clearList }) {
  const { t } = useTranslation()

  return (
    <div className='save-controls'>
      <button className='save-btn' onClick={() => setIsSaveModalOpen(true)}>
        <MdSave /> {t("actions.save")}
      </button>
      <button className='loadExcel-btn' onClick={loadExercises}>
        <MdUploadFile /> {t("actions.load")}
      </button>
      <button className='clear-btn' onClick={clearList}>
        <MdDelete /> {t("actions.clear")}
      </button>
    </div>
  )
}

export default SaveControls
