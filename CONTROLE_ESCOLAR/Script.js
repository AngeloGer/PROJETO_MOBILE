let arrayAlunos = [];
let idAluno = 1;
let tabelaAlunos = document.getElementById("tabelaAlunos");

function cadastrarAluno() {
    let nomeAluno = document.getElementById("nomeAluno").value;
    let idadeAluno = document.getElementById("idadeAluno").value;
    let notaAluno = document.getElementById("notaAluno").value;
    let descAluno = document.getElementById("descAluno").value;

    if (notaAluno > 10 || notaAluno < 0 || nomeAluno === "" || idadeAluno <= 0) {
        alert("Dados incorretos ou incompletos, digite novamente");
        return;
    }

    let statusAluno = notaAluno >= 6 ? "Aprovado" : "Reprovado";
    
    let objAluno = {
        id: idAluno,
        nome: nomeAluno,
        idade: idadeAluno,
        nota: notaAluno,
        status: statusAluno,
        desc: descAluno
    };

    arrayAlunos.push(objAluno);
    idAluno++;

    renderDadosTabela(objAluno);
    salvarDados();
    infoFinais();

    document.getElementById("nomeAluno").value = "";
    document.getElementById("idadeAluno").value = "";
    document.getElementById("notaAluno").value = "";
    document.getElementById("descAluno").value = "";

    console.log(arrayAlunos);
}

function salvarDados() {
    localStorage.setItem("dados", JSON.stringify(arrayAlunos));
    localStorage.setItem("ultId", idAluno.toString());
    console.log("Os dados foram salvos.");
}

function carregarDados() {
    const dadosSalvos = localStorage.getItem("dados");
    const ultIdSalvo = localStorage.getItem("ultId");

    if (dadosSalvos) {
        arrayAlunos = JSON.parse(dadosSalvos);
        idAluno = ultIdSalvo ? Number(ultIdSalvo) : 1;

        arrayAlunos.forEach(aluno => {
            renderDadosTabela(aluno);
        });

        infoFinais();
        console.log("Os dados salvos foram carregados.");
    }
}

function renderDadosTabela(objAluno) {
    let linhaTabela = document.createElement("tr");
    linhaTabela.setAttribute("data-id", objAluno.id);

    linhaTabela.innerHTML = `
        <td>${objAluno.nome}</td>
        <td>${objAluno.idade}</td>
        <td>${objAluno.nota}</td>
        <td>${objAluno.status}</td>
        <td>
        <button onclick="deletarAluno(this)">Deletar</button>
        <button onclick="mostrarDesc(this)">Detalhes</button>
        </td>
    `

    tabelaAlunos.appendChild(linhaTabela);
}

function infoFinais() {
    let totalAlunos = document.getElementById("totalAlunoCad");
    let mediaAlunos = document.getElementById("medNotaAluno");
    let totalAprov = document.getElementById("totalAlunoApr");
    let totalReprov = document.getElementById("totalAlunoRep");
    const total = arrayAlunos.length;

    let somaNotas = arrayAlunos.reduce((i, aluno) => i + Number(aluno.nota), 0);
    let media = total > 0 ? (somaNotas / total).toFixed(2) : 0;

    let quantAprov = arrayAlunos.filter(aluno => aluno.status === "Aprovado").length;
    let quantReprov = total - quantAprov;

    totalAlunos.textContent = total;
    mediaAlunos.textContent = media;
    totalAprov.textContent = quantAprov;
    totalReprov.textContent = quantReprov;
}

function deletarAluno(botao) {
    let linha = botao.parentElement.parentElement;
    let idSelecionado = Number(linha.getAttribute("data-id"));
    arrayAlunos = arrayAlunos.filter(aluno => aluno.id !== idSelecionado);

    salvarDados();
    infoFinais();
    linha.remove();

    console.log("Array atualizado:", arrayAlunos);
}

function mostrarDesc(botao) {
    let linha = botao.parentElement.parentElement;
    let idSelecionado = Number(linha.getAttribute("data-id"));
    let alunoEncontrado = arrayAlunos.find(aluno => aluno.id === idSelecionado);

    if (alunoEncontrado) {
        alert(alunoEncontrado.desc || "Nenhuma informação adicional.");
    }
}

carregarDados();