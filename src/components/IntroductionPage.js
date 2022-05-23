import * as React from 'react';

export default function Introduction(props){

  const introductionText = 
  `Liebe:r Teilnehmer:in, <br>
  <br>
  mein Name ist Simon Hitzginger, und ich verfasse derzeit meine Bachelorarbeit für mein Informatikstudium.
  Dazu würde ich dich bitten, dir die Zeit zu nehmen, um an dieser Studie teilzunehmen. 
  Am Anfang der Studie wirst du gebeten, einige Fragen zu beantworten. Anschließend bekommst du die Möglichkeit,
  eine Datenbank mit verschiedenen Zeitungsartikeln zum Thema <strong>"Legalisierung von Cannabis"</strong> zu durchsuchen.
  Bitte nutze diese Gelegenheit, folgende Frage möglichst gewissenhaft beantworten zu können:
    <p><strong>"Sollte THC-haltiges Cannabis in Österreich legalisiert werden?" </strong></p>
  Abschließend werden dir nochmals einige Fragen gestellt.
  Wenn in den folgenden Fragen Cannabis erwähnt wird, ist dabei immer <strong>THC-haltiges Cannabis</strong> gemeint, welches in Österreich für Privatkonsum verboten ist. <br>
  Für den Erfolg der Studie ist es wichtig, dass du dir die nötige Zeit nimmst und alle Fragen beantwortest.<br>
  Benütze außerdem bitte <strong>keinesfalls</strong> die Vor-, Zurück- und Neu-Laden-Knöpfe deines Webbrowsers, da ansonsten deine Daten nicht richtig aufgezeichnet werden!
  <br>
  Vielen Dank für deine Teilnahme!`

  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (

    <div className="content">
      <p dangerouslySetInnerHTML={{__html: introductionText}}>
      </p>

      <div className="infobox" >
        <b>Einverständniserklärung:</b><br/>
          Im Rahmen der Studie werden verschiedene Daten erhoben und gespeichert. Bitte um Beachtung folgender Punkte:<br/>
          <ul>
            <li>Die Teilnahme ist völlig freiwillig. Die Teilnehmer:innen können jederzeit von der Studie zurücktreten.</li>
            <li>Alle Daten werden anonymisiert erhoben und in Übereinstimmung mit der DSGV zum Schutz personenbezogener Daten gespeichert.</li>
            <li>Allgemeine Fragen oder Bedenken bezüglich der Studie können jederzeit an Simon Hitzginger (simon.hitzginger@student.tugraz.at) gerichtet werden. </li>
            <li>Weitere Details zur Studie und dessen Hintergrund werden am Ende der Studie erklärt, um eine mögliche Verfälschung der Daten zu verhindern </li>
          </ul>
          <p> 
            Mit der Teilnahme an der Studie erkläre ich mich mit den oben genannten Punkten einverstanden 
          </p>
          <p>
             <input type="checkbox" id="cb_accept" name="cb_accept" checked={checked} onChange={handleChange}></input>
             <label for="cb_accept">Ich habe die Information in diesem Formular gelesen und verstanden.</label>
          </p>
      </div>
      <div className="sv-footer sv-body__footer sv-clearfix">
      <button className="sv-btn sv-btn--navigation sv-footer__next-btn" onClick={() => {
        if(checked){
          props.onSubmit()
        } else{
          alert("Bitte stimme erst der Einwilligungserklärung zu!")
        }
       
      }}>Los geht's ❯</button>
      </div>
      
    </div>
  )
}