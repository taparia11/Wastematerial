import React, { useContext} from 'react'
import { Link } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";


const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
  const { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className="card text-center" >
            <h5 className="card-header">{note.tag}</h5>
                    <div className="card-body my-3">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <Link to="#" className="btn btn-danger mx-2" onClick={()=>{deleteNote(note._id);  props.showAlert("Deleted successfully","success")}}>Delete Note </Link>
                        <Link to="#" className="btn btn-success" onClick={()=>{updateNote(note)}}>Update Note</Link>
                    </div>
            </div>
            <div className="card-footer text-muted text-center">
    {note.date.substring(0,10)}
  </div>
        </div>
    )
}

export default Noteitem