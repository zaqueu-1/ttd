import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import React from 'react'
import './builder.css'
import { MdAddBox, MdDelete, MdEdit} from 'react-icons/md'

function Builder() {

    const [exercise, setExercise] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [weights, setWeights] = useState('')
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
            weightsNum: weights, 
            id: Date.now(),
            finished: finished,
        }
    
        if (!exercise || !sets || !reps) {
            toast.warn("Preencha todos os campos!");
            return;
        }

        setExercises([...exercises, newExercise])
        localStorage.setItem("exercises", JSON.stringify([...exercises, newExercise]));
        setExercise('')
        toast.success('Exercício adicionado!')
    }

    const [selectedExercise, setSelectedExercise] = useState({});
    const [showEditForm, setShowEditForm] = useState(false);

    const editExercise = (e, id) => {
        const selected = exercises.find(ex => ex.id === id);

        setSelectedExercise(selected);

        setExercise(selected.exerciseName)
        setReps(selected.repsNum)
        setSets(selected.setsNum)
        setWeights(selected.weightsNum)

        setShowEditForm(true);
    };
    
    const updateExercise = (e, id) => {
        e.preventDefault();
    
        const exerciseToEdit = { exerciseName: exercise, setsNum: sets, repsNum: reps, weightsNum: weights};
        const newExercises = exercises.map(ex => ex.id === selectedExercise.id ? { ...ex, ...exerciseToEdit } : ex);
            
        localStorage.setItem('exercises', JSON.stringify(newExercises));
        setExercises(newExercises);
        clear()
        setShowEditForm(false);
        toast.success('Edições concluídas!')
    };

    const clear = () => {
        setExercise('')
        setReps('')
        setSets('')
        setWeights('')
    }
    
    
    const deleteExercise = (id) => {
        const updatedExercises = exercises.filter((ex) => ex.id !== id)
        setExercises(updatedExercises)

        localStorage.setItem("exercises", JSON.stringify(updatedExercises))
        toast.error('Exercício deletado!')
    }

    const [finished, setFinished] = useState(false)

    const finishedToggle = (e, id) => {
        const newExercises = [...exercises];
        const exerciseToEdit = newExercises.find((ex) => ex.id === id)
        exerciseToEdit.finished = e.target.checked;

        localStorage.setItem('exercises', JSON.stringify(newExercises))
        setExercises(newExercises);
    }

    const [listName, setListName] = useState('')
    const [listArray, setListArray] = useState(() => {
        const storedListArray = localStorage.getItem("listArray");
        return storedListArray ? JSON.parse(storedListArray) : [];
      });

    useEffect(() => console.log('after first render'), [listArray.length]);

    const handleSave = (e) => {
        e.preventDefault()

        if (listName.length>0 && listName.trim('') !== '') {
            let newList = {
                name: listName,
                exercises: exercises,
                id: Date.now(),
            } 
            listArray.push(newList)
            toast.success('Treino salvo com sucesso!')
            localStorage.setItem("listArray", JSON.stringify(listArray));
            setListName('')
        } else if (listName.trim('') === '') {
            toast.warn('Digite um nome para o treino!')
        }
    }

    const [selectedList, setSelectedList] = useState('')

    const handleSelectedList = (e) => {
        let newSelectedList = e.target.value

        setSelectedList(newSelectedList)
        const filteredList = listArray.filter((list) => list.id === +newSelectedList)

        setExercises(filteredList[0].exercises)
        toast.success('Treino carregado!')
    }

    const deleteList = (e) => {
        const updatedListArray = listArray.filter((list) => list.id !== selectedList)
        console.log(selectedList)
        console.log(updatedListArray)
        setListArray(updatedListArray)

        localStorage.setItem("listArray", JSON.stringify(updatedListArray))
        toast.error('Treino deletado!')
    }

  return (
    <div>
    {showEditForm ? (
        <div>
            <form
                className="inputs-container" 
                onSubmit={updateExercise}>
                <input className='exercise-input' 
                        type="text"
                        placeholder='Nome do exercício' 
                        maxLength='40'
                        required
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)} />
                <div className='sets-reps-container'>
                        <input className='sets-input'
                                type="number"
                                placeholder='séries'
                                min='1'
                                max='99'
                                required
                                value={sets}
                                onChange={(e) => setSets(e.target.value)} />
                        <input className='reps-input' 
                                type="number"
                                placeholder='repetições'
                                min='1'
                                max='99'
                                required
                                value={reps}
                                onChange={(e) => setReps(e.target.value)} />
                            <input className='reps-input' 
                                    type="number"
                                    placeholder='carga'
                                    min='1'
                                    max='999'
                                    required
                                    value={weights}
                                    onChange={(e) => setWeights(e.target.value)} />
                                <button className='update-btn' type="submit">Atualizar</button>
                                 <button className='cancel-btn' onClick={() => showEditForm(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    ) : (
        <div>
            <form 
                className="inputs-container" 
                onSubmit={handleSubmit}>
                <input className='exercise-input' 
                        type="text" 
                        placeholder='Digite o nome do exercício' 
                        name='exercise'
                        maxLength='40'
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)} />
                <div className='sets-reps-container'>
                        <input className='sets-input' 
                                type='number' 
                                placeholder='séries'
                                min='1'
                                max='99'
                                name='sets'
                                value={sets} 
                                onChange={(e) => setSets(e.target.value)} />
                        <input className='reps-input' 
                                type='number' 
                                placeholder='repetições'
                                min='1'
                                max='99'
                                value={reps} 
                                onChange={(e) => setReps(e.target.value)} />
                        <input className='reps-input' 
                                type='number' 
                                placeholder='carga'
                                min='1'
                                max='999'
                                name='weights'
                                value={weights} 
                                onChange={(e) => setWeights(e.target.value)} />
                        <button className='submit-btn' type="submit" ><MdAddBox /></button>
                </div>
            </form>
        </div>)}

        <div className="preview-container">
                {exercises && (exercises.map((ex) => (
                <div className='exercise-list' key={ex.id}>
                    <div className={showEditForm ? 'exercise selected' :
                                    ex.finished ? 'exercise finished' :
                                    'exercise'} >
                        <input  className='input-checkbox' onChange={(e) => finishedToggle(e, ex.id)} checked={ex.finished} type='checkbox'></input>
                        <p className="exercise-name">{ex.exerciseName}</p>
                        <div className="stats">
                            <p style={ex.finished ? { backgroundColor: '#818f8950'} : {backgroundColor: '#84a78480'}} className='sets-number'>{ex.setsNum} x {ex.repsNum}</p>
                            <p style={ex.finished ? { backgroundColor: '#818f8950'} : {backgroundColor: '#84a78480'}} className='weights-number'>{ex.weightsNum}kg</p>
                        </div>
                    </div>
                    <div className="controls">
                        <button className="delete-btn" onClick={() => deleteExercise(ex.id)}><MdDelete /></button>
                        <button className="edit-btn" onClick={(e) => editExercise(e, ex.id)}><MdEdit /></button>
                    </div>
                </div>
                )))}

        <div className="save-container">
            {exercises.length>0 && (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <input className='save-input' 
                            type='text' 
                            placeholder='Nome do treino'
                            name='list'
                            maxLength='20'
                            required
                            value={listName} 
                            onChange={(e) => setListName(e.target.value)} />
                    <button className="save-btn" onClick={handleSave} type='submit'><MdAddBox /></button>
                </div>)}

        <div className="selector-container">
            {listArray.length>0 && (
                <select name="list" value={selectedList} onChange={(e) => handleSelectedList(e)} className="list-selector">
                    {(listArray.map((list) => (
                        <option value={list.id} id={list.id} className="option-name">{list.name}</option>
                    )))}
                </select>)}             
            {listArray.length>0 ? <button className="delete-btn" onClick={deleteList}><MdDelete /></button> : ''}
        </div>
        </div>
        </div>
    </div>
  )
}

export default Builder