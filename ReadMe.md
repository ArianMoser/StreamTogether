# StreamTogether

OFFLINE:
Installieren: 							        npm install				(Nötig)
Development Mode starten : 				  npm run dev				(Zum arbeiten und testen)
Alles erstellen: 						        npm run build			(ganz zum schluss wenn alles läuft)
Starten mit den erstellten Dateien: npm start				(später für den Server)

STRG + SHIFT + F = Code ausrichten

http://gruppe2.testsites.info/
ONLINE: 

<optional> pm2 stop all
<optional> pm2 restart all

1: In home/alex/Web-Projekt/StreamTogether/ gehen
2: git pull
3: npm build  
4: pm2 start npm -- start



Nginx Befehele:
To stop your web server, you can type:              sudo systemctl stop nginx
To start the web server when it is stopped, type:   sudo systemctl start nginx
To stop and then start the service again, type:     sudo systemctl restart nginx
reload:                                             sudo systemctl reload nginx
auto boot off:                                      sudo systemctl disable nginx
auto boot on:                                       sudo systemctl enable nginx


WICHTIG: SSL, Sicherer Zugang
Websockets: für Chat (Websockets chat example), für die Synchronisation zwischen den Räumen auch hilfreich

Thema:                                  Frontend               Backend

Startseite                              ok
Login                                   ok
Registrierung                           ok
Impressum                               ok					        nicht notwendig
Datenschutz                             ok					        nicht notwendig
Contact Us                              -
Datenbank                               -
Raumseite                               -
Übersicht von Räumen                    begin
Konto übersicht                         

Einloggen
Ausloggen
Raum erstellen
Raum automatisiert löschen
Username auto-geb
Raum umbenennen
Chat
Suche
Api(abspielen)
Starten stoppen
Liste nutzer in room
Playlistfunktion
(VoteSystem)
Invite Funktion
Avatar hochladen/ändern
