import React from "react"
import { useTranslation } from "react-i18next"
import { MdUploadFile } from "react-icons/md"
function NoExercises({ loadExercises }) {
  const { t } = useTranslation()

  return (
    <div className='no-exercises'>
      <div className='text-message'>
        <p>{t("noExercises.message")}</p>
        <br />
        <p>{t("noExercises.submessage")}</p>
      </div>
      <div className='save-controls'>
        <button className='load-btn' onClick={loadExercises}>
          <MdUploadFile /> {t("actions.load")}
        </button>
      </div>
    </div>
  )
}

export default NoExercises
