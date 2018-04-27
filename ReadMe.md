# StreamTogether

See our result online ([Website](http://gruppe2.testsites.info/ "Our Website"))

## How to install

### OFFLINE:

| Step                                 | Command            | Additional                          |
| :----------------------------------- | :----------------- | :---------------------------------- |
| Installieren                         | npm install        | (Nötig)                             |
| Development Mode starten             | npm run dev	      |	(Zum arbeiten und testen)           |
| Alles erstellen                      | npm run build      | (ganz zum schluss wenn alles läuft) |
| Starten mit den erstellten Dateien   | npm start	        |	(später für den Server)             |
| Aktivieren des MYSQL event scheduler | SET GLOBAL event_scheduler="ON" | (in XAMPP)                          |
> STRG + SHIFT + F = Code ausrichten

 ### ONLINE:

* <optional> pm2 stop all
* <optional> pm2 restart all

1. Switch to home directory (home/alex/Web-Projekt/StreamTogether/)
2. git pull
3. npm run build 
4. Change "start" in package.json to "export NODE_ENV=production&&node ./dist/server.js"
5. pm2 start npm -- start



#### Nginx Befehele:

 | Step                                              | Command                     |
 | -------------------------------------------------:|:----------------------------|
 | To stop your web server, you can type:            | sudo systemctl stop nginx   |
 | To start the web server when it is stopped, type: | sudo systemctl start nginx  |
 | To stop and then start the service again, type:   | sudo systemctl restart nginx|
 | Reload:                                           | sudo systemctl reload nginx |
 | Auto boot off:                                    | sudo systemctl disable nginx|
 | Auto boot on:                                     | sudo systemctl enable nginx |

## TODO

* WICHTIG:    SSL, Sicherer Zugang
* Websockets: für Chat (Websockets chat example), für die Synchronisation zwischen den Räumen auch hilfreich

* Raum ID nicht vorhanden DANN zugriff verweigen
* Einheitliches Typverfahren
* Coderichtlinien
* Proptypes defenieren
* öfter Voten muss raus
* Funktionen auslagern
* Warining rausfliegen
* Temp Benutzer implementieren
* akuteller Raum wo man drinnen ist, soll hervorgehoben werden
* Websocket sync
* Bug fixes
* Code clean
* Front-End Playlist Scrollbar
* Bilder upload
* Search mit Buttons durchswitchen
* Tabelle fürs akutelle Video
* Privilegien(Admin/Nicht Admin)

|Thema:                               | Status           |
| -----------------------------------:| :--------------: |
| Startseite                          | ok               |
| Login                               | ok               |
| Registrierung                       | ok               |
| Impressum                           | ok				 |
| Datenschutz                         | ok				 |
| Contact Us                          | ok  |
| Datenbank                           | ok               |
| Raumseite                           | verbessern       |
| Übersicht von Räumen                | 3 nebeneinander  |
| Konto übersicht                     | ok               |
|                                     |                  |
| Einloggen                           | ok               |
| Ausloggen                           | ok               |
| Raum erstellen                      | ok               |
| Raum automatisiert löschen          | ok        |
| (Username auto-geb)                 |                  |
| Chat                                | ok                 |
| Suche                               | ok               |
| Api(abspielen)                      | ok               |
| Starten stoppen                     |                  |
| Liste nutzer in room                | ok                 |
| Playlistfunktion                    | ok                 |
| VoteSystem                        | teils                 |
| Invite Funktion                     |                  |
| Avatar hochladen/ändern             |                  |
