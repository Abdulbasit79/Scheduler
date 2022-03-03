import React from 'react';
import './styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/empty.js";
import Show from "components/Appointment/show.js";
import Form from "components/Appointment/form.js";
import Status from "components/Appointment/status.js";
import Confirm from 'components/Appointment/confim.js';
import useVisualMode from "components/hooks/useVisualMode.js";
export default function Appointment(props) {
  console.log("index test", props.student)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE =  "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY

    
          
            
    

          
          
            
    

          
    
  
  );
  function save(student, interviewer) {
    const interview = {
      student: student,
      interviewer
    };
    
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    })
  }
  const cancel = () => {
    transition(CONFIRM);
  }
  function confirmDelete() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
  }
  return (
  <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={cancel}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && <Form interviewers = {props.interviewers} onCancel={() => back(EMPTY)} onSave={save} />}
    {mode === SAVING && <Status message = "Saving" />}
    {mode === DELETING && <Status message = "Deleting" />}
    {mode === CONFIRM && <Confirm message = "Are you sure you want to delete this appointment?" onConfirm = {confirmDelete} onCancel = {() => transition(SHOW)} />}
    {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel = {() => transition(SHOW)} />}
  </article>
  );
}