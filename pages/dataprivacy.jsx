//--------------------------------Imports-------------------------------//
import PropTypes from "prop-types";
import React, { Component } from "react";
import Link from "next/link";
import OwnHeader from "../components/Header";
import TopBox from "../components/TopBox";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

export default class Dataprivacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "empty"
    };
  }

  //----------------------------------Render-------------------------------//
  render() {
    const activeItem = this.state.activeItem;

    return (
      <OwnHeader>
        <TopBox activeItem={activeItem} layer1="Data privacy" />
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <p style={{ fontSize: "1.33em" }}>
                  <h2>Datenschutz</h2>{" "}
                  <p>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer
                    pers&ouml;nlichen Daten sehr ernst. Wir behandeln Ihre
                    personenbezogenen Daten vertraulich und entsprechend der
                    gesetzlichen Datenschutzvorschriften sowie dieser
                    Datenschutzerkl&auml;rung.
                  </p>{" "}
                  <p>
                    Die Nutzung unserer Website ist in der Regel ohne Angabe
                    personenbezogener Daten m&ouml;glich. Soweit auf unseren
                    Seiten personenbezogene Daten (beispielsweise Name,
                    Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt
                    dies, soweit m&ouml;glich, stets auf freiwilliger Basis.
                    Diese Daten werden ohne Ihre ausdr&uuml;ckliche Zustimmung
                    nicht an Dritte weitergegeben.
                  </p>{" "}
                  <p>
                    Wir weisen darauf hin, dass die Daten&uuml;bertragung im
                    Internet (z.B. bei der Kommunikation per E-Mail)
                    Sicherheitsl&uuml;cken aufweisen kann. Ein l&uuml;ckenloser
                    Schutz der Daten vor dem Zugriff durch Dritte ist nicht
                    m&ouml;glich.
                  </p>
                  <p>&nbsp;</p>
                  <h2>Cookies</h2>{" "}
                  <p>
                    Die Internetseiten verwenden teilweise so genannte Cookies.
                    Cookies richten auf Ihrem Rechner keinen Schaden an und
                    enthalten keine Viren. Cookies dienen dazu, unser Angebot
                    nutzerfreundlicher, effektiver und sicherer zu machen.
                    Cookies sind kleine Textdateien, die auf Ihrem Rechner
                    abgelegt werden und die Ihr Browser speichert.
                  </p>{" "}
                  <p>
                    Die meisten der von uns verwendeten Cookies sind so genannte
                    „Session-Cookies“. Sie werden nach Ende Ihres Besuchs
                    automatisch gel&ouml;scht. Andere Cookies bleiben auf Ihrem
                    Endger&auml;t gespeichert, bis Sie diese l&ouml;schen. Diese
                    Cookies erm&ouml;glichen es uns, Ihren Browser beim
                    n&auml;chsten Besuch wiederzuerkennen.
                  </p>{" "}
                  <p>
                    Sie k&ouml;nnen Ihren Browser so einstellen, dass Sie
                    &uuml;ber das Setzen von Cookies informiert werden und
                    Cookies nur im Einzelfall erlauben, die Annahme von Cookies
                    f&uuml;r bestimmte F&auml;lle oder generell
                    ausschlie&szlig;en sowie das automatische L&ouml;schen der
                    Cookies beim Schlie&szlig;en des Browser aktivieren. Bei der
                    Deaktivierung von Cookies kann die Funktionalit&auml;t
                    dieser Website eingeschr&auml;nkt sein.
                  </p>
                  <p>&nbsp;</p> <h2>Server-LogFiles</h2>
                  <p>
                    Der Provider der Seiten erhebt und speichert automatisch
                    Informationen in so genannten Server-Log Files, die Ihr
                    Browser automatisch an uns &uuml;bermittelt. Dies sind:
                  </p>{" "}
                  <ul>
                    <li>Browsertyp und Browserversion</li>{" "}
                    <li>verwendetes Betriebssystem</li> <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>{" "}
                    <li>Uhrzeit der Serveranfrage</li>{" "}
                  </ul>{" "}
                  <p>
                    Diese Daten sind nicht bestimmten Personen zuordenbar. Eine
                    Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen
                    wird nicht vorgenommen. Wir behalten uns vor, diese Daten
                    nachtr&auml;glich zu pr&uuml;fen, wenn uns konkrete
                    Anhaltspunkte f&uuml;r eine rechtswidrige Nutzung bekannt
                    werden.
                  </p>
                  <p>&nbsp;</p> <h2>YouTube</h2>{" "}
                  <p>
                    Unsere Website nutzt Plugins der von Google betriebenen
                    Seite YouTube. Betreiber der Seiten ist die YouTube, LLC,
                    901 Cherry Ave., San Bruno, CA 94066, USA. Wenn Sie eine
                    unserer mit einem YouTube-Plugin ausgestatteten Seiten
                    besuchen, wird eine Verbindung zu den Servern von YouTube
                    hergestellt. Dabei wird dem Youtube-Server mitgeteilt,
                    welche unserer Seiten Sie besucht haben.
                  </p>{" "}
                  <p>
                    Wenn Sie in Ihrem YouTube-Account eingeloggt sind
                    erm&ouml;glichen Sie YouTube, Ihr Surfverhalten direkt Ihrem
                    pers&ouml;nlichen Profil zuzuordnen. Dies k&ouml;nnen Sie
                    verhindern, indem Sie sich aus Ihrem YouTube-Account
                    ausloggen.
                  </p>{" "}
                  <p>
                    Weitere Informationen zum Umgang von Nutzerdaten finden Sie
                    in der Datenschutzerkl&auml;rung von YouTube unter:{" "}
                    <a
                      href="https://www.google.de/intl/de/policies/privacy"
                      target="_blank"
                    >
                      https://www.google.de/intl/de/policies/privacy
                    </a>
                  </p>
                  <p>&nbsp;</p> <h2>SSLVerschl&uuml;sselung</h2>
                  <p>
                    Diese Seite nutzt aus Gr&uuml;nden der Sicherheit und zum
                    Schutz der &Uuml;bertragung vertraulicher Inhalte, wie zum
                    Beispiel der Anfragen, die Sie an uns als Seitenbetreiber
                    senden, eine SSL-Verschl&uuml;sselung. Eine
                    verschl&uuml;sselte Verbindung erkennen Sie daran, dass die
                    Adresszeile des Browsers von &quot;http://&quot; auf
                    &quot;https://&quot; wechselt und an dem Schloss-Symbol in
                    Ihrer Browserzeile.
                  </p>{" "}
                  <p>
                    Wenn die SSL Verschl&uuml;sselung aktiviert ist, k&ouml;nnen
                    die Daten, die Sie an uns &uuml;bermitteln, nicht von
                    Dritten mitgelesen werden.
                  </p>
                  <p>&nbsp;</p>{" "}
                  <h2>Recht auf Auskunft, L&ouml;schung, Sperrung</h2>{" "}
                  <p>
                    Sie haben jederzeit das Recht auf unentgeltliche Auskunft
                    &uuml;ber Ihre gespeicherten personenbezogenen Daten, deren
                    Herkunft und Empf&auml;nger und den Zweck der
                    Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung
                    oder L&ouml;schung dieser Daten. Hierzu sowie zu weiteren
                    Fragen zum Thema personenbezogene Daten k&ouml;nnen Sie sich
                    jederzeit unter der im Impressum angegebenen Adresse an uns
                    wenden.
                  </p>
                  <p>&nbsp;</p> <h2>Datenschutzerklärung Google Maps</h2>
                  <p>
                    Diese Webseite verwendet das Produkt Google Maps von Google
                    Inc. Durch Nutzung dieser Webseite erklären Sie sich mit der
                    Erfassung, Bearbeitung sowie Nutzung der automatisiert
                    erhobenen Daten durch Google Inc, deren Vertreter sowie
                    Dritter einverstanden. Die Nutzungsbedingungen von Google
                    Maps finden sie unter{" "}
                    <a href="https://www.google.com/intl/de_de/help/terms_maps.html">
                      "Nutzungsbedingungen von Google Maps"
                    </a>.
                  </p>
                  <p>
                    Quelle:{" "}
                    <a href="https://www.e-recht24.de/musterdatenschutzerklaerung.html">
                      https://www.e-recht24.de/muster-datenschutzerklaerung.html
                    </a>
                  </p>
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </OwnHeader>
    );
  }
}
