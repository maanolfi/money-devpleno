import React from "react";
import { Link } from "react-router-dom";
import Rest from "../../utils/rest";

const baseUrl = "https://mymoney-devpleno.firebaseio.com/";
const { useGet, usePost, useDelete } = Rest(baseUrl);

export default function Meses() {
  const data = useGet("meses");
  return (
    <>
      {data.loading && <span>Carregando...</span>}
      {Object.keys(data.data).length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Mês</th>
              <th>Previsão entrada</th>
              <th>Entrada</th>
              <th>Previsão saida</th>
              <th>Saida</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.data).map(mes => {
              return (
                <tr key={mes}>
                  <td>
                    <Link to={`/movimentacoes/${mes}`}>{mes}</Link>
                  </td>
                  <td>{data.data[mes].previsao_entrada}</td>
                  <td>{data.data[mes].entrada}</td>
                  <td>{data.data[mes].previsao_saida}</td>
                  <td>{data.data[mes].saida}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
