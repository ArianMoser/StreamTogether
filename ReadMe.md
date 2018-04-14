# StreamTogether

See our result online ([Website](http://gruppe2.testsites.info/ "Our Website"))

## How to install

### OFFLINE:

| Step                               | Command        | Additional                          |
| :--------------------------------- | :------------- | :---------------------------------- |
| Installieren                       | npm install    | (Nötig)                             |
| Development Mode starten           | npm run dev	  |	(Zum arbeiten und testen)           |
| Alles erstellen                    | npm run build  | (ganz zum schluss wenn alles läuft) |
| Starten mit den erstellten Dateien | npm start	  |	(später für den Server)             |

> STRG + SHIFT + F = Code ausrichten

 ### ONLINE:

* <optional> pm2 stop all
* <optional> pm2 restart all

1. Switch to home directory (home/alex/Web-Projekt/StreamTogether/)
2. git pull
3. npm run build  
4. pm2 start npm -- start



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

* Alex:TODO:
* Anzeigen für den Benutzer erstellen.
* Cookie setzen

|Thema:                               | Frontend         | Backend          |
| -----------------------------------:| :--------------: | :--------------: |
| Startseite                          | ok               |                  |
| Login                               | ok               |                  |
| Registrierung                       | ok               |                  |
| Impressum                           | ok				 |  nicht notwendig |
| Datenschutz                         | ok				 |  nicht notwendig |
| Contact Us                          | -                |                  |
| Datenbank                           | -                |                  |
| Raumseite                           | -                |                  |
| Übersicht von Räumen                | begin            |                  |
| Konto übersicht                     | -                |                  |
|                                     |                  |                  |
| Einloggen                           |                  |                  |
| Ausloggen                           |                  |                  |
| Raum erstellen                      |                  |                  |
| Raum automatisiert löschen          |                  |                  |
| Username auto-geb                   |                  |                  |
| Raum umbenennen                     |                  |                  |
| Chat                                |                  |                  |
| Suche                               |                  |                  |
| Api(abspielen)                      |                  |                  |
| Starten stoppen                     |                  |                  |
| Liste nutzer in room                |                  |                  |
| Playlistfunktion                    |                  |                  |
| (VoteSystem)                        |                  |                  |
| Invite Funktion                     |                  |                  |
| Avatar hochladen/ändern             |                  |                  |