import React, { useContext, useEffect, useRef, useState} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

export const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({id:"", etitle:"", edescription:"",etag:""})

    const handleClick = (e)=>{
        console.log(note);
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refclose.current.click();
        props.showAlert("Updated Successfully","success")
        // e.preventDefault();
    }
    const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value })
  }
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
        
    }

    const ref = useRef(null)
    const refclose = useRef(null)

    return (
        <>
            <Addnote showAlert={props.showAlert} />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='container'>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label"> Title </label>
                                        <input type="email" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label"> Description </label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label"> Tag </label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-5">
            <div className="row my-3">
                {notes.length===0 && "No Notes to Display"}
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
                })}
            </div>
            </div>
        </>
    );
};
