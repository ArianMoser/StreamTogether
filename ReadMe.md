# StreamTogether

Installieren: 							npm install				(Nötig)
Development Mode starten : 				npm run dev				(Zum arbeiten und testen)
Alles erstellen: 						npm run build			(ganz zum schluss wenn alles läuft)
Starten mit den erstellten Dateien: 	npm start				(später für den Server)

STRG + SHIFT + F = Code ausrichten

Zum aufsetzten: nginx aufsetzten , node drauf, datenbank drauf, alles einstellen, fertisch

WICHTIG: SSL, Sicherer Zugang
Websockets: für Chat (Websockets chat example), für die Synchronisation zwischen den Räumen auch hilfreich


Thema:                                  Frontend               Backend

Startseite                              ok
Login                                   ok
Registrierung                           ok
Impressum                               ok					   nicht notwendig
Datenschutz                             ok					   nicht notwendig
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
Avatar hochladen
ändern



Help-Site:


import OwnHeader from "../components/Header";
import React, { Component } from 'react';
import { Icon, Image,Accordion,activeIndex, Statistic } from "semantic-ui-react";

export default class help extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    return (
      <OwnHeader>
        <Statistic.Group>
          <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Active Rooms</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value text>
              Three<br />
              Thousand
            </Statistic.Value>
            <Statistic.Label>Signups</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              <Icon name="music" />
              214
            </Statistic.Value>
            <Statistic.Label>Played Videos</Statistic.Label>
          </Statistic>
        </Statistic.Group>

        <Accordion fluid styled>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='dropdown' />
            What is a dog?
        </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
              A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
            {' '}welcome guest in many households across the world.
          </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='dropdown' />
            What kinds of dogs are there?
        </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
              There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of
            {' '}dog that they find to be compatible with their own lifestyle and desires from a companion.
          </p>
          </Accordion.Content>

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
            <Icon name='dropdown' />
            How do you acquire a dog?
        </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
              Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.
          </p>
            <p>
              A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to
            {' '}assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your
            {' '}dog from a shelter, helps give a good home to a dog who may not find one so readily.
          </p>
          </Accordion.Content>
        </Accordion>
      </OwnHeader>
    );
  }
}