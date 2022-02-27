# Chat-Server-Node
## Introduction
A Chat Server created using node.js, express and socket.io. MongoDB is used as database (Atlas Server). The application will expose REST APIs for performing most of tasks while creating a socket.io server for real time transfer of messages and add contact requests.

## Flow Of Control
<ol>
  <li>Users interact with client software (browser or native) which would send a POST request to "/api/v1/users/register" to get registered with the application. The API call            returns a jsonwebtoken as a response. That web token can be used for sending authorised requests to the server using Authentication Header.</li>
  <li>Once registered Users can post credentials at login route "/api/v1/users/login" to get tokens </li>
  <li>Users can search a user by their username to get their id by doing a get request to "/api/v1/users/:username"</li>
  <li>Users can post add contact request to "/api/v1/chats/add" with chatId and userId to start chatting with a user</li>
  <li>users can finnaly send messages to added contacts by posting a request to "/api/v1/chats/message" with chatId, receipients Id and text </li>
  <li>Users get their existing chats by requesting on "/api/v1/chats/" </li>
 </ol>
 
 ## Under development
 <ol>
  <li> Web Socket Logic </li>
  <li> Users Profile Logic </li>
 </ol>
 
 ## Installation Guide
 ### Requirements
 <ul>
  <li> Node Js version 15 or higher </li>
  <li> Database Connection URI string with password and username </li>
 </ul>
 
 ### Steps
 <ol>
  <li> Clone The github repo </li>
  <li> Run "npm install" command inside the repository. </li>
  <li> Create a config.env </li>
  <li> Add KEY, DATABASE, DATABASE_PASSWORD variable to your file. </li>
  <li> Run "npm run dev" to start the server </li>
 </ol>
