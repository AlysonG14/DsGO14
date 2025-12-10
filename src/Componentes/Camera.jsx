import React from "react";
import { useState, useEffect, useRef } from "react";

export function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [foto, setFoto] = useState(null);
  const [onFotoTirada, setOnFotoTirada] = useState(null)

  const imagem = null

  useEffect(() => {
    iniciarCamera();
  }, []);

  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera", error);
    }
  };

  const tirarFoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imagem = canvas.toDataURL("src\assets\camera_imgs");
    setFoto(imagem);

    console.log(imagem)

    const link = document.createElement('a')
    link.download = 'camera.png' // função download para baixar a imagem 
    link.href = imagem // pegar o elemento canvas
    link.click() // permitir que o clique gera o download

    // if (onFotoTirada) {
      // onFotoTirada(imagem);
    // }
  };

  // const download = () => {
    // const link = document.createElement('a')
    // link.download = 'filename.png' // função download para baixar a imagem 
    // link.href = document.getElementById('canvas').toDataURL('image/png') // pegar o elemento canvas
    // link.click() // permitir que o clique gera o download
  // }

  const reiniciar = () => {
    setFoto(null);
    iniciarCamera();
  };

  return (
    <>
      <section className="card_camera">
        <h2>Captura a imagem por Camera</h2>
        <div className="camera">
            {!foto ?
            (<video ref={videoRef} autoPlay playsInline />):
            (<img src={foto} alt="Foto capturada"/>)}
        </div>
        <div>
            {!foto ?
            (<button type="button" onClick={tirarFoto}>Tirar Foto</button>):
            (<button type="button" onClick={reiniciar}>Nova Foto</button>)}
        </div>
        <canvas ref={canvasRef} style={{display: "none"}}></canvas>      

      </section>
    </>
  );
}

export default Camera;
