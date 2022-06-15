import React, { useContext, useEffect, useRef, useState} from "react";
import { Modal, Button, Text, Input, Grid, Checkbox } from "@nextui-org/react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

export const Notes = (props) => {
    const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else{
            navigate('/staff')
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({id:"", etitle:"", edescription:"",etag:"",estatus:""})

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

    const acceptNote = (currentNote) => {
        // ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag,estatus:"success"})
        editNote(note.id,note.etitle,note.edescription,note.etag,note.estatus)
        props.showAlert("Cleaning Process Started","success")
        console.log(note.estatus)
    }

    const ref = useRef(null)
    const refclose = useRef(null)

    return (
        <>
            <div>
      <Button style={{display:"none"}} ref={ref} onClick={handler}>
        Open modal
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Edit&nbsp; 
            <Text b size={18}>
               Request Address
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            
            bordered
            fullWidth
            readOnly
            color="primary"
            size="lg"
            placeholder="Email"
            id="etitle" name="etitle" value={note.etitle} onChange={onChange}
          /> 
          <Input
            
          bordered
          readOnly
          fullWidth
          color="primary"
          size="lg"
          placeholder="Phone"
          id="etag" name="etag" value={note.etag} onChange={onChange}
        />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Address"
            id="edescription" name="edescription" value={note.edescription} onChange={onChange}
          />
         
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" ref={refclose} onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={handleClick}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
            
            <div className="container my-5">
            <div className="row my-3">
            <Grid.Container gap={1}>
                {notes.length===0 && "No cleaning Request to Display"}
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} acceptNote={acceptNote} note={note} />;
                })}
                </Grid.Container>
            </div>
            </div>
        </>
    );
};
