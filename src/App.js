import React from 'react'
import Note from './Componentes/Note'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Componentes/Header/Header'
import noteServices from './services/notes'
//mport { getOverlappingDaysInIntervals } from 'date-fns'


const App = () => {

  const [notes, setNote] = useState([])
  const [newNote, setNewNote] = useState('')
  const [listimportant, setListImportant] = useState(true)


  useEffect(()=>{
    console.log('useEffect')
    /* ANTERIOR FORMA DE TRAR TODAS LAS NOTAS
    axios.get('http://localhost:3001/notes')
    noteServices.getAll()
    .then(response =>{
      console.log('promise')
      setNote(response.data)
    })*/
    //NUEVA FORMA
    noteServices.getAll().then(response=>{
      setNote(response.data)
    })
  },[])

  const addNote =  (event)=>{
    console.log('llegamos al add')
    //evita que se realice la accion de submit y poder controlar el evento
    // por defecto el onSubmit envia una solicitud post al servidor
    event.preventDefault()
    //genera un objeto de tipo note para luego agregarla con setNote
    const noteObj ={
      content: newNote,
      date: '2019-05-30T17:30:31.098Z',
      important: Math.random() < 0.5,
    }

    //FORMA ANTERIOR DE AGREGAR NOTAS
    /*axios.post('http://localhost:3001/notes', noteObj)
         .then(response=>{
          console.log(response)
          //setNote([...Note, response.date]) esto es igual al concat
          // al igual que concat, la linea de arriba genera un array nuevo, no modifica el estado actual
          //es un error modificar el estado de un componente, lo correcto es pasarle uno nuevo
           setNote(notes.concat(response.data))
           setNewNote('')
    })*/

    //NUEVA FORMA
    
    noteServices.create(noteObj).then(response=>{
      console.log('api')
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

  const toggleImportanceOf = id => {
    
    //nos quedamos con la nota de id igual al pasado por parametro
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    //creamos un nuevo objeto con la mismas caracteristicas, solo le cambiamos el important

    //FORMA ANTERIORRRRR
    //const url = `http://localhost:3001/notes/${id}`
    /*axios.put(url, changedNote).then(response => {
      //le pasamos por el metodo put el nuevo objeto
      setNote(notes.map(note => note.id !== id ? note : response.data))
    })*/


    noteServices.update(id, changedNote).then(response => {
      setNote(notes.map(note => note.id !== id ? note : response.data))
    })
  }

  /*const deleteNote = (id) =>{
      const url = `http://localhost:3001/notes/${id}`
      const note = notes.find(n => n.id === id)

      axios.delete(url, note).then(response=>{
        console.log('nota eliminada')
      })

  }*/


  return (
    <div className='app'>
      <Header/>
      <h1>Notes</h1>
      <ul>
        {filtroImportant.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} /*deleteNote={deleteNote(note.id)}*/ />
        ))}
      </ul>
      <button onClick={filtroXImport}>{listimportant ? 'Importantes' : 'Todos'}</button>
      <form onSubmit={ newNote !== ''? addNote : alert('La nota no puede estar vasia')}>
        <input type='text' value={newNote} onChange={handleNoteChange}/>
        <button>Agregar</button>
      </form>
    </div>
  )
}

export default App