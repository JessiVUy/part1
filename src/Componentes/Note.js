import React from 'react'


const Note = ({note , toggleImportance }) => {
    const estadoNote = note.important ? 'not important' : 'important'

  return (
    <div>
        <li>
            {note.id}
            {note.content}
            {note.date}
            <button onClick={toggleImportance}>{estadoNote}</button>
        </li>
    </div>
  )
}

export default Note;