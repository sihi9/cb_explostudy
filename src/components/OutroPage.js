import * as React from 'react';

export default function Outro(props){

  return(
    <div className="content">
      <p className='center'>
        <b>Vielen Dank für deine Teilnahme!</b>
      </p>
      <p> Du hast die Studie erfolgreich beendet und kannst nun jederzeit dieses Fenster schließen</p>
      <p> Sollte es dich interessieren, findest du im Weiteren noch Details zur Studie. Natürlich kannst du mich auch jederzeit persönlich fragen oder unter simon.hitzginger@student.tugraz.at kontaktieren.</p>

      <div className="infobox" >
        <b>Informationen zur Studie</b> <br/>
        Das Ziel meines Bachelorprojekts ist es, ein Browser-Addon zu entwickeln, welches das auftreten von Confirmation Bias erkennen kann. <br/>
        Unter <i>Confirmation Bias</i> versteht man die natürliche Tendenz des Menschen, Information zu bevorzugen, welche der bereits bestehenden Meinung entspricht
         (weitere Information dazu auf <a href="https://de.wikipedia.org/wiki/Best%C3%A4tigungsfehler">Wikipedia</a>). Konkret würde dies im Beispiel der Studie bedeuten, 
         dass du zu Beginn der Studie eine Voreisntellung entweder für oder gegen die Legalisierung von THC-haltigem Cannabis hast. Diese Voreinstellung könnte dich dahingehend 
         beeinflusst haben, mehr nach Artikeln zu suchen, welche diese Meinung weiter bekräftigen.<br/>
        Untersucht wird nun in dieser Studie, welche Faktoren im Suchverhalten auf einen solchen <i>Confirmation Bias</i> hinweisen könnten.
        Dabei werden folgende Faktoren erhoben:
        <ul>
          <li>Gesamte Suchdauer</li>
          <li>Anzahl verschiedener Suchbegriffe</li>
          <li>Zeit pro Suchbegriff</li>
          <li>Anzahl angeklickter Suchergebnisse</li>
          <li>Zeit pro angeklicktem Suchergebnis</li>
          <li>Das wievielte Suchergebnis angeklickt wurde</li>
          <li>Formulierung der Suchbegriffe</li>
        </ul>

        Hoffentlich lässt sich in diesen Faktoren ein Zusammenhang mit <i>Confirmation Bias</i> finden, um darauf das zuvor erwähnte Browser-Addon aufbauen zu können.

      </div>
    </div>
  )
}
