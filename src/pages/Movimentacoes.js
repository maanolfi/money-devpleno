import React, { useState } from "react";

import Rest from "../utils/rest";

const baseUrl = "https://mymoney-devpleno.firebaseio.com/";
const { useGet, usePost, useDelete } = Rest(baseUrl);

export default function Movimentacoes({ match }) {
  const data = useGet(`movimentacoes/${match.params.data}`);
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`);
  const [removerData, remover] = useDelete();
  // controlled form
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const onChangeDescricao = e => {
    setDescricao(e.target.value);
  };
  const onChangeValor = e => {
    setValor(e.target.value || "");
  };
  const salvarMovimentacao = async () => {
    if (valor !== "") {
      await salvar({
        descricao,
        valor
      });
      setDescricao("");
      setValor("");
      data.refetch();
    }
  };

  const removerMovimentacao = async id => {
    await remover(`movimentacoes/${match.params.data}/${id}`);
    data.refetch();
  };

  return (
    <div className="container">
      <h1>Movimentações</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.data &&
            Object.keys(data.data).map(movimentacao => {
              return (
                <tr key={movimentacao}>
                  <td>{data.data[movimentacao].descricao}</td>
                  <td className="text-right">
                    {data.data[movimentacao].valor}
                    <button
                      className="btn btn-danger"
                      onClick={() => removerMovimentacao(movimentacao)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              );
            })}

          <tr>
            <td>
              <input
                type="text"
                value={descricao}
                onChange={onChangeDescricao}
              ></input>
            </td>
            <td>
              <input
                type="number"
                value={valor}
                onChange={onChangeValor}
              ></input>
              <button className="btn btn-success" onClick={salvarMovimentacao}>
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
