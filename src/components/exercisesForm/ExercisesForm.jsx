import { useState } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import React from "react"
import "./exercisesForm.css"
import "animate.css"
import { MdAddBox, MdDelete, MdEdit } from "react-icons/md"
import SaveModal from "../saveModal/SaveModal"
import NoExercises from "../noExercises/NoExercises"
import SaveControls from "../saveControls/SaveControls"
import * as XLSX from "xlsx"

function ExercisesForm() {
  const { t } = useTranslation()

  const initialExercise = {
    exerciseName: "",
    setsNum: "",
    repsNum: "",
    weightsNum: "",
    finished: false,
    id: Date.now(),
  }

  const [exerciseForm, setExerciseForm] = useState(initialExercise)
  const [exercises, setExercises] = useState(() => {
    const storedExercises = localStorage.getItem("exercises")
    return storedExercises ? JSON.parse(storedExercises) : []
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !exerciseForm.exerciseName ||
      !exerciseForm.setsNum ||
      !exerciseForm.repsNum
    ) {
      toast.warn(t("messages.fillFields"))
      return
    }

    const newExercise = {
      ...exerciseForm,
      id: Date.now(),
    }

    setExercises([...exercises, newExercise])
    localStorage.setItem(
      "exercises",
      JSON.stringify([...exercises, newExercise]),
    )
    setExerciseForm(initialExercise)
    toast.success(t("messages.exerciseAdded"))
  }

  const [selectedExercise, setSelectedExercise] = useState({})
  const [showEditForm, setShowEditForm] = useState(false)

  const editExercise = (e, id) => {
    const selected = exercises.find((ex) => ex.id === id)
    setSelectedExercise(selected)
    setExerciseForm(selected)
    setShowEditForm(true)
  }

  const updateExercise = (e, id) => {
    e.preventDefault()

    const newExercises = exercises.map((ex) =>
      ex.id === selectedExercise.id ? { ...ex, ...exerciseForm } : ex,
    )

    localStorage.setItem("exercises", JSON.stringify(newExercises))
    setExercises(newExercises)
    clear()
    setShowEditForm(false)
    toast.success(t("messages.exerciseUpdated"))
  }

  const clear = () => {
    setExerciseForm(initialExercise)
  }

  const deleteExercise = (e, id) => {
    const updatedExercises = exercises.filter((ex) => ex.id !== id)

    setExercises(updatedExercises)
    localStorage.setItem("exercises", JSON.stringify(updatedExercises))
    toast.error(t("messages.exerciseDeleted"))

    if (exercises.length === 1) {
      clear()
      localStorage.setItem("exercises", JSON.stringify([]))
    }
  }

  const finishedToggle = (e, id) => {
    const newExercises = [...exercises]
    const exerciseToEdit = newExercises.find((ex) => ex.id === id)
    exerciseToEdit.finished = e.target.checked

    localStorage.setItem("exercises", JSON.stringify(newExercises))
    setExercises(newExercises)
  }

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  const loadExercises = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".xlsx"

    input.onchange = function () {
      const file = input.files[0]
      const reader = new FileReader()

      reader.onload = function (e) {
        try {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: "array" })

          const worksheet = workbook.Sheets[workbook.SheetNames[0]]

          const jsonData = XLSX.utils.sheet_to_json(worksheet)

          const exercisesData = jsonData.map((row) => ({
            exerciseName: row["Exercício"],
            setsNum: row["Séries"].toString(),
            repsNum: row["Reps"].toString(),
            weightsNum: row["Carga (kg)"].toString(),
            finished: false,
            id: Date.now() + Math.random(),
          }))

          setExercises(exercisesData)
          localStorage.setItem("exercises", JSON.stringify(exercisesData))
          toast.success(t("messages.workoutLoaded"))
        } catch (error) {
          toast.error(t("messages.loadError"))
          console.error("Erro ao carregar arquivo:", error)
        }
      }

      reader.readAsArrayBuffer(file)
    }

    input.click()
  }

  const clearList = () => {
    clear()
    setExercises([])
    localStorage.setItem("exercises", JSON.stringify([]))
    toast.error(t("messages.listCleared"))
  }

  return (
    <div className='form-wrapper'>
      {showEditForm ? (
        <form className='inputs-container' onSubmit={updateExercise}>
          <input
            className='exercise-input'
            type='text'
            placeholder={t("exercise.name")}
            maxLength='40'
            required
            value={exerciseForm.exerciseName}
            onChange={(e) =>
              setExerciseForm({
                ...exerciseForm,
                exerciseName: e.target.value,
              })
            }
          />
          <div className='sets-reps-container'>
            <input
              className='sets-input'
              type='number'
              placeholder={t("exercise.sets")}
              min='1'
              max='99'
              required
              value={exerciseForm.setsNum}
              onChange={(e) =>
                setExerciseForm({ ...exerciseForm, setsNum: e.target.value })
              }
            />
            <input
              className='reps-input'
              type='number'
              placeholder={t("exercise.reps")}
              min='1'
              max='99'
              required
              value={exerciseForm.repsNum}
              onChange={(e) =>
                setExerciseForm({ ...exerciseForm, repsNum: e.target.value })
              }
            />
            <input
              className='reps-input'
              type='number'
              placeholder={t("exercise.weight")}
              min='1'
              max='999'
              required
              value={exerciseForm.weightsNum}
              onChange={(e) =>
                setExerciseForm({
                  ...exerciseForm,
                  weightsNum: e.target.value,
                })
              }
            />
            <button className='update-btn' type='submit'>
              {t("actions.update")}
            </button>
            <button
              className='cancelUpdate-btn'
              onClick={() => setShowEditForm(false)}
            >
              {t("actions.cancel")}
            </button>
          </div>
        </form>
      ) : (
        <form className='inputs-container' onSubmit={handleSubmit}>
          <input
            className='exercise-input'
            type='text'
            placeholder={t("exercise.name")}
            name='exercise'
            maxLength='40'
            value={exerciseForm.exerciseName}
            onChange={(e) =>
              setExerciseForm({
                ...exerciseForm,
                exerciseName: e.target.value,
              })
            }
          />
          <div className='sets-reps-container'>
            <input
              className='sets-input'
              type='number'
              placeholder={t("exercise.sets")}
              min='1'
              max='99'
              name='sets'
              value={exerciseForm.setsNum}
              onChange={(e) =>
                setExerciseForm({ ...exerciseForm, setsNum: e.target.value })
              }
            />
            <input
              className='reps-input'
              type='number'
              placeholder={t("exercise.reps")}
              min='1'
              max='99'
              value={exerciseForm.repsNum}
              onChange={(e) =>
                setExerciseForm({ ...exerciseForm, repsNum: e.target.value })
              }
            />
            <input
              className='reps-input'
              type='number'
              placeholder={t("exercise.weight")}
              min='1'
              max='999'
              name='weights'
              value={exerciseForm.weightsNum}
              onChange={(e) =>
                setExerciseForm({
                  ...exerciseForm,
                  weightsNum: e.target.value,
                })
              }
            />
            <button className='submit-btn' type='submit'>
              <MdAddBox />
            </button>
          </div>
        </form>
      )}

      <div className='preview-container animate__animated animate__fadeInUp'>
        <div className='exercise-wrapper'>
          {exercises &&
            exercises.map((ex) => (
              <div className='exercise-line' key={ex.id}>
                <div
                  className={
                    showEditForm
                      ? "exercise selected"
                      : ex.finished
                      ? "exercise finished"
                      : "exercise"
                  }
                >
                  <input
                    className='input-checkbox'
                    onChange={(e) => finishedToggle(e, ex.id)}
                    checked={ex.finished}
                    type='checkbox'
                  ></input>
                  <p
                    className='exercise-name'
                    style={
                      ex.finished ? { textDecoration: "line-through" } : null
                    }
                  >
                    {ex.exerciseName}
                  </p>
                  <div className='stats'>
                    <p className='sets-number'>
                      {ex.setsNum}x{ex.repsNum}
                    </p>
                    <p className='weights-number'>{ex.weightsNum}kg</p>
                  </div>
                </div>
                <div className='controls'>
                  <button
                    className='edit-btn'
                    onClick={(e) => editExercise(e, ex.id)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className='delete-btn'
                    onClick={(e) => deleteExercise(e, ex.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {exercises.length > 0 && (
          <SaveControls
            loadExercises={loadExercises}
            clearList={clearList}
            setIsSaveModalOpen={setIsSaveModalOpen}
          />
        )}

        {exercises.length === 0 && (
          <NoExercises loadExercises={loadExercises} />
        )}
      </div>

      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        exercises={exercises}
      />
    </div>
  )
}

export default ExercisesForm
