import React from "react";
import "../logData"

import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";

import "survey-core/modern.css";

Survey.StylesManager.applyTheme("modern");

export default function Questionnaire(props){
  var isRequired = false;
  const demographicPage = {
    "title":"Allgemeine Fragen",
    "elements": [
      // {
      //   "type": "text",
      //   "name": "first name",
      //   "title": "Vorname",
      //   "isRequired":true
      // },
      // {
      //   "type": "text",
      //   "name": "last name",
      //   "title": "Nachname",
      //   "isRequired":true
      // },
      {
        "type": "radiogroup",
        "name": "age",
        "title": "Zu welcher der nachfolgenden Alterskategorien gehören Sie?",
        "isRequired":isRequired,
        "choices": [
          "19 oder jünger",
          "20 - 29",
          "30 - 39",
          "40 - 49",
          "50 - 59",
          "60 oder älter",
        ]
      },
      {
        "type": "radiogroup",
        "name": "gender",
        "title": "Bitte geben Sie Ihr Geschlecht an",
        "isRequired":isRequired,
        "choices": [
          "Männlich",
          "Weiblich",
          "Divers"
        ]
      },
      {
        "type": "radiogroup",
        "name": "education",
        "title": "Was ist Ihr höchster Schul- oder Hochschulabschluss?",
        "isRequired":isRequired,
        "choices": [
          "Pflichtschule",
          "Lehre",
          "Matura",
          "Studium ohne Abschluss",
          "Bachelor-Abschluss",
          "Master-Abschluss",
          "Doktorat"
        ]
      }
    ]
  }
  const opinionPage = {
    "title":"Einstellung zum Konsum von Cannabis",
    "elements": [
      {
        "type": "matrix",
        "name": "Opinion",
        "title": "Bitte geben Sie an, wie sehr die folgenden Aussagen für Sie zutreffend sind",
        "isAllRowRequired":isRequired,
        "columns": [
          {
            "value": 1,
            "text": "Trifft gar nicht zu"
          },
          {
            "value": 2,
            "text": "Trifft kaum zu"
          },
          {
            "value": 3,
            "text": "Neutral"
          },
          {
            "value": 4,
            "text": "Trifft etwas zu"
          },
          {
            "value": 5,
            "text": "Trifft völlig zu"
          }
        ],
        "rows": [
          {
            "value": "desire",
            "text": "Ich würde gerne öfter legal Cannabis konsumieren"
          },
          {
            "value": "bad experience",
            "text": "Ich oder ein Bekannter hat bereits schlechte Erfahrung mit Cannabis gemacht"
          },
          {
            "value": "economic",
            "text": "Ich glaube, eine Legalisierung von Cannabis würde wirtschaftliche Vorteile bringen"
          },
          {
            "value": "generalisation",
            "text": "Ich finde, es sollten alle Drogen verboten werden"
          },
          {
            "value": "health",
            "text": "Ich finde, Cannabis ist gesundheitlich zu gefährlich, um legalisiert zu werden"
          },
          {
            "value": "medizine",
            "text": "Ich unterstütze den Einsatz von Cannabis für medizinische Zwecke, nicht aber für den privaten Konsum"
          },
          
        ]
      }
    ]
  }
  const json = {
    pages: []
  };
  var myCustomSurveyStrings = {
    pagePrevText: "❮ Zurück",
    pageNextText: "Weiter ❯",
    completeText: "Fertig"
  };

  if(props.demographic === true){
    json["pages"].push(demographicPage)
    myCustomSurveyStrings["completeText"] = "Weiter ❯"
  }
  json["pages"].push(opinionPage)


  const survey = new Survey.Model(json);
  survey.onComplete.add(function (sender) {
      if(props.demographic){  // preQ
        global.logData.preQ = sender.data;
        global.logData.startTime = Date.now()
      } else{ // postQ
        global.logData.postQ = sender.data;
      }
      props.onSubmit()
    });

  
  Survey
      .surveyLocalization
      .locales["my"] = myCustomSurveyStrings;

  survey.locale = "my";

  return (
    <SurveyReact.Survey model={survey} />
  )
}
