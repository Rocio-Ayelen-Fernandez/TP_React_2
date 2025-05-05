import rockImg from "../img/rock.png"
import popImg from "../img/pop.png"
import rnb from "../img/rnb.png"
import funk from "../img/funk.png"
import disco from "../img/disco.png"
import electronica from "../img/electronica.png"
import kPop from "../img/k-pop.png"
import cumbia from "../img/cumbia.png"
import latina from "../img/latina.png"
// svg files
import amplificador from "../img/amplificador.svg"
import microfono from "../img/microfono.svg"
import estereo from "../img/estereo.svg"
import saxofon from "../img/saxofon.svg"
import bolaDisco from "../img/bola-de-disco.svg"
import consola from "../img/consola.svg"
import kPopIcon from "../img/k-pop.svg"
import teclado from "../img/teclado.svg"
import guitarra from "../img/guitarra.svg"



export const genres = [
    { id: "rock", name: "Rock", image: rockImg, icon: amplificador},
    { id: "pop", name: "Pop", image: popImg, icon: microfono},
    { id: "r&b", name: "R&B", image: rnb,  icon:estereo},
    { id: "funk", name: "Funk", image: funk, icon: saxofon},
    { id: "disco", name: "Disco", image: disco, icon: bolaDisco},
    { id: "electronica", name: "Electrónica", image: electronica, icon: consola},
    { id: "k-pop", name: "K-Pop", image: kPop, icon: kPopIcon},
    { id: "cumbia", name: "Cumbia", image: cumbia,  icon:teclado},
    { id: "latina", name: "Latina", image: latina, icon: guitarra},
  ];
  