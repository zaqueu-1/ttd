import React, { useState } from "react"
import { MdUploadFile, MdDelete, MdSave, MdShare } from "react-icons/md"
import { FaGear } from "react-icons/fa6"
import "./saveControls.css"
import { useTranslation } from "react-i18next"

function SaveControls({
  setIsSaveModalOpen,
  loadExercises,
  clearList,
  generateShareableUrl,
}) {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='controls-container'>
      <button className='options-btn' onClick={toggleMenu}>
        <FaGear /> {t("actions.options")}
      </button>
      <div className={`save-controls ${isMenuOpen ? "show" : ""}`}>
        <button className='save-btn' onClick={() => setIsSaveModalOpen(true)}>
          <MdSave /> {t("actions.save")}
        </button>
        <button className='loadExcel-btn' onClick={loadExercises}>
          <MdUploadFile /> {t("actions.load")}
        </button>
        <button className='share-btn' onClick={generateShareableUrl}>
          <MdShare /> {t("actions.share")}
        </button>
        <button className='clear-btn' onClick={clearList}>
          <MdDelete /> {t("actions.clear")}
        </button>
      </div>
    </div>
  )
}

export default SaveControls
