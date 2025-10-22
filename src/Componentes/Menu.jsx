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
          <Link to="missao">
            <figure>
              <img src={missao} alt="Missões" />
            </figure>
          </Link>
        </li>

        <li>
          <figure>
            <img src={bau} alt="Inventário" />
          </figure>
        </li>

        <li>
          <figure>
            <img src={mapa} alt="GeoLocalização" />
          </figure>
        </li>

        <li>
          <figure>
            <img src={camera} alt="camera" />
          </figure>
        </li>

      </ul>
    </div>
  );
}
