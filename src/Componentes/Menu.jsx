import missao from "../assets/missao_tratado.png";
import mapa from "../assets/mapa_tratado.png";
import bau from "../assets/bau_tratado.png";
import camera from "../assets/camera_tratado.png";
import { Link } from "react-router-dom";
export function Menu() {
  return (
    <div className="menu">
      <ul className="card_nav">
        <li>
          <Link to="/dsgo/missao/" role="menuitem" aria-label="acessar-missões">
            <figure>
              <img src={missao} alt="Missões" />
            </figure>
          </Link>
        </li>

        <li>
          <Link
            to="/dsgo/inventario/"
            role="menuitem"
            aria-label="acessar-inventário"
          >
            <figure>
              <img src={bau} alt="Inventário" />
            </figure>
          </Link>
        </li>

        <li>
          <Link to="/dsgo/geolocalizacao/" role="menuitem" aria-label="acessar-geolocalização">
            <figure>
              <img src={mapa} alt="GeoLocalização" />
            </figure>
          </Link>
        </li>

        <li>
          <Link to="/dsgo/camera/" role="menuitem" aria-label="acessar-camera">
            <figure>
              <img src={camera} alt="camera" />
            </figure>
          </Link>
        </li>
      </ul>
    </div>
  );
}
