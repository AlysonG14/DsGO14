import { useState } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [refresh, setRefresh] = useState(0)




  // criar uma variável de concluir missão para criar novos dados para enviar dentro de um js dos dadosMissao
  const concluirMissao = (id) => {
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const m = missoes.find((ms) => ms.id === id);
    const figurinha = {
      id: m.id,
      nome: m.missao,
      imagem: m.figurinha || '/src/assets/trofeu.png',
    }
    if(!inventario.some((f) => f.id === id)){
      inventario.push(figurinha);
      localStorage.setItem("inventário", JSON.stringify(inventario))
    }

    setMissaoSelecionada(null);
    setRefresh((r) => r + 1)
  }





  return (
    <section className='conteiner'>
      <h2>Missões</h2>
      <div className="missoes-grid">
        {missoes.map((m) => (
          <MissaoCard
            key={`${m.id} - ${refresh}`} 
            missao={m}  
            onIniciarMissao={setMissaoSelecionada} 
            concluida={missoesConcluidas.includes(m.id)} 
          />
        ))}
      </div>

      {missaoSelecionada && (
        <MissaoModal 
          missao={missaoSelecionada} 
          onClose={() => setMissaoSelecionada(null)} 
          onConcluir={() => concluirMissao(missaoSelecionada.id)} 
        />
      )}
    </section>
  );
}
