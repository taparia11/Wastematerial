import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { Container, Card, Row, Text } from "@nextui-org/react";
import { Input, Spacer,Button } from "@nextui-org/react";


const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title:"", description:"",tag:""})
  const handleClick = (e)=>{
      e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note created successfully","success")
    setNote({title:"", description:"",tag:""})
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value })
}

  return (
    <>
            <Spacer y={1} />
    <Container xl>
      <Card css={{ $$cardColor: '$colors$accents5' }}>
        <Card.Body>
          <Row justify="center" align="center">
            <Text h6 size={50} color="white" css={{ m: 50 }}>
      <Input
        clearable
        bordered
        size="xl"
        labelPlaceholder="Name"
        id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required
        initialValue=""
      />
      <Spacer y={1.5} />
      <Input
        clearable
        bordered
        size="xl"
        labelPlaceholder="Mobile"
        id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required
        initialValue=""
      />
      <Spacer y={1.5} />
      <Input
        clearable
        bordered
        size="xl"
        labelPlaceholder="Address"
        id="description" name="description" value={note.description} onChange={onChange} minLength={5} required
        initialValue=""
      />
      <Spacer y={1.5} />
      <Button shadow style={{left:"25%"}} size="xl" color="gradient" auto disabled={note.title.length<5 || note.description.length<5} onClick={handleClick}>
          Submit
        </Button>
            </Text>
          </Row>
          <Spacer y={10} />
        </Card.Body>
      </Card>
    </Container>
      
    </>
  );
};

export default Addnote;
