import React from 'react'
import Note from './Componentes/Note'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Componentes/Header/Header'


const App = () => {

  const [notes, setNote] = useState([])
  const [newNote, setNewNote] = useState('')
  const [listimportant, setListImportant] = useState(true)


  useEffect(()=>{
    console.log('useEffect')
    axios.get('http://localhost:3001/notes')
    .then(response =>{
      console.log('promise')
      setNote(response.data)
    })
  },[])

  const addNote = (event)=>{
    //evita que se realice la accion de submit y poder controlar el evento
    event.preventDefault()
    //genera un objeto de tipo note para luego agregarla con setNote
    const noteObj ={
      content: newNote,
      date: '2019-05-30T17:30:31.098Z',
      important: Math.random() < 0.5,
    }

    axios.post('http://localhost:3001/notes', noteObj)
         .then(response=>{
          console.log(response)
           setNote(notes.concat(response.data))
           setNewNote('')
         })
    //con concat creamos una nueva matriz
    //setNote(notes.concat(noteObj))
    //limpia el input
    //setNewNote('')
    //console.log('new note' , event.target)
  }

  const handleNoteChange = (event)=>{
    setNewNote(event.target.value)
    console.log("nueva nota",event.target.value)
  }

  const filtroXImport = () => {
    setListImportant(!listimportant)
  }

  //guarda una lista con las notas, dependiendo si es true o false
  const filtroImportant = listimportant? notes : notes.filter(note => note.important)



  return (
    <div>
      <Header/>
      <h1>Notes</h1>
      <ul>
        {filtroImportant.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <button onClick={filtroXImport}>{listimportant ? 'Importantes' : 'Todos'}</button>
      <form onSubmit={addNote}>
        <input type='text' value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>Agregar</button>
      </form>
    </div>
  )
}

export default App