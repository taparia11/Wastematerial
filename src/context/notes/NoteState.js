import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{

    const host = 'http://localhost:5000'
    const notesInitial = []
    const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }

    //add a Note
    const addNote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json()
        console.log(json)
        console.log("adding a new Note")
        getNotes();
        // const note = {
        //     "_id": "623cc5dd08156a2b1bs9129aa",
        //     "user": "623bbd05d0b9b6d5404fb94e",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2022-03-24T19:26:21.448Z",
        //     "__v": 0
        //   };
        // setNotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote = async (id)=>{
        
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
        console.log('deleting note with id'+ id)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
        const json = await response.json()
        console.log(json)
    }

    //edit a note
    const editNote = async (id, title, description, tag)=>{
        //API calls
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });

        const json = await response.json();
        console.log(json)
        // Logic to edit in client
        // for (let index = 0; index < notes.length; index++) {
        //     const element = notes[index];
        //     if (element._id === id) {
        //         notes[index].title=title;
        //         notes[index].description=description;
        //         notes[index].tag=tag;
        //         break;
        //     }
        // }
        getNotes();
    }

    const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;