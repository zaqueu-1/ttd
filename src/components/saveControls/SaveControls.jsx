import React, { useState, useEffect } from "react"
import { MdUploadFile, MdDelete, MdSave, MdShare } from "react-icons/md"
import { FaGear, FaDumbbell } from "react-icons/fa6"
import "./saveControls.css"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

function SaveControls({
  setIsSaveModalOpen,
  loadExercises,
  clearList,
  generateShareableUrl,
  setExercises,
}) {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWorkoutsOpen, setIsWorkoutsOpen] = useState(false)
  const [savedWorkouts, setSavedWorkouts] = useState([])

  useEffect(() => {
    const workouts = JSON.parse(localStorage.getItem("savedWorkouts") || "[]")
    setSavedWorkouts(workouts)
  }, [isWorkoutsOpen]) // Atualiza quando o menu de treinos é aberto

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isWorkoutsOpen) setIsWorkoutsOpen(false)
  }

  const toggleWorkouts = () => {
    setIsWorkoutsOpen(!isWorkoutsOpen)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const loadSavedWorkout = (workout) => {
    setExercises(workout.exercises)
    localStorage.setItem("exercises", JSON.stringify(workout.exercises))
    toast.success(t("messages.workoutLoaded"))
    setIsWorkoutsOpen(false)
  }

  const deleteSavedWorkout = (workoutName, e) => {
    e.stopPropagation()
    const updatedWorkouts = savedWorkouts.filter((w) => w.name !== workoutName)
    localStorage.setItem("savedWorkouts", JSON.stringify(updatedWorkouts))
    setSavedWorkouts(updatedWorkouts)
    toast.success(t("messages.workoutDeleted"))
  }

  return (
    <div className='controls-container'>
      <div className='controls-buttons'>
        <button
          className='options-btn'
          style={isMenuOpen ? { opacity: "0.5" } : null}
          onClick={toggleMenu}
        >
          <FaGear /> {t("actions.options")}
        </button>
        <button
          className='workouts-btn'
          style={isWorkoutsOpen ? { opacity: "0.5" } : null}
          onClick={toggleWorkouts}
        >
          <FaDumbbell /> {t("actions.myWorkouts")}
        </button>
      </div>

      <div className={`save-controls options-menu ${isMenuOpen ? "show" : ""}`}>
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

      <div
        className={`save-controls workouts-menu ${
          isWorkoutsOpen ? "show" : ""
        }`}
      >
        {savedWorkouts.length > 0 ? (
          <div className='saved-workouts'>
            {savedWorkouts.map((workout) => (
              <div
                key={workout.name}
                className='saved-workout-item'
                onClick={() => loadSavedWorkout(workout)}
              >
                <span>{workout.name}</span>
                <button
                  className='delete-saved-btn'
                  onClick={(e) => deleteSavedWorkout(workout.name, e)}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className='no-workouts'>
            <p>{t("quickAccess.empty")}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SaveControls
