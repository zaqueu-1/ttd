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
    
    
    const deleteExercise = (e, id) => {
        const updatedExercises = exercises.filter((ex) => ex.id !== id)

        setExercises(updatedExercises)
        localStorage.setItem("exercises", JSON.stringify(updatedExercises))
        toast.error('Exercício deletado!')

        if (exercises.length===1) {
            clear()
            localStorage.setItem("exercises", JSON.stringify([]))
            toast.error('Exercício deletado!')
        }
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

    useEffect(() => console.log('opa'), [exercises]);

    const downloadExercises = () => {
        if (listName.length>0 && listName.trim('') !== '') {
            const data = JSON.stringify(exercises);
            const blob = new Blob([data], { type: 'application/json' });
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = `${listName}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setListName('')
            toast.success('Treino baixado com sucesso!')
        } else if (listName.trim('') === '') {
            toast.warn('Digite um nome para o treino!')
        }
      };

      const loadExercises = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
      
        input.onchange = function () {
          const file = input.files[0];
          const reader = new FileReader();
          reader.readAsText(file);
      
          reader.onload = function () {
            const exercises = JSON.parse(reader.result);
            setExercises(exercises);
            localStorage.setItem('exercises', JSON.stringify(exercises))
            toast.success('Treino carregado com sucesso!')
          };
        };
      
        input.click();
      };

      const clearList = () => {
        clear()
        setExercises([])
        localStorage.setItem("exercises", JSON.stringify([]))
        toast.error('Lista de exercícios apagada!')
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
                                placeholder='Séries'
                                min='1'
                                max='99'
                                name='sets'
                                value={sets} 
                                onChange={(e) => setSets(e.target.value)} />
                        <input className='reps-input' 
                                type='number' 
                                placeholder='Repetições'
                                min='1'
                                max='99'
                                value={reps} 
                                onChange={(e) => setReps(e.target.value)} />
                        <input className='reps-input' 
                                type='number' 
                                placeholder='Carga'
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
                            <p className='sets-number'>{ex.setsNum}x{ex.repsNum}</p>
                            <p className='weights-number'>{ex.weightsNum}kg</p>
                        </div>
                    </div>
                    <div className="controls">
                        <button className="delete-btn" onClick={(e) => deleteExercise(e, ex.id)}><MdDelete /></button>
                        <button className="edit-btn" onClick={(e) => editExercise(e, ex.id)}><MdEdit /></button>
                    </div>
                </div>
                )))}

        <div className="save-container">
            {exercises.length>0 && (
                <>
                    <input className='save-input' 
                            type='text' 
                            placeholder='Nome do treino'
                            name='list'
                            maxLength='20'
                            required
                            value={listName} 
                            onChange={(e) => setListName(e.target.value)} />
                    <div className="save-controls">
                        <button className='download-btn' onClick={downloadExercises}>Baixar</button>
                        <button className='load-btn' onClick={loadExercises}>Carregar</button>
                        <button className='clear-btn' onClick={clearList}>Limpar lista</button>
                    </div>
                </>
                )}
        </div>
        <>
        {exercises.length<=0 && (
                <div className="no-exercises">
                    <div className="text-message">
                        <p>Parece que você ainda não adicionou um exercício...</p><br/>
                        <p>Se já tiver um treino salvo, pode carregá-lo abaixo: </p>
                    </div>
                    <div className="save-controls">
                        <button className='load-btn' onClick={loadExercises}>Carregar</button>
                    </div>
                </div>
            )}
        </>
    </div>
    </div>
  )
}

export default Builder