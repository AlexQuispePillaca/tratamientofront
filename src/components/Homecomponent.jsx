import React from 'react';
import styled from 'styled-components';

export function Homecomponent() {
  return (
    <HomeComponentContainer>
      {/* Sección de Noticias */}
      <Section>
        <SectionTitle>Noticias Recientes</SectionTitle>
        <Card>
          <CardTitle>MINSA Inicia Campaña de Vacunación</CardTitle>
          <CardDate>3 de Noviembre, 2024</CardDate>
          <CardContent>
            El Ministerio de Salud ha lanzado una nueva campaña de vacunación nacional contra la influenza. La campaña se llevará a cabo en todo el país y busca inmunizar a la población de riesgo antes de la temporada de lluvias.
          </CardContent>
        </Card>

        <Card>
          <CardTitle>MINSA Publica Nuevas Medidas para la Prevención del Dengue</CardTitle>
          <CardDate>1 de Noviembre, 2024</CardDate>
          <CardContent>
            Para reducir el impacto del dengue, el Ministerio de Salud ha implementado una serie de medidas preventivas que incluyen la fumigación en áreas urbanas y rurales. La participación de la ciudadanía es esencial para mantener los hogares libres de criaderos de mosquitos.
          </CardContent>
        </Card>

        <Card>
          <CardTitle>MINSA Reporta Aumento en la Tasa de Vacunación Infantil</CardTitle>
          <CardDate>30 de Octubre, 2024</CardDate>
          <CardContent>
            El MINSA informó un incremento significativo en la tasa de vacunación infantil. Gracias a los esfuerzos conjuntos de profesionales de la salud y padres de familia, la cobertura de vacunación ha alcanzado niveles históricos.
          </CardContent>
        </Card>
      </Section>

      {/* Sección de Enunciados */}
      <Section>
        <SectionTitle>Enunciados Importantes</SectionTitle>
        <Card>
          <CardTitle>Reunión de Coordinación con el MINSA</CardTitle>
          <CardContent>
            Recordatorio: La reunión de coordinación con el Ministerio de Salud para discutir el plan de vacunación 2024-2025 se llevará a cabo el 15 de noviembre a las 10:00 am en el auditorio principal.
          </CardContent>
        </Card>

        <Card>
          <CardTitle>Entrega de Reportes Mensuales</CardTitle>
          <CardContent>
            Recordatorio: Los reportes de actividades mensuales deben ser entregados al MINSA antes del 5 de cada mes. Asegúrate de cumplir con el formato solicitado para agilizar el proceso de revisión.
          </CardContent>
        </Card>

        <Card>
          <CardTitle>Sesión de Capacitación sobre Enfermedades Transmitidas por Mosquitos</CardTitle>
          <CardContent>
            Recordatorio: Se realizará una capacitación sobre la prevención de enfermedades transmitidas por mosquitos. Fecha: 20 de noviembre, 2024. Lugar: Centro de Convenciones del MINSA.
          </CardContent>
        </Card>
      </Section>
    </HomeComponentContainer>
  );
}

const HomeComponentContainer = styled.div`
  padding: 20px;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: ${(props) => props.theme.text};
  margin-bottom: 20px;
`;

const Card = styled.div`
  color: ${(props) => props.theme.text};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 22px;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
`;

const CardDate = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
`;

const CardContent = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

export default Homecomponent;
