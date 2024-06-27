(function () {

    const estados = document.querySelector("#estados");
    const cidades = document.querySelector("#cidades");
    const descricaoContainer = document.querySelector("#descricao");
    const main = document.querySelector('main');
    const pesquisarMapsBtn = document.querySelector("#pesquisar-maps");
    let estadoSelecionado = null;
    let cidade = null;
    let nomeEstado = null;


    estados.addEventListener('change', (e) => {

    
        let nomeMunicipio = "";



        const UF = e.target.value;

        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.statusText}`);
                }
                return response.json();
            })
            .then(municipios => {

                municipios.forEach(municipio => {
                    const option = document.createElement("option");
                    option.innerHTML = municipio.nome;
                    option.value = municipio.id;

                    cidades.appendChild(option);

                    const caminho = `../img/${UF}.png`
                    const url = `url(${caminho})`;

                    //Muda o background conforme o estado selecionado
                    main.style.backgroundImage = url;



                    descricaoContainer.innerHTML = `Estado: ${estadoSelecionado}`;

                    cidade = cidades.options[cidades.selectedIndex].text;
                    descricaoContainer.innerHTML = `Estado: ${estadoSelecionado} | Município: ${cidade}`;

                    estadoSelecionado = estados.options[estados.selectedIndex].text;


                });

                cidades.removeAttribute("disabled");
                pesquisarMapsBtn.removeAttribute("disabled");


            })
            .catch(error => {
                console.error('Erro ao buscar cidades:', error);
            });
    });

    cidades.addEventListener('change', (e) => {

        cidade = cidades.options[cidades.selectedIndex].text;
        descricaoContainer.innerHTML = `Estado: ${estadoSelecionado} | Município: ${cidade}`;

    });

    
    pesquisarMapsBtn.addEventListener('click', () => {

        nomeEstado = estados.options[estados.selectedIndex].text;

        if(nomeEstado === null) return;

        let query = "";

        query += `${nomeEstado}`;
        if(cidade) query += `,${cidade}`;



        const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
        console.log(query)
        window.open(url, '_blank');
    });





})();
