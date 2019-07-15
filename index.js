'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
//const {Suggestion} = require('actions-on-google');
//const {Suggestion} = require('dialogflow-fulfillment');

//initialise the database
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://oops-tutor-ab4ef.firebaseio.com/',
});
var count=0;
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}
function pizzafn(agent)
{
    agent.add('pizza function okay');
}



function polyfunc(agent){
      return admin.database().ref('polymorphismdef').once("value").then((snapshot) => {
          var desc = snapshot.child("polymorphism").val();
          agent.add(desc);
          agent.add(new Suggestion('encapsulation'));
         });
}

function classfunc(agent){
      return admin.database().ref('classdef').once("value").then((snapshot) => {
          var desc = snapshot.child("class").val();
          agent.add(desc);
          agent.add(new Suggestion('object'));
         });
}

function abstractfunc(agent){
      return admin.database().ref('abstractdef').once("value").then((snapshot) => {
          var desc = snapshot.child("abstract").val();
          agent.add(desc);
          agent.add(new Suggestion('encapsulation'));
         });
}

function encapsulationfunc(agent){
      return admin.database().ref('encapsulationdef').once("value").then((snapshot) => {
          var desc = snapshot.child("encapsulation").val();
          agent.add(desc);
          agent.add(new Suggestion('oops'));
          agent.add(new Suggestion('class'));
         });
}

function associationfunc(agent){
      return admin.database().ref('associationdef').once("value").then((snapshot) => {
          var desc = snapshot.child("association").val();
          agent.add(desc);
         });
}

function aggregationfunc(agent){
      return admin.database().ref('aggregationdef').once("value").then((snapshot) => {
          var desc = snapshot.child("aggregation").val();
          agent.add(desc);
         });
}

function compositionfunc(agent){
      return admin.database().ref('compositiondef').once("value").then((snapshot) => {
          var desc = snapshot.child("composition").val();
          agent.add(desc);
          agent.add(new Suggestion('aggregation'));
          agent.add(new Suggestion('oops'));
        });
}

function inheritancefunc(agent){
      return admin.database().ref('inheritancedef').once("value").then((snapshot) => {
      var desc = snapshot.child("inheritance").val();
      agent.add(desc);
      agent.add(new Suggestion('polymorphism'));
         });
         
}

function objectfunc(agent){
      return admin.database().ref('objectdef').once("value").then((snapshot) => {
          var desc = snapshot.child("object").val();
          agent.add(desc);
          agent.add(new Suggestion('inheritance'));
         });
}
function single_inherit_func(agent){
      return admin.database().ref('single_inherit_def').once("value").then((snapshot) => {
          var desc = snapshot.child("single_inherit").val();
          agent.add(desc);
          agent.add(new Suggestion('multiple inheritance'));
         });
}
function multiple_inherit_func(agent){
      return admin.database().ref('multiple_inherit_def').once("value").then((snapshot) => {
          var desc = snapshot.child("multiple_inherit").val();
          agent.add(desc);
          agent.add(new Suggestion('multilevel inheritance'));
         });
}
function multilevel_inherit_func(agent){
      return admin.database().ref('multilevel_inherit_def').once("value").then((snapshot) => {
        var desc = snapshot.child("multilevel_inherit").val();
        agent.add(desc);
        agent.add(new Suggestion('Hierarchical Inheritance'));
         });
}
function Hierarchial_inherit_func(agent){
      return admin.database().ref('hierarchical_inherit_def').once("value").then((snapshot) => {
        var desc = snapshot.child("hierarchical_inherit").val();
        agent.add(desc);
        agent.add(new Suggestion('hybrid inheritance'));
        });
}

function hybrid_inherit_func(agent){
      return admin.database().ref('hybrid_inherit_def').once("value").then((snapshot) => {
          var desc = snapshot.child("hybrid_inherit").val();
          agent.add(desc);
          agent.add(new Suggestion('polymorphism'));
         });
}
function types_of_inherit_func(agent){
        agent.add('Inheritance is an OOPS concept in which one object acquires the properties and behaviors of the parent object. It’s creating a parent-child relationship between two classes. It offers robust and natural mechanism for organizing and structure of any software.');
        agent.add('there are 5 types of inheritance ');
        agent.add(new Suggestion('single inheritance'));
        agent.add(new Suggestion('multiple inheritance'));
        agent.add(new Suggestion('multilevel inheritance'));
        agent.add(new Suggestion('Hybrid Inheritance'));
        agent.add(new Suggestion('Hierarchical Inheritance'));
     
}
function oopsfunc(agent){
      return admin.database().ref('oopsdef').once("value").then((snapshot) => {
           var desc = snapshot.child("oops").val();
           agent.add(desc);
           agent.add(new Suggestion('class'));
           agent.add(new Suggestion('object'));
           agent.add(new Suggestion('inheritance'));
           agent.add(new Suggestion('polymorphism'));
           agent.add(new Suggestion('encapsulation'));
           agent.add(new Suggestion('association'));
           agent.add(new Suggestion('aggregation'));
           agent.add(new Suggestion('composition'));
           agent.add(new Suggestion("Login"));
         });
}

