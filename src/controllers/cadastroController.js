import cadastro from "../models/dados.js";

export const getAll = (req, res) => {
    res.status(200).json({
        total: cadastro.length,
        mensagem: "Lista de cadastro convocada com sucesso!",
        cadastro
    });;
};

export const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const bruxo = cadastro.find(b => b.id === id);

    if (!bruxo) {
        return res.status(404).json({
            mensagem: "Nenhum bruxo foi encontrado no Beco Diagonal!"
        });
    }

    res.status(200).json(bruxo);
};

export const create = (req, res) => {
    const { nome, idade, casa } = req.body;

    if (!nome || !idade || !casa) {
     return res.status(400).json({
        mensagem: "Feitiço mal executado! Verifique os ingredientes!"
     });

    }

    const existe = cadastro.find(b => b.nome.toLocaleLowerCase() === nome.toLocaleLowerCase());
    if (existe) {
        return res.status(409).json({
            mensagem: "Já existe um bruxo com esse nome!"
        });
    }

    const novoBruxo = {
        id: cadastro.length + 1,
        nome,
        idade,
        casa
    };

    cadastro.push(novoBruxo);

    res.status(201).json({
        mensagem: "Novo bruxo matriculado em Hogwarts!",
        bruxo: novoBruxo
    });

    };

    export const update = (req, res) => {
        const id = parseInt(req.params.id);
        const { nome, casa, idade } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({
                mensagem: "Id inválido, use apenas números!"
            });
        }

        let bruxoEncontrado = null;

        for (let i = 0; i < cadastro.length; i++) {
            if (cadastro[i].id === id) {
                if (nome) cadastro[i].nome = nome;
                if (casa) cadastro[i].casa = casa;
                if (idade) cadastro[i].idade = idade;

                bruxoEncontrado = cadastro[i];
                break
            }
        }

        if (!bruxoEncontrado) {
            return res.status(404).json({
               mensagem: "Não é possível reparar o que não existe!" 
            });       
        }

        res.status(200).json({
            mensage: "Bruxo atualizado com sucesso!",
            bruxo: bruxoEncontrado
        });
    };

    export const remove = (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const cadastroParaApagar = cadastro.find(c => c.id === idParaApagar);
    console.log(cadastroParaApagar)

    if (!cadastroParaApagar) {
        return res.status(404).json({
            success: false,
            message: "Cadastro id não existe"
        });
    }

    const cadastroFiltrado = cadastro.filter(c => c.id !== idParaApagar);
    console.log(cadastroFiltrado)

    cadastro.splice(0, cadastro.length, ...cadastroFiltrado);

    return res.status(200).json({
        success: true,
        message: "O Cadastro foi removido com sucesso! 🗑️"
    });
}