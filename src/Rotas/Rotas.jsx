import { Routes, Route } from "react-router-dom";
import { Inicial } from "../Paginas/Inicial";
import { DSGo } from "../Paginas/DSGo";
import { Missao } from "../Paginas/Missao";
import { Inventario } from "../Paginas/Inventario";
import { Camera } from "../Componentes/Camera";
import { GeolocalizacaoMapa } from "../Paginas/GeolocalizacaoMapa";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Inicial />} />
      <Route path="/dsgo/" element={<DSGo />}>
        <Route index element={<DSGo />} />
        <Route path="/dsgo/missao/" element={<Missao />} />
        <Route path="/dsgo/inventario/" element={<Inventario />} />
        <Route path="/dsgo/camera/" element={<Camera />} />
        <Route path="/dsgo/geolocalizacao/" element={<GeolocalizacaoMapa />} />
      </Route>
    </Routes>
  );
}
