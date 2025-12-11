import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css"


export function GeolocalizacaoMapa() {
    const mapRef = useRef(null);
    const rotaRef = useRef(null);

    const [form, setForm] = useState({
        lat1: "",
        lng1: "",
        lat3: "",
        lng2: "",
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (mapRef.current) return;

        const mapa = L.map("mapa").setView([-23.55, -46.63], 13);
        mapRef.current = mapa;

        L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(mapa)
    }, []);

    function validarCampos() {
        let temp = {}

        if (!form.lat1) temp.lat1 = "Informe a latitude da origem.";
        if (!form.lng1) temp.lng1 = "Informe a longitude da origem.";
        if (!form.lat2) temp.lat2 = "Informe a latitude do destino.";
        if (!form.lng2) temp.lng2 = "Informe a longitude do destino.";

        setErrors(temp);
        return Object.keys(temp).length === 0;
    }

    function gerarRota(e) {
        e.preventDefault();
        if (!validarCampos()) return;

        const p1 = L.latLng(parseFloat(form.lat1), parseFloat(form.lng1));
        const p2 = L.latLng(parseFloat(form.lat2), parseFloat(form.lng2));

        if (rotaRef.current) rotaRef.current.remove();

        rotaRef.current = L.Routing?.control({
            waypoints: [p1, p2],
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            lineOptions: { addWaypoints: false },
        }).addTo(mapRef.current);

        mapRef.current.setView(p1, 15)
    }

    function pegarLocalizacaoOrigem() {
        navigator.geolocation.getCurrentPosition((pos) => {
            setForm({
                ...form,
                lat1: pos.coords.latitude.toFixed(6),
                lng1: pos.coords.latitude.toFixed(6),
            });
        });
    }

    function pegarLocalizacaoDestino() {
        navigator.geolocation.getCurrentPosition((pos) => {
            setForm({
                ...form,
                lat2: pos.coords.latitude.toFixed(6),
                lng2: pos.coords.latitude.toFixed(6),
            })
        })
    }


    return (
        <main className="container">
            <form onSubmit={gerarRota} className="form">
                <h2 className="form-title">Gerar Rota</h2>

                <fieldset className="form-fieldset">
                    <legend className="form-legend">Origem</legend>

                    <label className="form-label">Latitude</label>
                    <input
                        type="number"
                        name="lat1"
                        step="any"
                        value={form.lat1}
                        onChange={(e) => setForm({ ...form, lat1: e.target.value })}
                    />

                    {errors.lat1 && <p className="error-message">{errors.lat1}</p>}

                    <label className="form-label">Longitude</label>
                    <input
                        type="number"
                        name="lng1"
                        step="any"
                        value={form.lng1}
                        onChange={(e) => setForm({ ...form, lng1: e.target.value })}
                        className="form-input"
                    />

                    {errors.lng1 && <p className="error-message">{errors.lng1}</p>}

                    <button type="button" onClick={pegarLocalizacaoOrigem} className="location-btn">
                        Usar minha localização atual
                    </button>
                </fieldset>

                <fieldset className="form-fieldset">
                    <legend className="form-legend">Destino</legend>

                    <label className="form-label">Latitude</label>
                    <input
                        type="number"
                        name="lat2"
                        step="any"
                        value={form.lat2}
                        onChange={(e) => setForm({ ...form, lat2: e.target.value })}
                        className="form-input"
                    />

                    {errors.lat2 && <p className="error-message">{errors.lat2}</p>}

                    <label className="form-label">Longitude</label>
                    <input
                        type="number"
                        name="lng2"
                        value={form.lng2}
                        onChange={(e) => setForm({ ...form, lng2: e.target.value })}
                        className="form-input"
                    />

                    {errors.lng2 && <p className="error-message">{errors.lng2}</p>}

                    <button type="button" onClick={pegarLocalizacaoDestino} className="location-btn">
                        Usar minha localização atual
                    </button>
                </fieldset>

                <button type="submit" className="submit-btn">
                    Gerar rota
                </button>
            </form>

            <div id="mapa" className="map"></div>
        </main>
    )

}

export default GeolocalizacaoMapa;