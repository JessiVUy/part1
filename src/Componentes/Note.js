import React from 'react'


const Note = ({note}) => {
  return (
    <div>
        <li>{note.id}</li>
        <li>{note.content}</li>
        <li>{note.date}</li>
    </div>
  )
}

export default Note;