import React, { useContext} from 'react'
import { Card, Grid, Text, Button, Tooltip, Row } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";


const Noteitem = (props) => {
    const { note, updateNote, acceptNote } = props;
    const context = useContext(noteContext);
  const { deleteNote } = context;
    return (
        <>
        <Grid xs={4}>
      <Grid  md={10}>
        <Card css={{ mw: "330px" }}>
        {note.status==='warning'?<Button flat auto color="warning">Pending</Button> : <Button flat auto color="success">Completed</Button>}
          {/* <Card.Divider /> */}
          <Card.Header>
          <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
            {note.title}
            
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: "$accents8" }}>Phone No. - {note.tag}</Text>
          </Grid>
        </Grid.Container>
                  </Card.Header>
          <Card.Divider />
          <Card.Body css={{ py: "$10" }}>
            <Text>
            <strong>Address :-&nbsp;&nbsp;</strong> {note.description}
            </Text>
          </Card.Body>
          <Card.Divider />
          <Card.Body css={{ py: "$1" }}>
          <Text css={{ color: "$accents8",textAlign:"center",fontWeight:"bold"}}>Request Date - {note.date.substring(0,10)}</Text>  
          </Card.Body>
          <Card.Footer>
      
            <Row justify="flex-end">
            <Button size="sm" color="error" auto style={{alignItem:"left"}} ghost onClick={()=>{deleteNote(note._id);  props.showAlert("Deleted successfully","success")}} >
                Revoke
              </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {note.status ==='warning' && <Tooltip content={"Click Twice to Accept request"} rounded color="primary">
              <Button size="sm" flat color="primary" id="udate" auto onPress={()=>{acceptNote(note)}} ghost>Completed</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Tooltip>}
              <Button size="sm" flat color="success" auto onClick={()=>{updateNote(note)}} ghost>Update</Button>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>

    </Grid>
        </>
    )
}

export default Noteitem