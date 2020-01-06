import React from "react";

import Meses from "./Meses";
import AdicionarMes from "./AdicionarMes";

export default function Home() {
  return (
    <div className="container">
      <AdicionarMes />
      <Meses />
    </div>
  );
}
