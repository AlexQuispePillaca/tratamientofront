import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import SeccionTratamiento from './SeccionTratamiento';
import axios from 'axios';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaFileExcel, FaFilePdf, FaSpinner } from 'react-icons/fa';
import PopupBusqueda from './PopupBusqueda';

export function Tratamientocomponent() {
    const [diagnosticoCodigo, setDiagnosticoCodigo] = useState("");
    const [diagnosticoNombreEstado, setDiagnosticoNombreEstado] = useState("");
    const [edad, setEdad] = useState("");
    const [sexo, setSexo] = useState("");
    const [gestante, setGestante] = useState("");
    const [dniPaciente, setDniPaciente] = useState("");  // DNI del paciente
    const [dniMedico, setDniMedico] = useState("");  // DNI del médico
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [medicamentos, setMedicamentos] = useState([]);
    const [insumos, setInsumos] = useState([]);
    const [procedimientos, setProcedimientos] = useState([]);

    const refMedicamentos = useRef(null);
    const refInsumos = useRef(null);
    const refProcedimientos = useRef(null);

    const limpiarFormulario = () => {
        setDiagnosticoCodigo("");
        setDiagnosticoNombreEstado("");
        setEdad("");
        setSexo("");
        setGestante("");
        setDniPaciente("");
        setDniMedico("");
        setMedicamentos([]);
        setInsumos([]);
        setProcedimientos([]);
        if (refMedicamentos.current) refMedicamentos.current.limpiarCampos();
        if (refInsumos.current) refInsumos.current.limpiarCampos();
        if (refProcedimientos.current) refProcedimientos.current.limpiarCampos();
    };

    const validarFormulario = () => {
        if (!diagnosticoCodigo || !edad || !sexo || !gestante || !dniPaciente || !dniMedico) {
            setError("Todos los campos son obligatorios.");
            return false;
        }
        if (isNaN(edad) || parseInt(edad) <= 0 || parseInt(edad) > 120) {
            setError("Por favor, ingrese una edad válida (entre 1 y 120 años).");
            return false;
        }
        if (sexo !== "1" && sexo !== "0") {
            setError("Por favor, seleccione un valor válido para el sexo.");
            return false;
        }
        if (gestante !== "1" && gestante !== "0") {
            setError("Por favor, seleccione un valor válido para gestante.");
            return false;
        }
        setError("");
        return true;
    };

    const solicitarTratamiento = () => {
        if (!validarFormulario()) {
            return;
        }
        setIsLoading(true);

        const sexoNumero = parseInt(sexo);
        const gestanteNumero = parseInt(gestante);
        const edadNumero = parseInt(edad);

        const data = {
            diagnostico: diagnosticoCodigo,
            edad: edadNumero,
            sexo: sexoNumero,
            gestante: gestanteNumero
        };

        axios.post('http://127.0.0.1:5000/predict', data)
            .then(response => {
                const prediccion = response.data.prediccion[0];
                axios.get(`http://3.94.255.245/api/equivalentes/prediccion/${prediccion}`)
                    .then(respuestaJava => {
                        const { medicamentos, insumos, procedimientos } = respuestaJava.data;
                        setMedicamentos(medicamentos);
                        setInsumos(insumos);
                        setProcedimientos(procedimientos);
                        if (refMedicamentos.current) refMedicamentos.current.actualizarCampos(medicamentos, 'medicamentos');
                        if (refInsumos.current) refInsumos.current.actualizarCampos(insumos, 'insumos');
                        if (refProcedimientos.current) refProcedimientos.current.actualizarCampos(procedimientos, 'procedimientos');
                    })
                    .catch(errorJava => {
                        setError("Error solicitando datos a la API de Java.");
                    })
                    .finally(() => setIsLoading(false));
            })
            .catch(errorPython => {
                setError("Error solicitando el tratamiento a la API de Python.");
                setIsLoading(false);
            });
    };

    const handleSeleccionDiagnostico = (diagnosticoSeleccionado) => {
        setDiagnosticoCodigo(diagnosticoSeleccionado.codigoDiagnostico);
        setDiagnosticoNombreEstado(`${diagnosticoSeleccionado.nombreDiagnostico} | ${diagnosticoSeleccionado.estadoDiagnostico}`);
        setPopupOpen(false);
    };

    const exportarExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const hoja = workbook.addWorksheet('Receta');

        hoja.columns = [
            { header: 'Diagnóstico', key: 'diagnostico', width: 30 },
            { header: 'Edad', key: 'edad', width: 10 },
            { header: 'Sexo', key: 'sexo', width: 15 },
            { header: 'Gestante', key: 'gestante', width: 10 }
        ];

        const fechaHora = new Date().toLocaleString();

        hoja.addRow({ diagnostico: `DNI Paciente: ${dniPaciente}`, edad: '', sexo: '', gestante: '' });
        hoja.addRow({
            diagnostico: diagnosticoCodigo,
            edad,
            sexo: sexo === "1" ? "Masculino" : "Femenino",
            gestante: gestante === "1" ? "Sí" : "No"
        });

        const valoresMedicamentos = refMedicamentos.current.obtenerValores();
        if (valoresMedicamentos.length > 0) {
            hoja.addRow({ diagnostico: 'Medicamentos' });
            valoresMedicamentos.forEach(m => {
                hoja.addRow({ diagnostico: m.codigo, edad: m.detalle, sexo: '', gestante: '' });
            });
        }

        const valoresInsumos = refInsumos.current.obtenerValores();
        if (valoresInsumos.length > 0) {
            hoja.addRow({ diagnostico: 'Insumos' });
            valoresInsumos.forEach(i => {
                hoja.addRow({ diagnostico: i.codigo, edad: i.detalle, sexo: '', gestante: '' });
            });
        }

        const valoresProcedimientos = refProcedimientos.current.obtenerValores();
        if (valoresProcedimientos.length > 0) {
            hoja.addRow({ diagnostico: 'Procedimientos' });
            valoresProcedimientos.forEach(p => {
                hoja.addRow({ diagnostico: p.codigo, edad: p.detalle, sexo: '', gestante: '' });
            });
        }

        hoja.addRow({ diagnostico: '', edad: '', sexo: '', gestante: '' });
        hoja.addRow({ diagnostico: `DNI Médico: ${dniMedico}`, edad: '', sexo: '', gestante: '' });
        hoja.addRow({ diagnostico: 'Firma: __________________________', edad: '', sexo: '', gestante: '' });
        hoja.addRow({ diagnostico: `Exportado el ${fechaHora}`, edad: '', sexo: '', gestante: '' });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'receta.xlsx');
    };

    const exportarPDF = () => {
        const doc = new jsPDF();

        const fechaHora = new Date().toLocaleString();
        doc.setFontSize(10);  // Tamaño de fuente reducido para los encabezados

        doc.text("Receta Médica", 14, 20);
        doc.text(`DNI Paciente: ${dniPaciente}`, 14, 30);
        doc.text(`Diagnóstico: ${diagnosticoCodigo}`, 14, 40);
        doc.text(`Edad: ${edad}`, 14, 50);
        doc.text(`Sexo: ${sexo === "1" ? "Masculino" : "Femenino"}`, 14, 60);
        doc.text(`Gestante: ${gestante === "1" ? "Sí" : "No"}`, 14, 70);

        const valoresMedicamentos = refMedicamentos.current.obtenerValores();
        if (valoresMedicamentos.length > 0) {
            doc.autoTable({
                startY: 80,
                head: [['Código', 'Medicamento', 'Detalles']],
                body: valoresMedicamentos.map(m => [m.codigo, m.detalle]),
            });
        }

        const valoresInsumos = refInsumos.current.obtenerValores();
        if (valoresInsumos.length > 0) {
            doc.autoTable({
                startY: doc.lastAutoTable.finalY + 10,
                head: [['Código', 'Insumo', 'Detalles']],
                body: valoresInsumos.map(i => [i.codigo, i.detalle]),
            });
        }

        const valoresProcedimientos = refProcedimientos.current.obtenerValores();
        if (valoresProcedimientos.length > 0) {
            doc.autoTable({
                startY: doc.lastAutoTable.finalY + 10,
                head: [['Código', 'Procedimiento', 'Detalles']],
                body: valoresProcedimientos.map(p => [p.codigo, p.detalle]),
            });
        }

        const yPos = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 120;
        doc.text("Firma: __________________________", 14, yPos);
        doc.text(`DNI Médico: ${dniMedico}`, 14, yPos + 10);


        // Fecha y hora de exportación en la parte inferior izquierda
        doc.setFontSize(8);  // Reducir aún más el tamaño de la fuente
        doc.text(`Exportado el ${fechaHora}`, 14, doc.internal.pageSize.height - 10);

        doc.save('receta.pdf');
    };

    return (
        <Container>
            <h2>Solicitar Recomendación de Tratamiento</h2>
            {error && <Error>{error}</Error>}

            {isLoading && (
                <SpinnerContainer>
                    <FaSpinner className="spinner" />
                </SpinnerContainer>
            )}

            <div className="input-group">
                <div className="diagnostico-container">
                    <label>Código Diagnóstico:</label>
                    <input type="text" value={diagnosticoCodigo} readOnly />
                    <label>Nombre y Estado Diagnóstico:</label>
                    <input type="text" value={diagnosticoNombreEstado} readOnly />
                    <button onClick={() => setPopupOpen(true)}>Buscar Diagnóstico</button>
                </div>

                <div className="campo-input">
                    <label>Edad:</label>
                    <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Ingrese la edad" />
                </div>

                <div className="campo-input">
                    <label>Sexo:</label>
                    <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
                        <option value="">Seleccione</option>
                        <option value="1">Masculino</option>
                        <option value="0">Femenino</option>
                    </select>
                </div>

                <div className="campo-input">
                    <label>Gestante (Si/No):</label>
                    <select value={gestante} onChange={(e) => setGestante(e.target.value)}>
                        <option value="">Seleccione</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div className="campo-input">
                    <label>DNI/Carné de Extranjería (Paciente):</label>
                    <input type="text" value={dniPaciente} onChange={(e) => setDniPaciente(e.target.value)} placeholder="Ingrese DNI o Carné de Extranjería" />
                </div>

                <div className="campo-input">
                    <label>DNI/Carné de Extranjería (Médico):</label>
                    <input type="text" value={dniMedico} onChange={(e) => setDniMedico(e.target.value)} placeholder="Ingrese DNI o Carné de Extranjería" />
                </div>
            </div>

            <div className="button-group">
                <button onClick={solicitarTratamiento} disabled={isLoading}>
                    {isLoading ? 'Solicitando...' : 'Solicitar Tratamiento'}
                </button>
                <button onClick={limpiarFormulario}>Limpiar</button>
                <ButtonExcel onClick={exportarExcel} disabled={isLoading}>
                    <FaFileExcel /> Exportar Excel
                </ButtonExcel>
                <ButtonPDF onClick={exportarPDF} disabled={isLoading}>
                    <FaFilePdf /> Exportar PDF
                </ButtonPDF>
            </div>

            {popupOpen && (
                <PopupBusqueda
                    tipo="diagnosticos"
                    onClose={() => setPopupOpen(false)}
                    onSelect={handleSeleccionDiagnostico}
                />
            )}

            <SeccionTratamiento titulo="Medicamentos" tipo="medicamentos" ref={refMedicamentos} />
            <SeccionTratamiento titulo="Insumos" tipo="insumos" ref={refInsumos} />
            <SeccionTratamiento titulo="Procedimientos" tipo="procedimientos" ref={refProcedimientos} />
        </Container>
    );
}

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .spinner {
        font-size: 24px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const Container = styled.div`
    padding: 20px;
    h2 {
        margin-bottom: 20px;
    }
    .input-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-bottom: 20px;
    }
    .diagnostico-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .campo-input {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .button-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
`;

const Error = styled.p`
    color: red;
    font-weight: bold;
`;

const ButtonExcel = styled.button`
    background-color: #1D6F42;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, background-color 0.2s ease;

    svg {
        margin-right: 10px;
    }

    &:hover {
        background-color: #155C35;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.98);
    }
`;

const ButtonPDF = styled.button`
    background-color: #D9534F;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, background-color 0.2s ease;

    svg {
        margin-right: 10px;
    }

    &:hover {
        background-color: #C9302C;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.98);
    }
`;





