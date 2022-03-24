# Chat-Server-Node

## Introduction

A Chat Server created using node.js, express and socket.io. MongoDB is used as database (Atlas Server). The application will expose REST APIs for performing most of tasks while creating a socket.io server for real time transfer of messages and add contact requests.

## Flow Of Control

<ol>
  <li>Users interact with client software (browser or native) which would send a POST request to "/api/v1/users/register" to get registered with the application. The API call            returns a jsonwebtoken as a response. That web token can be used for sending authorized requests to the server using Authentication Header. After registration, users can make a login call to "/api/v1/users/login" to get a similar authentication token. In any of the cases client software send an authentication event to the server to get registered as a connected socket.</li>
  <li>Users can search other users by their username to get their id. This is accomplished by making a get request to "/api/v1/users/:username". The response returns the id of requested user which is necessary to add them as contact.</li>
  <li>Users can post add contact request to "/api/v1/chats" with userId to add them to their contact list. This operation creates a chat in the database and also returns the id of the chat. The client software then also makes a websocket request with the event "add-contact" so that receivers get the message of being added to the contact list by server.</li>
  <li>Users can finally send messages to added contacts by making a PATCH request to "/api/v1/chats" with chatId, recipients Id and text. This request also emits an event from server to the recipient so that messages are transferred in real-time. </li>
  <li>Users get their existing chats by requesting on GET "/api/v1/chats/" </li>
 </ol>
 
 ## Under development
 <ol>
  <li> Frontend of the application </li>
  <li> Users Profile Logic </li>
  <li> Privacy Options </li>
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
 
# API DOCUMENTATION

## CHAT SERVER

### BASIC INTRODUCTION

Chat Server is a node.js server exposing several endpoints to enable private messaging between users. All the APIs are divided between two resources namely, Users and Chats. The relationship between chats and users is intuitive. Users have chats while each chat is shared by two users, creating a many-to-many relationship. These REST API endpoints will be complimented with web socket logic implemented in Socket.io for real time data transfer.

### AUTHENTICATION

All the user endpoints are unauthenticated, except the GET USER endpoint which requires a JSON web token in the authorization header. On the other hand all the endpoints on the chat resource are authenticated and require a similar token in the authorization header.

## Users

This resource deals with the Users and takes care of login and registration. These endpoints take the credentials inside the request body, verifies them and sends the JSON web token in the response. There is an additional endpoint to facilitate searching of users by their username.

### Register

<p>Method: POST</p>
<p>Endpoint: http://127.0.0.1:3001/api/v1/users/register</p>
<p>The registration endpoint takes the credentials:- Email, Username and Password, verifies those credentials, saves user to the database and sends a JSON web token as the response. This token can further be used to authenticate for requests. </p>

Body: Raw(JSON)

```json
{
  "username": "Salamander",
  "email": "salamander@gmail.com",
  "password": "Rohit@12345"
}
```

### Login

<p>Method: POST</p>
<p>Endpoint: http://127.0.0.1:3001/api/v1/users/login </p>
<p>The login endpoint verifies the user credentials received in the response body and sends a JSON web token on successful verification. </p>

Body: Raw(JSON)

```json
{
  "username": "Anshu",
  "password": "Rohit@12345"
}
```

### Get User

<p>Method: GET</p>
<p>Endpoint: http://127.0.0.1:3001/api/v1/users/:username</p>
<p>This endpoint helps in getting user id for adding them to contacts by passing the username as a URL parameter. </p>

<p>Request Headers:- Authorization: Bearer {{token}} </p>

## Chats

This resource exposes the endpoints for managing chats of users. These chat objects store the messages and are updated for every message related to the chat.

### Add Contact

<p>Method: POST</p>
<p>Endpoint: http://127.0.0.1:3001/api/v1/chats</p>
<p>This Chat endpoint facilitates creation of chat objects which store the messages between the two users. The request should have a user id in the body and a token inside the Authorization header. The result is a chat object consisting of chat id required to send messages. The client should store the username of the requested user as it is not returned from the request.</p>

<p>Request Headers:- Authorization: Bearer {{token}} </p>
Body: Raw (JSON)
```json
{
  "id": "621b89438f358b17431650dc"
}
```

### Get Chats

<p>Method: GET</p>
<p>Endpoint: http://127.0.0.1:3001/api/v1/chats </p>
<p>This Chat endpoint reads all the chat objects for a particular user and returns them as an array in the response. The request also returns an array of usernames for client. For this request, client needs an authorization header with a JSON web token. </p>

<p>Request Headers:- Authorization: Bearer {{token}} </p>

### Send Message

<p>Method: PATCH </p>
<p>Endpoint: http://127.0.0.1:3001/api/v1/chats</p>
<p>This endpoint facilitates the private messaging between the users. This endpoint requires a chat id, a receiver id and a text message inside the body of the request. No data is returned from the API. This API is coupled with a web socket logic to facilitate real time data transfer.</p>

<p>Request Headers:- Authorization: Bearer {{token}} </p>

Body: Raw(JSON)

```json
{
  "chatId": "621b84f326a7a33e313790d7",
  "receiverId": "621b82476fca812bf861d79c",
  "text": "Hello Anshu"
}
```
