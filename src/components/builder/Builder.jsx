import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import React from 'react'
import './builder.css'
import { MdAddBox } from 'react-icons/md'

function Builder() {

    const [exercise, setExercise] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [exercises, setExercises] = useState(() => {
        const storedExercises = localStorage.getItem("exercises");
        return storedExercises ? JSON.parse(storedExercises) : [];
      });

    const handleSubmit = (e) => {
        e.preventDefault();

        let newExercise = {
            exerciseName: exercise,
            setsNum: sets,
            repsNum: reps,
            key: Date.now(),
        }
    
        if (!exercise || !sets || !reps) {
            toast.warn("Preencha todos os campos!");
            return;
        }

        setExercises([...exercises, newExercise])
        localStorage.setItem("exercises", JSON.stringify([...exercises, newExercise]));
    }

    const [selectedExercise, setSelectedExercise] = useState({});
    const [showEditForm, setShowEditForm] = useState(false);

    const editExercise = (key) => {
        const selected = exercises[key];

        setSelectedExercise(selected);
        setShowEditForm(true);
    };
    
    const updateExercise = (e) => {
        e.preventDefault();

        const exerciseToEdit = { exerciseName: exercise, setsNum: sets, repsNum: reps };
        const newExercises = [...exercises];
        
        newExercises[exercises.indexOf(selectedExercise)] = exerciseToEdit;

        localStorage.setItem('exercises', JSON.stringify(newExercises));
        setExercises(newExercises);
        setShowEditForm(false);
    };
    
    const deleteExercise = (key) => {
        const selected = exercises[key];
        setSelectedExercise(selected);

        const updatedExercises = exercises.filter((e) => e.key !== key)
        setExercises(updatedExercises)
        localStorage.setItem("exercises", JSON.stringify(updatedExercises))
    }
      
  return (
    <div>
        {showEditForm ? (
        <div className="inputs-container">
      <form onSubmit={updateExercise}>
        <input className='exercise-input' 
          type="text"
          required
          value={exercise}
          onChange={(e) => setExercise(e.target.value)} />
        <input className='sets-input'
          type="number"
          min='1'
          required
          value={sets}
          onChange={(e) => setSets(e.target.value)} />
        <input className='reps-input' 
          type="number"
          min='1'
          required
          value={reps}
          onChange={(e) => setReps(e.target.value)} />
        <button className='update-btn' type="submit">Update</button>
      </form>
      </div>
    ) : (
        <div>
            <form className="inputs-container" onSubmit={handleSubmit}>
                <input className='exercise-input' 
                        type="text" 
                        placeholder='Busque um exercício' 
                        name='exercise'
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)} />
                <div className='sets-reps-container'>
                    <input className='sets-input' 
                            type='number' 
                            placeholder='4 séries'
                            min='1'
                            name='sets'
                            value={sets} 
                            onChange={(e) => setSets(e.target.value)} />
                    <input className='reps-input' 
                            type='number' 
                            placeholder='12 repetições'
                            min='1'
                            name='reps'
                            value={reps} 
                            onChange={(e) => setReps(e.target.value)} />
                    <button className='submit-btn' type="submit" ><MdAddBox /></button>
                </div>
            </form>
        </div>)}

        <div className="preview-container">
            <p className="workout-name">A</p>

                {exercises.map((e, key) => (
                <div className="exercise" key={key}>
                    <p className="exercise-name">{e.exerciseName}</p>
                    <p className="sets-number">{e.setsNum} Séries</p>
                    <p className="reps-number">{e.repsNum} Reps</p>
                    <button className="delete-btn" onClick={() => deleteExercise(key)}>X</button>
                    <button className="edit-btn" onClick={() => editExercise(key)}>Edit</button>
                </div>
                ))}

        </div>
    </div>
  )
}

export default Builder