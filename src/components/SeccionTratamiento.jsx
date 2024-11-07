import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import PopupBusqueda from './PopupBusqueda';

// Usamos forwardRef para manejar la referencia desde el componente padre
const SeccionTratamiento = forwardRef(({ titulo, tipo }, ref) => {
    const [isOpen, setIsOpen] = useState(true);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupIndex, setPopupIndex] = useState(null); // Para saber en qué input estamos
    const [codigos, setCodigos] = useState(Array(10).fill("")); // Para los códigos
    const [detalles, setDetalles] = useState(Array(10).fill("")); // Para el resto de los detalles

    // Función para limpiar los campos de la sección
    const limpiarCampos = () => {
        setCodigos(Array(10).fill("")); // Limpiar códigos
        setDetalles(Array(10).fill("")); // Limpiar detalles
    };

    // Función para actualizar los campos con los datos recibidos de la API de Java
    const actualizarCampos = (resultados, tipo) => {
        const nuevosCodigos = resultados.map((resultado) => {
            if (tipo === 'medicamentos') {
                return resultado.codigoMedicamento;
            } else if (tipo === 'insumos') {
                return resultado.codigoInsumo;
            } else if (tipo === 'procedimientos') {
                return resultado.codigoProcedimiento;
            }
            return '';
        });

        const nuevosDetalles = resultados.map((resultado) => {
            if (tipo === 'medicamentos') {
                return `${resultado.nombreMedicamento} | ${resultado.tipoMedicamento} | ${resultado.presentacionMedicamento || ''} | ${resultado.petitorioMedicamento}`;
            } else if (tipo === 'insumos') {
                return `${resultado.nombreInsumo} | ${resultado.tipoInsumo}`;
            } else if (tipo === 'procedimientos') {
                return `${resultado.nombreProcedimiento}`;
            }
            return '';
        });

        // Actualiza los valores en las cajas de código y detalles
        setCodigos([...nuevosCodigos, ...Array(10 - nuevosCodigos.length).fill('')]);
        setDetalles([...nuevosDetalles, ...Array(10 - nuevosDetalles.length).fill('')]);
    };

    // Función para capturar los valores de medicamentos, insumos y procedimientos
    const obtenerValores = () => {
        return codigos.map((codigo, index) => ({
            codigo,
            detalle: detalles[index]
        })).filter(item => item.codigo !== "");
    };

    // Exponemos las funciones limpiarCampos, actualizarCampos y obtenerValores al componente padre
    useImperativeHandle(ref, () => ({
        limpiarCampos,
        actualizarCampos,
        obtenerValores
    }));

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const abrirPopup = (index) => {
        setPopupIndex(index); // Guardamos qué input fue el que abrió el popup
        setPopupOpen(true);   // Abrimos el popup
    };

    const cerrarPopup = () => {
        setPopupOpen(false); // Cerramos el popup
    };

    const handleSeleccion = (valorSeleccionado) => {
        let nuevosCodigos = [...codigos];
        let nuevosDetalles = [...detalles];

        // Dependiendo del tipo, seleccionamos la propiedad correcta del objeto
        if (tipo === 'medicamentos') {
            nuevosCodigos[popupIndex] = valorSeleccionado.codigoMedicamento || 'N/A';
            nuevosDetalles[popupIndex] = `${valorSeleccionado.nombreMedicamento} | ${valorSeleccionado.tipoMedicamento} | ${valorSeleccionado.presentacionMedicamento || ''} | ${valorSeleccionado.petitorioMedicamento}`;
        } else if (tipo === 'insumos') {
            nuevosCodigos[popupIndex] = valorSeleccionado.codigoInsumo || 'N/A';
            nuevosDetalles[popupIndex] = `${valorSeleccionado.nombreInsumo} | ${valorSeleccionado.tipoInsumo}`;
        } else if (tipo === 'procedimientos') {
            nuevosCodigos[popupIndex] = valorSeleccionado.codigoProcedimiento || 'N/A';
            nuevosDetalles[popupIndex] = `${valorSeleccionado.nombreProcedimiento}`;
        }

        setCodigos(nuevosCodigos);
        setDetalles(nuevosDetalles);
        cerrarPopup(); // Cerramos el popup después de seleccionar
    };

    return (
        <SeccionContainer>
            <h3 onClick={toggleOpen}>{titulo}</h3>
            {isOpen && (
                <div className="inputs-group">
                    {codigos.map((codigo, index) => (
                        <div key={index} className="input-item">
                            <label>{`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${index + 1}`}</label>
                            <input
                                type="text"
                                value={codigo}
                                placeholder="Código"
                                onChange={(e) => {
                                    const nuevosCodigos = [...codigos];
                                    nuevosCodigos[index] = e.target.value;
                                    setCodigos(nuevosCodigos);
                                }}
                            />
                            <input
                                type="text"
                                value={detalles[index]}
                                placeholder="Detalles"
                                onChange={(e) => {
                                    const nuevosDetalles = [...detalles];
                                    nuevosDetalles[index] = e.target.value;
                                    setDetalles(nuevosDetalles);
                                }}
                            />
                            <button onClick={() => abrirPopup(index)}>Buscar</button> {/* Botón para abrir el popup */}
                        </div>
                    ))}
                </div>
            )}

            {/* Mostrar el popup cuando esté abierto */}
            {popupOpen && (
                <PopupBusqueda tipo={tipo} onClose={cerrarPopup} onSelect={handleSeleccion} />
            )}
        </SeccionContainer>
    );
});

// Estilos de la sección
const SeccionContainer = styled.div`
    margin-bottom: 20px;
    h3 {
        cursor: pointer;
    }
    .inputs-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
    .input-item {
        display: flex;
        flex-direction: column;
        label {
            margin-bottom: 5px;
        }
        input {
            margin-bottom: 5px;
        }
        button {
            margin-top: 5px;
        }
    }
`;

export default SeccionTratamiento;



