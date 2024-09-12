import React from 'react';
import styled from 'styled-components';

export function Homecomponent() {
  return (
    <HomeComponentContainer>
      {/* Sección de Noticias */}
      <Section>
        <SectionTitle>Noticias Recientes</SectionTitle>
        <Card>
          <CardTitle>Noticia 1</CardTitle>
          <CardDate>12 de Septiembre, 2024</CardDate>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </CardContent>
        </Card>

        <Card>
          <CardTitle>Noticia 2</CardTitle>
          <CardDate>10 de Septiembre, 2024</CardDate>
          <CardContent>
            Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed.
          </CardContent>
        </Card>

        <Card>
          <CardTitle>Noticia 3</CardTitle>
          <CardDate>8 de Septiembre, 2024</CardDate>
          <CardContent>
            Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam.
          </CardContent>
        </Card>
      </Section>

      {/* Sección de Enunciados */}
      <Section>
        <SectionTitle>Enunciados Importantes</SectionTitle>
        <Card>
          <CardTitle>Enunciado 1</CardTitle>
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </CardContent>
        </Card>

        <Card>
          <CardTitle>Enunciado 2</CardTitle>
          <CardContent>
            Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed.
          </CardContent>
        </Card>

        <Card>
          <CardTitle>Enunciado 3</CardTitle>
          <CardContent>
            Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam.
          </CardContent>
        </Card>
      </Section>
    </HomeComponentContainer>
  );
}

const HomeComponentContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: #fff;
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
  color: #333;
  margin-bottom: 10px;
`;

const CardDate = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const CardContent = styled.p`
  font-size: 16px;
  color: #555;
`;
