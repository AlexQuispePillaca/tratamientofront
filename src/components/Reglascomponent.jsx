import React from 'react';
import styled from 'styled-components';

export function Reglascomponent() {
  const handleDownloadClick = () => {
    window.open("https://www.sis.gob.pe/ipresspublicas/miradorgrep.html", "_blank");
  };

  return (
    <ReglasComponentContainer>
      <h2>Acceso a Documentos del SIS</h2>
      <p>Consulta y descarga los documentos del Sistema Integral de Salud (SIS) desde el siguiente enlace:</p>

      {/* Mostrar el contenido de la página en un iframe */}
      <IframeContainer>
        <iframe
          src="https://www.sis.gob.pe/ipresspublicas/miradorgrep.html"
          title="Mirador GREP SIS"
          width="100%"
          height="600px"
          frameBorder="0"
        />
      </IframeContainer>

      {/* Botón para descargar archivos */}
      <DownloadButton onClick={handleDownloadClick}>
        Ir a la página para descargar archivos
      </DownloadButton>
    </ReglasComponentContainer>
  );
}

const ReglasComponentContainer = styled.div`
  padding: 20px;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
`;

const IframeContainer = styled.div`
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const DownloadButton = styled.button`
  background-color: #1D6F42;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #155C35;
  }
`;

export default Reglascomponent;