function updatefunc(agent){
    const email=agent.parameters.email;
    const password=agent.parameters.password;
    //admin.database().ref('sampledef').set({sample:"data has been updated"});
    if(email=="jeevamay6@gmail.com" && password=="jeeva007"){
        count=1;
        agent.add("Login success!!!");
        sugession(agent);
    }
    // agent.add("testing");
    else
    {
         agent.add("invalid details. Please try again");
        agent.add(new Suggestion("Login"));
    }
   
}
function sugession(agent){
    agent.add(new Suggestion('update encapsulation'));
    agent.add(new Suggestion('update inheritance'));
    agent.add(new Suggestion('update class'));
    agent.add(new Suggestion('update object'));
    agent.add(new Suggestion('update polymorphism'));
    agent.add(new Suggestion('update abstraction'));
    agent.add(new Suggestion('Logout'));
}
function update_encap_func(agent){
    if(count==1){
        const desc=agent.parameters.update_encap;
        agent.add(desc);
        admin.database().ref('encapsulation_def').set({encapsulation:desc});
        agent.add("successfully updated!!!");
        sugession(agent);
    }
    else{
         agent.add("Login failed!!! Please login to continue");
         agent.add(new Suggestion("Login"));
    }
}
function update_class_func(agent){
    if(count==1){
        const desc=agent.parameters.class_new;
        agent.add(desc);
        admin.database().ref('classdef').set({class:desc});
        agent.add("successfully updated!!!");
        sugession(agent);
    }
    else{
         agent.add("Login failed!!! Please login to continue");
         agent.add(new Suggestion("Login"));
    }
       
       
}
function update_object_func(agent){
     if(count==1){
        const desc=agent.parameters.new_object;
        agent.add(desc);
        admin.database().ref('objectdef').set({object:desc});
        agent.add("successfully updated!!!");
        sugession(agent);
    }
    else{
         agent.add("Login failed!!! Please login to continue");
         agent.add(new Suggestion("Login"));
    }
}
function update_inheritance_func(agent){
     if(count==1){
        const desc=agent.parameters.new_inheritance;
        agent.add(desc);
        admin.database().ref('inheritancedef').set({inheritance:desc});
        agent.add("successfully updated!!!");
        sugession(agent);
    }
   else{
         agent.add("Login failed!!! Please login to continue");
         agent.add(new Suggestion("Login"));
    }
}  
 
function logout_func(agent){
    count=0;
    agent.add("Logout Success!!!");
}



  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('polymorphism',polyfunc);
  intentMap.set('class',classfunc);
  intentMap.set('Abstraction',abstractfunc);
  intentMap.set('Encapsulation',encapsulationfunc);
  intentMap.set('Association',associationfunc);
  intentMap.set('Aggregation',aggregationfunc);
  intentMap.set('Composition',compositionfunc);
  intentMap.set('inheritance',inheritancefunc);
  intentMap.set('Object',objectfunc);
  intentMap.set('oops',oopsfunc);
  intentMap.set('single inheritance',single_inherit_func);
  intentMap.set('multiple inheritance',multiple_inherit_func);
  intentMap.set('Hybrid Inheritance',hybrid_inherit_func);
  intentMap.set('Hierarchical Inheritance',Hierarchial_inherit_func);
  intentMap.set('multilevel inheritance',multilevel_inherit_func);
  intentMap.set('types of inheritance',types_of_inherit_func);
  intentMap.set('update',updatefunc);
  intentMap.set('update encapsulation',update_encap_func);
  intentMap.set('update class',update_class_func);
  intentMap.set('update object',update_object_func);
  intentMap.set('update inheritance',update_inheritance_func);
  intentMap.set('Logout',logout_func);

 //  intentMap.set('test', testing);
  agent.handleRequest(intentMap);
});