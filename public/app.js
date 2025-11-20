//selencionando os elementos do HTML
document.addEventListener("DOMContentLoaded", () => {
    const co2Span = document.getElementById("co2Value");
    const statusSpan = document.getElementById("status");
    const alertList = document.getElementById("alertList");
    const co2Display = document.getElementById("co2-display");
    //flag para evitar múltiplas chamadas
    let atualizando = false;

    //função para atualizar o dashboard
    async function atualizarLeitura() {
        if(atualizando) return; //se ainda está atualizando não faz nada
        atualizando = true;

        //piscador de teste: muda de cor rapidamente
        co2Display.style.backgroundColor = "yellow";
        setTimeout(() => {
            co2Display.style.backgroundColor = "";
        }, 3000);

        try {
            // Buscando o último registro de leitura
            const responseLeitura = await fetch("/ultima-leitura");
            if(!responseLeitura.ok) throw new Error("Erro ao buscar leitura");
            
            const dadosLeitura = await responseLeitura.json();
            const co2 = dadosLeitura.co2;
            const limite = dadosLeitura.maxCo2 || 1000;

            //atualiza o valor do co2
            co2Span.textContent = co2;

            //atualiza o status com cores (classe .ok ou .alert)
            if(co2 > limite) {
                statusSpan.textContent = "ACIMA DO LIMITE!";
                statusSpan.className = "alert";
            } else {
                statusSpan.textContent = "OK";
                statusSpan.className = "ok";
            }

        } catch (error) {
            console.error(error);
            co2Span.textContent = "--";
            statusSpan.textContent = "Erro";
            statusSpan.className = "alert";
            alertList.innerHTML = "<li>Não foi possível carregar os alertas</li>"
        } finally {
            atualizando = false;
        }
    }
    //atualiza a cada minuto
    atualizarLeitura(); //chama imediatamente
    setInterval(atualizarLeitura, 10000);
});



