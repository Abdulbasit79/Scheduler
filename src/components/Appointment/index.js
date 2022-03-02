import React from 'react';
import './styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/empty.js";
import Show from "components/Appointment/show.js";
import Form from "components/Appointment/form.js";
import useVisualMode from "components/hooks/useVisualMode.js";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE =  "CREATE";
  const interviewers = [];

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
  <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && <Form interviewers = {interviewers} onCancel={back}/>}
  </article>
  );
}