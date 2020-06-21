# Bird Watching Application

An application for noting down and listing bird sightings, built using React and PouchDB database.

* [Live Demo](https://birdy-watch.web.app/)

## Using the app

When a user accesses the bird watching app for the first time, sample bird watching data is displayed for the user, since the user has not added any sightings to the database. Sightings can be sorted by bird name or by date of sighting. 

Users can add their own bird sightings using the 'New Observation' button. The corresponding form has mandatory fields for name, rarity of bird species, and a section for notes. The user can also attach an image of the bird if they want (optional). If no image is provided, a sample image is assigned to the bird sighting entry. After pressing the submit button, the bird sighting is then rendered on the main page. Note: Once user adds data, the sample data is overwritten and removed. 

A special feature of this application is the data storage. Data is stored in a PouchDB database within the browser. PouchDB allows applications to store data locally while offline, then synchronize it with CouchDB and compatible servers when the application is back online, keeping the user's data in sync no matter where they next login. The CouchDB implementation in this application is still peding.

Clearing the PouchDB database:

Users can clear their own data entry, by accessing the 'Application' tab in Developer Tools. In the 'Storage' subsection there will be 'IndexedDB' -> '_pouch_bird-watch'. When user clicks the pouchdb storage, there will be an option for 'Delete database'. This will clear the database of the users entries, and the application will again display the sample data.

## Quick start

1. [Clone the repo](#1-clone-the-repo).
1. [Install and build app](#2-install-and-build-app).
1. [Run the frontend](#3-run-the-frontend).

### 1. Clone the repo

Clone the `birdy` repository locally. In a terminal, run:

```
$ git clone https://github.com/pankaj-pant/birdy.git
$ cd birdy
```

### 2. Install and build app

To install the dependencies and build a production version of the app, run the commands:

    $ npm install
    $ npm run build

### 3. Run the frontend

This command serves the app at `http://localhost:8080/`.

    $ npm start

## License
[MIT](https://choosealicense.com/licenses/mit/)