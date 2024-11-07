import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function PopupBusqueda({ tipo, onClose, onSelect }) {
    const [filtros, setFiltros] = useState({
        codigo: '',
        nombre: '',
        tipo: '',
        presentacion: '', // Solo aplica para medicamentos
        petitorio: '' // Solo aplica para medicamentos
    });

    const [datos, setDatos] = useState([]);
    const [pagina, setPagina] = useState(0); // Página empieza en 0
    const [totalPaginas, setTotalPaginas] = useState(1);

    // Función para construir la URL de la API con filtros y paginación
    const construirUrl = () => {
        let baseUrl;

        // Definimos la URL base según el tipo de datos (medicamentos, insumos, procedimientos, diagnósticos)
        if (tipo === 'medicamentos') {
            baseUrl = 'http://3.94.255.245/api/medicamentos/filtro?';
        } else if (tipo === 'insumos') {
            baseUrl = 'http://3.94.255.245/api/insumos/filtro?';
        } else if (tipo === 'procedimientos') {
            baseUrl = 'http://3.94.255.245/api/procedimientos/filtro?';
        } else if (tipo === 'diagnosticos') {
            baseUrl = 'http://3.94.255.245/api/diagnosticos/filtro?';  // Nueva URL para diagnósticos
        }

        const params = [];
        Object.keys(filtros).forEach((key) => {
            if (filtros[key]) {
                params.push(`${key}=${filtros[key]}`);
            }
        });

        // Añadir paginación a la URL
        params.push(`page=${pagina}`);
        params.push(`size=10`);  // Mostramos 10 elementos por página

        return baseUrl + params.join('&');
    };

    // Función para obtener los datos de la API
    const obtenerDatos = async () => {
        try {
            const url = construirUrl();
            console.log('Generated API URL:', url);  // Verifica la URL que estás usando
            const response = await axios.get(url);

            console.log('API Response Data:', response.data);  // Verifica si los datos llegan bien desde la API

            // Los datos paginados vienen en `content`, la cantidad total de páginas en `totalPages`
            setDatos(response.data.content);
            setTotalPaginas(response.data.totalPages);
        } catch (error) {
            console.error('Error obteniendo datos de la API', error);
        }
    };

    // Llamamos a la API cuando el componente se monta o cuando los filtros/página cambian
    useEffect(() => {
        obtenerDatos();
    }, [filtros, pagina]);

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleSeleccionar = (item) => {
        onSelect(item);  // Envía el valor seleccionado al componente padre
        onClose();  // Cierra el popup después de seleccionar un ítem
    };

    const siguientePagina = () => {
        if (pagina < totalPaginas - 1) {
            setPagina(pagina + 1);
        }
    };

    const anteriorPagina = () => {
        if (pagina > 0) {
            setPagina(pagina - 1);
        }
    };

    // Función para mapear los datos correctamente según el tipo
    const mapeoDatos = (item) => {
        if (tipo === 'medicamentos') {
            return [
                item.codigoMedicamento || 'N/A',
                item.nombreMedicamento || 'N/A',
                item.tipoMedicamento || 'N/A',
                item.presentacionMedicamento || 'N/A',
                item.petitorioMedicamento || 'N/A'
            ];
        } else if (tipo === 'insumos') {
            return [
                item.codigoInsumo || 'N/A',
                item.nombreInsumo || 'N/A',
                item.tipoInsumo || 'N/A'
            ];
        } else if (tipo === 'procedimientos') {
            return [
                item.codigoProcedimiento || 'N/A',
                item.nombreProcedimiento || 'N/A'
            ];
        } else if (tipo === 'diagnosticos') {
            return [
                item.codigoDiagnostico || 'N/A',
                item.nombreDiagnostico || 'N/A',
                item.estadoDiagnostico || 'N/A'  // Mapeo de diagnósticos
            ];
        }
        return [];
    };

    // Definimos las columnas que se mostrarán en la tabla según el tipo
    const columnas = {
        medicamentos: ["Código", "Nombre", "Tipo", "Presentación", "Petitorio"],
        insumos: ["Código", "Nombre", "Tipo"],
        procedimientos: ["Código", "Nombre"],
        diagnosticos: ["Código", "Nombre", "Estado"]  // Columnas para diagnóstico
    };

    return (
        <PopupContainer>
            <div className="popup-content">
                <h4>Búsqueda de {tipo}</h4>

                {/* Filtros */}
                <div className="filter-group">
                    {columnas[tipo].map((col, index) => (
                        <div key={index} className="filter-item">
                            <label>{col}:</label>
                            <input
                                type="text"
                                name={col.toLowerCase()}
                                value={filtros[col.toLowerCase()] || ''}
                                onChange={handleFiltroChange}
                            />
                        </div>
                    ))}
                </div>

                {/* Tabla de resultados */}
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                {columnas[tipo].map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {datos.length === 0 ? (
                                <tr>
                                    <td colSpan={columnas[tipo].length}>No se encontraron resultados</td>
                                </tr>
                            ) : (
                                datos.map((item, index) => (
                                    <tr key={index} onClick={() => handleSeleccionar(item)}>
                                        {mapeoDatos(item).map((val, idx) => (
                                            <td key={idx}>{val}</td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="pagination">
                    <button onClick={anteriorPagina} disabled={pagina === 0}>
                        Anterior
                    </button>
                    <span>Página {pagina + 1} de {totalPaginas}</span>
                    <button onClick={siguientePagina} disabled={pagina >= totalPaginas - 1}>
                        Siguiente
                    </button>
                </div>

                <button onClick={onClose}>Cerrar</button>
            </div>
        </PopupContainer>
    );
}

// Estilos del Popup
const PopupContainer = styled.div`
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    background-color: white;
    padding: 20px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    z-index: 10;

    .popup-content {
        max-width: 600px;
        h4 {
            margin-bottom: 20px;
        }

        .filter-group {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }

        .filter-item {
            display: flex;
            flex-direction: column;
        }

        .table-container {
            max-height: 300px;
            overflow-y: auto;
        }

        table {
            width: 100%;
            margin-top: 20px;
            th, td {
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            tr:hover {
                background-color: #f1f1f1;
                cursor: pointer;
            }
        }

        .pagination {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }

        button {
            margin-top: 20px;
            padding: 10px;
        }
    }
`;
