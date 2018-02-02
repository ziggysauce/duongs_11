# Duong's 11 Newsletyter

## Table of Contents
* [About](#about)
* [Live](#live)
* [Build Tools](#build-tools)
* [Contributors](#contributors)


## About
This repository is meant to create a website to display all the newsletters for the Duong's 11 family.
[License](https://github.com/ziggysauce/duongs_11/blob/master/LICENSE)  


## Live
[Newsletter]()


## RESTful Routes
| Name    | Path           | HTTP Verb | Purpose                          | Mongoose Method          |
| ------- | -------------- | --------- | -------------------------------- | ---------------          |
| Index   | /page          | GET       | List all items on page           | Page.find()              |
| New     | /page/new      | GET       | Show new page form               | N/A                      |
| Create  | /page          | POST      | Create new page; redirect        | Page.create()            |
| Show    | /page/:id      | GET       | Show info about specific page    | Page.findById()          |
| Edit    | /page/:id/edit | GET       | Show edit for for specific page  | Page.findById()          |
| Update  | /page/:id      | PUT       | Update particular page; redirect | Page.findByIdAndUpdate() |
| Destroy | /page/:id      | DELETE    | Delete particular page; redirect | Page.findByIdAndRemove() |


## Build Tools
### Frontend
* HTML, CSS, JS
* EJS

### Backend
* Node.js (v9+)
* NPM

### Database
* MongoDB


## Contributors
* [Dan Nguyen](https://github.com/ziggysauce)