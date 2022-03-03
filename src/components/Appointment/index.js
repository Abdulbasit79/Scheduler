import React from 'react';
import './styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/empty.js";
import Show from "components/Appointment/show.js";
import Form from "components/Appointment/form.js";
import Status from "components/Appointment/status.js";
import Confirm from 'components/Appointment/confim.js';
import Error from 'components/Appointment/error.js';
import useVisualMode from "components/hooks/useVisualMode.js";    
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE =  "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY  
  );
  function save(student, interviewer) {
    const interview = {
      student: student,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  const cancel = () => {
    transition(CONFIRM);
  }

  function destroy() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
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
    {mode === CONFIRM && <Confirm message = "Are you sure you want to delete this appointment?" onConfirm = {destroy} onCancel = {() => transition(SHOW)} />}
    {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel = {() => transition(SHOW)} />}
    {mode === ERROR_SAVE && <Error message = "Unable to save appointment" onClose={() => back()}/>}
    {mode === ERROR_DELETE && <Error message = "Unable to delete appointment" onClose={() => back()}/>}
  </article>
  
  
  );
}