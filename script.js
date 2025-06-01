const apiUrl = "https://script.google.com/macros/s/AKfycbx.../exec"; // Reemplaza por tu URL

async function consultarDeudas() {
  const dni = document.getElementById("dniInput").value.trim();
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "Consultando...";

  if (!dni) {
    resultadosDiv.innerHTML = "<p>Por favor ingresa un DNI válido.</p>";
    return;
  }

  try {
    const response = await fetch(`${apiUrl}?dni=${dni}`);
    const data = await response.json();

    if (data.length === 0) {
      resultadosDiv.innerHTML = "<p>No se encontraron deudas para este DNI.</p>";
      return;
    }

    let agrupado = {};
    data.forEach(item => {
      if (!agrupado[item.categoria]) agrupado[item.categoria] = [];
      agrupado[item.categoria].push(item.deuda);
    });

    let html = `<h3>Resultados para: ${data[0].nombre}</h3>`;
    for (const categoria in agrupado) {
      const total = agrupado[categoria].reduce((a, b) => a + Number(b), 0);
      html += `
        <div class="categoria">
          <strong>${categoria}:</strong> S/ ${total.toFixed(2)}
        </div>
      `;
    }

    resultadosDiv.innerHTML = html;

  } catch (error) {
    resultadosDiv.innerHTML = "<p>Error al consultar. Intenta más tarde.</p>";
    console.error("Error:", error);
  }
}