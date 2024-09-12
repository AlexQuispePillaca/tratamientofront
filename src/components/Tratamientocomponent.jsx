import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeContext } from "../App"; 

export function Tratamientocomponent() {
    
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInputType, setSelectedInputType] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [searchParams, setSearchParams] = useState({
    codigo: '',
    nombre: '',
    estado: ''
  });

  const [inputValues, setInputValues] = useState({
    medicamentos: Array(10).fill(''),
    insumos: Array(10).fill(''),
    procedimientos: Array(10).fill('')
  });

  const [personalData, setPersonalData] = useState({
    edad: '',
    sexo: '',
    gestante: '',
    diagnostico: ''
  });

  // Abre el popup de búsqueda
  const handleOpenDialog = (inputType) => {
    setSelectedInputType(inputType);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Función para buscar por código, nombre y estado
  const handleSearch = () => {
    setSearchResults(`Resultados para ${selectedInputType} con los parámetros: Código ${searchParams.codigo}, Nombre ${searchParams.nombre}, Estado ${searchParams.estado}`);
    // Aquí iría la lógica para realizar la búsqueda (API, etc.)
  };

  const handleInputChange = (e, index, type) => {
    const newValues = [...inputValues[type]];
    newValues[index] = e.target.value;
    setInputValues({ ...inputValues, [type]: newValues });
  };

  const handlePersonalDataChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };

  const handleSearchParamChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  return (
    <TratamientoContainer>
      {/* Sección de Datos Personales */}
      <PersonalSection>
        <Subtitle>Datos del Paciente</Subtitle>
        <InputGroup>
          <TextField
            label="Edad"
            name="edad"
            value={personalData.edad}
            onChange={handlePersonalDataChange}
            variant="outlined"
            fullWidth
          />
        </InputGroup>
        <InputGroup>
          <TextField
            select
            label="Sexo"
            name="sexo"
            value={personalData.sexo}
            onChange={handlePersonalDataChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="femenino">Femenino</MenuItem>
          </TextField>
        </InputGroup>
        <InputGroup>
          <TextField
            select
            label="Gestante"
            name="gestante"
            value={personalData.gestante}
            onChange={handlePersonalDataChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="si">Sí</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </TextField>
        </InputGroup>
        <InputGroup>
          <TextField
            label="Diagnóstico"
            name="diagnostico"
            value={personalData.diagnostico}
            onChange={handlePersonalDataChange}
            variant="outlined"
            fullWidth
          />
        </InputGroup>
        <Button variant="contained" color="primary" fullWidth>
          Generar Tratamiento
        </Button>
      </PersonalSection>

      {/* Sección de Medicamentos, Insumos y Procedimientos */}
      <Section>
        <Subtitle>Medicamentos</Subtitle>
        {inputValues.medicamentos.map((value, index) => (
          <InputGroup key={`medicamento-${index}`}>
            <TextField
              label={`Medicamento ${index + 1}`}
              value={value}
              onChange={(e) => handleInputChange(e, index, 'medicamentos')}
              variant="outlined"
              fullWidth
            />
            <IconButton onClick={() => handleOpenDialog('medicamentos')}>
              <SearchIcon />
            </IconButton>
            <ResultLabel>{searchResults}</ResultLabel>
          </InputGroup>
        ))}
      </Section>

      <Section>
        <Subtitle>Insumos</Subtitle>
        {inputValues.insumos.map((value, index) => (
          <InputGroup key={`insumo-${index}`}>
            <TextField
              label={`Insumo ${index + 1}`}
              value={value}
              onChange={(e) => handleInputChange(e, index, 'insumos')}
              variant="outlined"
              fullWidth
            />
            <IconButton onClick={() => handleOpenDialog('insumos')}>
              <SearchIcon />
            </IconButton>
            <ResultLabel>{searchResults}</ResultLabel>
          </InputGroup>
        ))}
      </Section>

      <Section>
        <Subtitle>Procedimientos</Subtitle>
        {inputValues.procedimientos.map((value, index) => (
          <InputGroup key={`procedimiento-${index}`}>
            <TextField
              label={`Procedimiento ${index + 1}`}
              value={value}
              onChange={(e) => handleInputChange(e, index, 'procedimientos')}
              variant="outlined"
              fullWidth
            />
            <IconButton onClick={() => handleOpenDialog('procedimientos')}>
              <SearchIcon />
            </IconButton>
            <ResultLabel>{searchResults}</ResultLabel>
          </InputGroup>
        ))}
      </Section>

      {/* Popup para búsqueda */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{`Buscar ${selectedInputType}`}</DialogTitle>
        <DialogContent>
          {/* Inputs de búsqueda: Código, Nombre, Estado */}
          <TextField
            label="Código"
            name="codigo"
            value={searchParams.codigo}
            onChange={handleSearchParamChange}
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <TextField
            label="Nombre"
            name="nombre"
            value={searchParams.nombre}
            onChange={handleSearchParamChange}
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <TextField
            select
            label="Estado"
            name="estado"
            value={searchParams.estado}
            onChange={handleSearchParamChange}
            variant="outlined"
            fullWidth
            margin="dense"
          >
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearch}>Buscar</Button>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </TratamientoContainer>
  );
}

const TratamientoContainer = styled.div`
  padding: 20px;
`;

const PersonalSection = styled.div`
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #555;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ResultLabel = styled.label`
  margin-left: 10px;
  font-size: 14px;
  color: #666;
`;
