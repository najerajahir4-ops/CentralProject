import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import {
  Users,
  Plus,
  Search,
  Filter,
  CreditCard,
  Edit,
  Trash2,
  Eye,
  History,
  FileSpreadsheet,
  AlertTriangle,
  FileText,
  MoreVertical,
  MessageCircle
} from 'lucide-react';

const TAEKWONDO_BELTS = [
  "Cinturón Blanco",
  "Cinturón Blanco - Amarillo",
  "Cinturón Amarillo",
  "Cinturón Amarillo - Verde",
  "Cinturón Verde",
  "Cinturón Verde - Azul",
  "Cinturón Azul",
  "Cinturón Azul - Rojo",
  "Cinturón Rojo",
  "Cinturón Rojo - Negro",
];

const KICKBOXING_BELTS = [
  "Cinturón Blanco",
  "Cinturón Blanco - Amarillo",
  "Cinturón Amarillo",
  "Cinturón Naranjo",
  "Cinturón Verde",
  "Cinturón Azul",
  "Cinturón Violeta",
  "Cinturón Café o Marrón",
  "Cinturón Negro",
];

const EstudiantesAdmin = () => {
  const [students, setStudents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedTab, setSelectedTab] = useState('TAEKWONDO');

  // Modal States
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected Student for Edit/Payment/History
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [activeKebabId, setActiveKebabId] = useState(null);

  // Loading States
  const [isSavingStudent, setIsSavingStudent] = useState(false);
  const [isSavingPayment, setIsSavingPayment] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Default Ficha de Inscripción Form State
  const defaultFormState = {
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    edad: '',
    cedula: '',
    celular: '',
    direccion: '',
    correo: '',
    horarioElegido: 'Mañana (8:30 - 10:00)',
    alergias: '',
    enfermedades: '',
    lesiones: '',
    contactoEmergenciaNombre: '',
    contactoEmergenciaCelular: '',
    nombreRepresentante: '',
    cedulaRepresentante: '',
    celularRepresentante: '',
    comoSeEntero: '',
    autorizaImagen: true,
    diaDeCobro: 1,
    
    // Internal Admin Fields
    clubId: '',
    grado: 'Cinturón Blanco',
    gradoTKD: 'Cinturón Blanco',
    gradoKB: 'Cinturón Blanco',
    modalidad: 'TAEKWONDO',
    fechaIngreso: new Date().toLocaleDateString('sv-SE'),
    fechaUltimoPago: new Date().toLocaleDateString('sv-SE'),
    periodicidadPago: 'MENSUAL',
    foto: '',
  };

  const [studentForm, setStudentForm] = useState(defaultFormState);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    monto: '50.00',
    fechaPago: new Date().toLocaleDateString('sv-SE'),
    metodoPago: 'TRANSFERENCIA',
    periodoCubierto: 'Mensualidad Corriente',
  });

  const filteredStudentsByTab = students.filter(s => {
    if (selectedTab === 'TAEKWONDO') {
      return s.modalidad === 'TAEKWONDO' || s.modalidad === 'AMBAS';
    } else if (selectedTab === 'KICKBOXING') {
      return s.modalidad === 'KICKBOXING' || s.modalidad === 'AMBAS';
    }
    return true;
  });

  useEffect(() => {
    fetchStudents();
    fetchClubs();
  }, [search, selectedClub, selectedEstado]);

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveKebabId(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (selectedClub) params.clubId = selectedClub;
      if (selectedEstado) params.estadoPago = selectedEstado;

      const res = await API.get('/students', { params });
      setStudents(res.data);
    } catch (err) {
      console.error('Error al cargar estudiantes:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClubs = async () => {
    try {
      const res = await API.get('/clubs');
      setClubs(res.data);
    } catch (err) {
      console.error('Error al cargar clubes:', err);
    }
  };

  const sendWhatsAppNotification = (student) => {
    let phone = student.celular.replace(/\s+/g, '');
    if (phone.startsWith('09')) {
      phone = '593' + phone.substring(1);
    }
    
    let message = '';
    if (student.estadoPago === 'AMARILLO') {
      message = `Hola ${student.nombres}, te saludamos de Club Central. Te recordamos amablemente que tu pago de mensualidad está próximo a vencer el día ${student.fechaProximoPago}. ¡Gracias por ser parte de nuestra familia marcial!`;
    } else if (student.estadoPago === 'ROJO') {
      message = `Hola ${student.nombres}, te saludamos de Club Central. Te informamos que tu pago de mensualidad se encuentra vencido desde el día ${student.fechaProximoPago}. Por favor, acércate a cancelar lo más pronto posible para continuar con tus entrenamientos. ¡Gracias!`;
    }

    if (message) {
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    }
  };

  // Open Create/Edit Student Modal
  const handleOpenStudentModal = (student = null) => {
    if (student) {
      setSelectedStudent(student);
      const contactParts = (student.contactoEmergencia || '').split(' - ');
      const contactNombre = contactParts[0] || '';
      const contactCelular = contactParts[1] || '';

      setStudentForm({
        nombres: student.nombres || '',
        apellidos: student.apellidos || '',
        fechaNacimiento: student.fechaNacimiento || '',
        edad: student.edad || '',
        cedula: student.cedula || '',
        celular: student.celular || '',
        direccion: student.direccion || '',
        correo: student.correo || '',
        horarioElegido: student.horarioElegido || 'Mañana (8:30 - 10:00)',
        alergias: student.alergias || '',
        enfermedades: student.enfermedades || '',
        lesiones: student.lesiones || '',
        contactoEmergenciaNombre: contactNombre,
        contactoEmergenciaCelular: contactCelular,
        nombreRepresentante: student.nombreRepresentante || '',
        cedulaRepresentante: student.cedulaRepresentante || '',
        celularRepresentante: student.celularRepresentante || '',
        comoSeEntero: student.comoSeEntero || '',
        autorizaImagen: student.autorizaImagen ?? true,
        diaDeCobro: student.diaDeCobro || 1,

        clubId: student.clubId || '',
        grado: student.grado || 'Cinturón Blanco',
        gradoTKD: student.modalidad === 'AMBAS' ? (student.grado || '').split(' / ')[0] || 'Cinturón Blanco' : student.grado || 'Cinturón Blanco',
        gradoKB: student.modalidad === 'AMBAS' ? (student.grado || '').split(' / ')[1] || 'Cinturón Blanco' : 'Cinturón Blanco',
        modalidad: student.modalidad || 'TAEKWONDO',
        fechaIngreso: student.fechaIngreso || new Date().toLocaleDateString('sv-SE'),
        fechaUltimoPago: student.fechaUltimoPago || new Date().toLocaleDateString('sv-SE'),
        periodicidadPago: student.periodicidadPago || 'MENSUAL',
        foto: student.foto || '',
      });
    } else {
      setSelectedStudent(null);
      setStudentForm(defaultFormState);
    }
    setIsStudentModalOpen(true);
  };

  // Submit Save/Update Student
  const handleSaveStudent = async (e) => {
    e.preventDefault();
    setIsSavingStudent(true);
    try {
      let finalGrado = studentForm.grado;
      if (studentForm.modalidad === 'AMBAS') {
        finalGrado = `${studentForm.gradoTKD} / ${studentForm.gradoKB}`;
      }

      const payload = {
        ...studentForm,
        grado: finalGrado,
        contactoEmergencia: `${studentForm.contactoEmergenciaNombre} - ${studentForm.contactoEmergenciaCelular}`.trim()
      };
      delete payload.contactoEmergenciaNombre;
      delete payload.contactoEmergenciaCelular;
      delete payload.gradoTKD;
      delete payload.gradoKB;

      if (selectedStudent) {
        await API.put(`/students/${selectedStudent.id}`, payload);
      } else {
        await API.post('/students', payload);
      }
      setIsStudentModalOpen(false);
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.error || 'Error al guardar estudiante.');
    } finally {
      setIsSavingStudent(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploadingImage(true);
      const res = await API.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStudentForm(prev => ({ ...prev, foto: res.data.url }));
      alert('Foto subida exitosamente');
    } catch (err) {
      console.error(err);
      alert('Error al subir la foto');
    } finally {
      setUploadingImage(false);
    }
  };

  // Open Payment Modal
  const handleOpenPaymentModal = (student) => {
    setSelectedStudent(student);
    setPaymentForm({
      monto: '50.00',
      fechaPago: new Date().toLocaleDateString('sv-SE'),
      metodoPago: 'TRANSFERENCIA',
      periodoCubierto: 'Mensualidad Corriente',
    });
    setIsPaymentModalOpen(true);
  };

  // Save New Payment
  const handleSavePayment = async (e) => {
    e.preventDefault();
    setIsSavingPayment(true);
    try {
      await API.post('/payments', {
        studentId: selectedStudent.id,
        ...paymentForm,
      });
      setIsPaymentModalOpen(false);
      fetchStudents();
      alert('Pago registrado y fecha de próximo pago recalculada correctamente.');
    } catch (err) {
      alert(err.response?.data?.error || 'Error al registrar pago.');
    } finally {
      setIsSavingPayment(false);
    }
  };

  // Open History Modal
  const handleOpenHistoryModal = async (student) => {
    setSelectedStudent(student);
    try {
      const res = await API.get(`/payments/student/${student.id}`);
      setPaymentHistory(res.data);
      setIsHistoryModalOpen(true);
    } catch (err) {
      alert('Error al cargar historial de pagos.');
    }
  };

  // Open Delete Modal
  const handleDeleteStudentClick = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
    setActiveKebabId(null);
  };

  // Confirm Delete Student
  const confirmDeleteStudent = async () => {
    if (!selectedStudent) return;
    setIsDeleting(true);
    try {
      await API.delete(`/students/${selectedStudent.id}`);
      setIsDeleteModalOpen(false);
      setSelectedStudent(null);
      fetchStudents();
    } catch (err) {
      alert('Error al eliminar estudiante.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Download Student Ficha as PDF
  const handleDownloadPDF = (student) => {
    if (!student) return;

    const clubObj = clubs.find(c => String(c.id) === String(student.clubId));
    const clubName = clubObj ? clubObj.nombre : 'Sede Central';

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor, permite las ventanas emergentes (popups) para descargar el PDF.');
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Ficha de Inscripción - ${student.nombres} ${student.apellidos}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Oswald:wght@500;700&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      color: #111114;
      background: #fff;
      margin: 0;
      padding: 30px;
      font-size: 11px;
      line-height: 1.4;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px solid #C9A227;
      padding-bottom: 12px;
      margin-bottom: 15px;
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .logo-img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #C9A227;
      object-fit: contain;
      background-color: #111114;
    }
    .title-group h1 {
      font-family: 'Oswald', sans-serif;
      margin: 0;
      font-size: 18px;
      color: #0B1550;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .title-group p {
      margin: 2px 0 0 0;
      font-size: 8px;
      color: #96771A;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .meta-info {
      text-align: right;
      font-size: 9px;
    }
    .meta-info div {
      margin-bottom: 2px;
    }
    .meta-label {
      font-weight: bold;
      color: #0B1550;
      text-transform: uppercase;
    }
    .section-title {
      font-family: 'Oswald', sans-serif;
      font-size: 10px;
      color: #0B1550;
      background: #F5F2E9;
      border-left: 4px solid #C9A227;
      padding: 4px 8px;
      margin: 12px 0 8px 0;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
      margin-bottom: 8px;
    }
    .col-2 {
      grid-column: span 2;
    }
    .col-3 {
      grid-column: span 3;
    }
    .col-4 {
      grid-column: span 4;
    }
    .field {
      border: 1px solid #e2e8f0;
      padding: 5px 8px;
      background: #fafafa;
      border-radius: 2px;
    }
    .field-label {
      font-size: 8px;
      font-weight: bold;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 1px;
    }
    .field-value {
      font-size: 10px;
      color: #0f172a;
      font-weight: 600;
    }
    .alert-field {
      border-color: #fca5a5;
      background: #fef2f2;
    }
    .alert-field .field-label {
      color: #ef4444;
    }
    .alert-field .field-value {
      color: #991b1b;
    }
    .signature-section {
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
      text-align: center;
    }
    .signature-line {
      border-top: 1.5px dashed #0B1550;
      width: 200px;
      margin-top: 40px;
      padding-top: 4px;
      font-size: 9px;
      font-weight: bold;
      color: #334155;
      text-transform: uppercase;
    }
    .footer {
      margin-top: 25px;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      text-align: center;
      font-size: 7.5px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    @media print {
      body {
        padding: 0;
        margin: 0;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-container">
      <img src="/logo.png" alt="Club Central Logo" class="logo-img" onerror="this.src='https://via.placeholder.com/50'"/>
      <div class="title-group">
        <h1>Club Central</h1>
        <p>Formativo Especializado • Taekwondo & Kickboxing</p>
      </div>
    </div>
    <div class="meta-info">
      <div><span class="meta-label">Fecha Ingreso:</span> ${student.fechaIngreso || 'N/A'}</div>
      <div><span class="meta-label">Cédula Alumno:</span> ${student.cedula || 'N/A'}</div>
    </div>
  </div>

  <div class="section-title">1. Datos Personales del Alumno</div>
  <div class="grid">
    <div class="field col-2">
      <div class="field-label">Nombres</div>
      <div class="field-value">${student.nombres || 'N/A'}</div>
    </div>
    <div class="field col-2">
      <div class="field-label">Apellidos</div>
      <div class="field-value">${student.apellidos || 'N/A'}</div>
    </div>
    <div class="field">
      <div class="field-label">F. de Nacimiento</div>
      <div class="field-value">${student.fechaNacimiento || 'N/A'}</div>
    </div>
    <div class="field">
      <div class="field-label">Edad</div>
      <div class="field-value">${student.edad || 'N/A'} años</div>
    </div>
    <div class="field">
      <div class="field-label">Celular</div>
      <div class="field-value">${student.celular || 'N/A'}</div>
    </div>
    <div class="field">
      <div class="field-label">Correo</div>
      <div class="field-value">${student.correo || 'N/A'}</div>
    </div>
    <div class="field col-4">
      <div class="field-label">Dirección Domiciliaria</div>
      <div class="field-value">${student.direccion || 'N/A'}</div>
    </div>
  </div>

  <div class="section-title">2. Detalles Técnicos & Administrativos</div>
  <div class="grid">
    <div class="field col-2">
      <div class="field-label">Club Asignado</div>
      <div class="field-value">${clubName}</div>
    </div>
    <div class="field">
      <div class="field-label">Modalidad</div>
      <div class="field-value">${student.modalidad || 'N/A'}</div>
    </div>
    <div class="field">
      <div class="field-label">Grado / Cinturón</div>
      <div class="field-value">${student.grado || 'N/A'}</div>
    </div>
    <div class="field col-2">
      <div class="field-label">Horario Elegido</div>
      <div class="field-value">${student.horarioElegido || 'N/A'}</div>
    </div>
    <div class="field col-2">
      <div class="field-label">Periodicidad Pago</div>
      <div class="field-value">${student.periodicidadPago || 'MENSUAL'}</div>
    </div>
  </div>

  <div class="section-title">3. Información Médica & Emergencias</div>
  <div class="grid">
    <div class="field col-2 alert-field">
      <div class="field-label">Contacto de Emergencia</div>
      <div class="field-value">${student.contactoEmergencia || 'N/A'}</div>
    </div>
    <div class="field">
      <div class="field-label">Alergias</div>
      <div class="field-value">${student.alergias || 'Ninguna'}</div>
    </div>
    <div class="field">
      <div class="field-label">Enfermedades Crónicas</div>
      <div class="field-value">${student.enfermedades || 'Ninguna'}</div>
    </div>
    <div class="field col-4">
      <div class="field-label">Lesiones Previas</div>
      <div class="field-value">${student.lesiones || 'Ninguna'}</div>
    </div>
  </div>

  <div class="section-title">4. Datos del Representante (Tutor)</div>
  <div class="grid">
    <div class="field col-2">
      <div class="field-label">Nombre del Responsable</div>
      <div class="field-value">${student.nombreRepresentante || 'N/A'}</div>
    </div>
    <div class="field">
      <div class="field-label">Cédula Responsable</div>
      <div class="field-value">${student.cedulaRepresentante || 'N/A'}</div>
    </div>
    <div class="field">
      <div class="field-label">Celular Responsable</div>
      <div class="field-value">${student.celularRepresentante || 'N/A'}</div>
    </div>
    <div class="field col-4">
      <div class="field-label">¿Cómo se enteró de nosotros?</div>
      <div class="field-value">${student.comoSeEntero || 'N/A'}</div>
    </div>
  </div>

  <div class="signature-section">
    <div>
      <div class="signature-line">Firma y Sello del Director Técnico</div>
    </div>
  </div>

  <div class="footer">
    Club Central • Dojang Oficial • Tel: +52 (55) 1234-5678 • CDMX, México
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
        window.onafterprint = function() {
          window.close();
        };
      }, 500);
    }
  </script>
</body>
</html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // Export Students List to Styled Excel (XLS)
  const handleExportExcel = () => {
    if (filteredStudentsByTab.length === 0) {
      alert('No hay estudiantes para exportar.');
      return;
    }

    // Headers
    const headers = [
      'Nombres',
      'Apellidos',
      'Cédula',
      'Edad',
      'Celular',
      'Correo',
      'Dirección',
      'Club',
      'Grado',
      'Modalidad',
      'Día de Cobro',
      'Periodicidad Pago',
      'Fecha Ingreso',
      'Estado de Pago'
    ];

    // Build rows
    const rowsHtml = filteredStudentsByTab.map(student => {
      const clubObj = clubs.find(c => String(c.id) === String(student.clubId));
      const clubName = clubObj ? clubObj.nombre : 'Sede Central';
      
      let statusClass = 'estado-verde';
      let statusText = 'AL DÍA';
      if (student.estadoPago === 'AMARILLO') {
        statusClass = 'estado-amarillo';
        statusText = 'PRÓXIMO A VENCER';
      } else if (student.estadoPago === 'ROJO') {
        statusClass = 'estado-rojo';
        statusText = 'VENCIDO';
      }

      return `
        <tr>
          <td style="text-align: left; text-transform: uppercase;">${student.nombres || ''}</td>
          <td style="text-align: left; text-transform: uppercase;">${student.apellidos || ''}</td>
          <td style="mso-number-format:'\\@'; text-align: center;">${student.cedula || ''}</td>
          <td style="text-align: center;">${student.edad || ''}</td>
          <td style="mso-number-format:'\\@'; text-align: center;">${student.celular || ''}</td>
          <td style="text-align: left;">${student.correo || ''}</td>
          <td style="text-align: left;">${student.direccion || ''}</td>
          <td style="text-align: left;">${clubName}</td>
          <td style="text-align: left;">${student.grado || ''}</td>
          <td style="text-align: left;">${student.modalidad || ''}</td>
          <td style="text-align: center;">Día ${student.diaDeCobro || '1'}</td>
          <td style="text-align: center;">${student.periodicidadPago || 'MENSUAL'}</td>
          <td style="text-align: center;">${student.fechaIngreso || ''}</td>
          <td class="${statusClass}">${statusText}</td>
        </tr>
      `;
    }).join('');

    const headersHtml = headers.map(h => `<th>${h}</th>`).join('');

    // HTML Excel wrapper template with official branding styles
    const excelTemplate = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <!--[if gte mso 9]>
  <xml>
    <x:ExcelWorkbook>
      <x:ExcelWorksheets>
        <x:ExcelWorksheet>
          <x:Name>Alumnos Najeras Team</x:Name>
          <x:WorksheetOptions>
            <x:DisplayGridlines/>
          </x:WorksheetOptions>
        </x:ExcelWorksheet>
      </x:ExcelWorksheets>
    </x:ExcelWorkbook>
  </xml>
  <![endif]-->
  <style>
    table {
      border-collapse: collapse;
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 11px;
    }
    th {
      background-color: #0B1550;
      color: #F5F2E9;
      font-weight: bold;
      border: 1.5px solid #C9A227;
      padding: 8px 12px;
      text-transform: uppercase;
      text-align: center;
    }
    td {
      border: 1px solid #cbd5e1;
      padding: 7px 10px;
      color: #111114;
    }
    tr:nth-child(even) {
      background-color: #f8fafc;
    }
    .estado-verde {
      background-color: #d1fae5;
      color: #065f46;
      font-weight: bold;
      text-align: center;
    }
    .estado-amarillo {
      background-color: #fef3c7;
      color: #92400e;
      font-weight: bold;
      text-align: center;
    }
    .estado-rojo {
      background-color: #fee2e2;
      color: #991b1b;
      font-weight: bold;
      text-align: center;
    }
  </style>
</head>
<body>
  <table>
    <thead>
      <tr>
        ${headersHtml}
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</body>
</html>
    `;

    const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Fichas_Alumnos_Najeras_Team_${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Input Change for Form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudentForm(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      // Ajustar automáticamente el cinturón/grado si se cambia la modalidad
      if (name === 'modalidad') {
        if (value === 'TAEKWONDO') {
          updated.grado = updated.gradoTKD || TAEKWONDO_BELTS[0];
        } else if (value === 'KICKBOXING') {
          updated.grado = updated.gradoKB || KICKBOXING_BELTS[0];
        } else if (value === 'AMBAS') {
          updated.grado = `${updated.gradoTKD || TAEKWONDO_BELTS[0]} / ${updated.gradoKB || KICKBOXING_BELTS[0]}`;
        }
      }

      if (name === 'gradoTKD') {
        updated.grado = `${value} / ${prev.gradoKB || KICKBOXING_BELTS[0]}`;
      }
      if (name === 'gradoKB') {
        updated.grado = `${prev.gradoTKD || TAEKWONDO_BELTS[0]} / ${value}`;
      }
      
      return updated;
    });
  };

  const overdueOrDueCount = filteredStudentsByTab.filter((s) => s.estadoPago === 'ROJO' || s.estadoPago === 'AMARILLO').length;

  return (
    <div class="space-y-8">
      
      {/* Tabs / Secciones de Disciplina */}
      <div className="flex space-x-2 border-b border-gray-200 dark:border-white/10 mb-6">
        <button
          onClick={() => setSelectedTab('TAEKWONDO')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
            selectedTab === 'TAEKWONDO'
              ? 'border-rojo-impacto text-rojo-impacto'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Taekwondo
        </button>
        <button
          onClick={() => setSelectedTab('KICKBOXING')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
            selectedTab === 'KICKBOXING'
              ? 'border-rojo-impacto text-rojo-impacto'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Kickboxing
        </button>
      </div>

      {/* Header & Warning Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-carbon dark:text-white font-body">
            Gestión de Estudiantes & Pagos
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-body">
            Administra el padrón de alumnos y registro de fichas
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportExcel}
            className="h-10 px-4 bg-white dark:bg-[#0A0B0E] border border-gray-300 dark:border-white/20 text-carbon dark:text-white text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-white/5 transition-colors inline-flex items-center gap-2"
          >
            <FileSpreadsheet size={16} />
            Exportar Excel
          </button>
          <button
            onClick={() => handleOpenStudentModal()}
            className="h-10 px-4 bg-rojo-impacto hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} />
            Nueva Ficha
          </button>
        </div>
      </div>

      {/* Warning Badge for Overdue Students */}
      {overdueOrDueCount > 0 && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-red-800 dark:text-red-200 mb-6">
          <div className="flex items-center gap-3 font-medium">
            <AlertTriangle size={18} className="text-red-500 shrink-0" />
            <span>
              Alerta de Cobranza: {overdueOrDueCount} alumnos con pago vencido o próximo a vencer.
            </span>
          </div>
          <button
            onClick={() => setSelectedEstado('ROJO')}
            className="px-4 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 font-medium rounded-md transition-colors whitespace-nowrap"
          >
            Ver Vencidos
          </button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white dark:bg-[#0A0B0E] border border-gray-200 dark:border-white/10 rounded-md p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 shadow-sm">
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre o cédula..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-md pl-10 pr-4 py-2 text-sm text-carbon dark:text-white focus:outline-none focus:ring-2 focus:ring-rojo-impacto/50 transition-colors"
          />
        </div>
        <select
          value={selectedEstado}
          onChange={(e) => setSelectedEstado(e.target.value)}
          className="bg-white dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-md px-4 py-2 text-sm text-carbon dark:text-white focus:outline-none focus:ring-2 focus:ring-rojo-impacto/50 transition-colors"
        >
          <option value="">Todos los estados</option>
          <option value="VERDE">Al Día (Verde)</option>
          <option value="AMARILLO">Próximo a Vencer (Amarillo)</option>
          <option value="ROJO">Vencido (Rojo)</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0A0B0E] border border-gray-200 dark:border-white/10 rounded-md shadow-sm">
        <div className="overflow-x-auto pb-24 min-h-[300px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-medium text-xs uppercase tracking-wider border-b border-gray-200 dark:border-white/10">
              <tr>
                <th className="py-3 px-6">Alumno</th>
                <th className="py-3 px-6">Cédula</th>
                <th className="py-3 px-6">Grado</th>
                <th className="py-3 px-6">Último Pago</th>
                <th className="py-3 px-6">Próximo Pago</th>
                <th className="py-3 px-6 text-center">Estado</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-carbon/10 dark:divide-white/5 text-carbon dark:text-white/80 font-body">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-carbon dark:border-white/20 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredStudentsByTab.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-carbon dark:text-white/40 font-body font-medium tracking-widest text-sm uppercase">
                    NO HAY FICHAS REGISTRADAS.
                  </td>
                </tr>
              ) : (
                filteredStudentsByTab.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 last:border-0">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 flex flex-shrink-0 items-center justify-center font-medium text-sm">
                        {student.nombres.charAt(0)}{student.apellidos.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-carbon dark:text-white capitalize">
                          {student.nombres.toLowerCase()} {student.apellidos.toLowerCase()}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                          <span>Edad: {student.edad}</span>
                          <span>•</span>
                          <span>Cel: {student.celular}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{student.cedula}</td>
                    <td className="py-4 px-6">
                      {student.modalidad === 'AMBAS' ? (
                        <div className="flex flex-col gap-1">
                          <span className="inline-block bg-white dark:bg-[#0A0B0E] border border-carbon/10 dark:border-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-carbon dark:text-white/70">
                            TKD: <span className="text-carbon dark:text-white">{student.grado.split(' / ')[0]}</span>
                          </span>
                          <span className="inline-block bg-white dark:bg-[#0A0B0E] border border-carbon/10 dark:border-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-carbon dark:text-white/70">
                            KB: <span className="text-rojo-impacto">{student.grado.split(' / ')[1]}</span>
                          </span>
                        </div>
                      ) : (
                        <span className="block font-bold text-[10px] uppercase tracking-widest text-carbon dark:text-white/90">{student.grado}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-gray-500">{student.fechaUltimoPago}</td>
                    <td className="py-4 px-6 font-medium text-carbon dark:text-white">{student.fechaProximoPago}</td>
                    <td className="py-4 px-6 text-center">
                      <StatusBadge status={student.estadoPago} />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2 relative">
                        {/* Always reserve space for 4 buttons (chat, payment, edit, kebab) */}
                        <div className="w-8 h-8">
                          {student.estadoPago !== 'VERDE' && (
                            <button onClick={() => sendWhatsAppNotification(student)} title="Recordatorio de Pago (WhatsApp)" className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/40 rounded-md transition-colors">
                              <MessageCircle size={16} />
                            </button>
                          )}
                        </div>
                        <button onClick={() => handleOpenPaymentModal(student)} title="Registrar Pago" className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 rounded-md transition-colors">
                          <CreditCard size={16} />
                        </button>
                        <button onClick={() => handleOpenStudentModal(student)} title="Ver / Editar Ficha" className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 rounded-md transition-colors">
                          <Edit size={16} />
                        </button>

                        {/* Menú Kebab (Acciones Secundarias) */}
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveKebabId(activeKebabId === student.id ? null : student.id);
                            }}
                            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${activeKebabId === student.id ? 'bg-gray-200 text-gray-800 dark:bg-white/20 dark:text-white' : 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-gray-300'}`}
                            title="Más acciones"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {activeKebabId === student.id && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 py-1 text-left">
                              <button
                                onClick={() => {
                                  handleOpenHistoryModal(student);
                                  setActiveKebabId(null);
                                }}
                                className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3 transition-colors"
                              >
                                <History size={16} />
                                Historial Pagos
                              </button>
                              <button
                                onClick={() => {
                                  handleDownloadPDF(student);
                                  setActiveKebabId(null);
                                }}
                                className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3 transition-colors"
                              >
                                <FileText size={16} />
                                Ficha PDF
                              </button>
                              <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>
                              <button
                                onClick={() => handleDeleteStudentClick(student)}
                                disabled={isDeleting}
                                className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 disabled:opacity-50 transition-colors"
                              >
                                <Trash2 size={16} />
                                {isDeleting ? 'Eliminando...' : 'Eliminar Alumno'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: FICHA DE INSCRIPCIÓN OFICIAL */}
      <Modal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        title={selectedStudent ? 'FICHA DE INSCRIPCIÓN - EDICIÓN' : "FICHA DE INSCRIPCIÓN - CLUB CENTRAL"}
      >
        <form onSubmit={handleSaveStudent} class="space-y-6">
          
          {/* SECCIÓN 1: DATOS DEL ALUMNO */}
          <div class="space-y-3">
            <h3 class="text-xs text-carbon dark:text-white font-body font-semibold tracking-widest uppercase border-b border-carbon/20 dark:border-white/10 pb-1">
              1. Datos del Alumno
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Nombres</label>
                <input type="text" name="nombres" required value={studentForm.nombres} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Apellidos</label>
                <input type="text" name="apellidos" required value={studentForm.apellidos} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Fecha de Nacimiento</label>
                <input type="date" name="fechaNacimiento" required value={studentForm.fechaNacimiento} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Edad</label>
                <input type="number" name="edad" required value={studentForm.edad} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Cédula de Identidad</label>
                <input type="text" name="cedula" required value={studentForm.cedula} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white font-mono focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Celular</label>
                <input type="text" name="celular" required value={studentForm.celular} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Fecha de Ingreso</label>
                <input type="date" name="fechaIngreso" required value={studentForm.fechaIngreso} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Dirección</label>
                <input type="text" name="direccion" required value={studentForm.direccion} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Correo Electrónico</label>
                <input type="email" name="correo" required value={studentForm.correo} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: HORARIOS DE ENTRENAMIENTO */}
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-carbon dark:text-white font-body tracking-widest uppercase border-b border-carbon/20 dark:border-white/10 pb-1">
              2. Horarios de Entrenamiento
            </h3>
            <div class="bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm p-3">
              <p class="text-[11px] text-gray-700 dark:text-gray-300 font-bold uppercase mb-2">Turnos Disponibles</p>
              <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Horario Elegido (Marque uno):</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-carbon dark:text-white mt-2">
                <label class="flex items-center gap-2 cursor-pointer border border-carbon/20 dark:border-white/10 p-2 rounded-sm hover:border-carbon dark:border-white/20 transition-colors">
                  <input type="radio" name="horarioElegido" value="Mañana (8:30 - 10:00)" checked={studentForm.horarioElegido === 'Mañana (8:30 - 10:00)'} onChange={handleChange} class="accent-rojo-impacto" />
                  Mañana (8:30am - 10:00am)
                </label>
                <label class="flex items-center gap-2 cursor-pointer border border-carbon/20 dark:border-white/10 p-2 rounded-sm hover:border-carbon dark:border-white/20 transition-colors">
                  <input type="radio" name="horarioElegido" value="Tarde 4-6 años (15:00 - 16:00)" checked={studentForm.horarioElegido === 'Tarde 4-6 años (15:00 - 16:00)'} onChange={handleChange} class="accent-rojo-impacto" />
                  Tarde 4-6 años (3:00pm - 4:00pm)
                </label>
                <label class="flex items-center gap-2 cursor-pointer border border-carbon/20 dark:border-white/10 p-2 rounded-sm hover:border-carbon dark:border-white/20 transition-colors">
                  <input type="radio" name="horarioElegido" value="Tarde 7-10 años (16:00 - 17:00)" checked={studentForm.horarioElegido === 'Tarde 7-10 años (16:00 - 17:00)'} onChange={handleChange} class="accent-rojo-impacto" />
                  Tarde 7-10 años (4:00pm - 5:00pm)
                </label>
                <label class="flex items-center gap-2 cursor-pointer border border-carbon/20 dark:border-white/10 p-2 rounded-sm hover:border-carbon dark:border-white/20 transition-colors">
                  <input type="radio" name="horarioElegido" value="Tarde 11+ años (17:00 - 18:20)" checked={studentForm.horarioElegido === 'Tarde 11+ años (17:00 - 18:20)'} onChange={handleChange} class="accent-rojo-impacto" />
                  Tarde 11+ años (5:00pm - 6:20pm)
                </label>
                <label class="flex items-center gap-2 cursor-pointer border border-carbon/20 dark:border-white/10 p-2 rounded-sm hover:border-carbon dark:border-white/20 transition-colors">
                  <input type="radio" name="horarioElegido" value="Sábado Intensivo (10:30 - 12:30)" checked={studentForm.horarioElegido === 'Sábado Intensivo (10:30 - 12:30)'} onChange={handleChange} class="accent-rojo-impacto" />
                  Sábado Intensivo (10:30am - 12:30pm)
                </label>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: INFORMACIÓN DE EMERGENCIA */}
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-carbon dark:text-white font-body tracking-widest uppercase border-b border-carbon/20 dark:border-white/10 pb-1">
              3. Información de Emergencia
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Alergias</label>
                <input type="text" name="alergias" value={studentForm.alergias} onChange={handleChange} placeholder="Ninguna" class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Enfermedades crónicas</label>
                <input type="text" name="enfermedades" value={studentForm.enfermedades} onChange={handleChange} placeholder="Ninguna" class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Lesiones previas</label>
                <input type="text" name="lesiones" value={studentForm.lesiones} onChange={handleChange} placeholder="Ninguna" class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-red-400 font-bold uppercase mb-1">Nombre Contacto Emergencia *</label>
                <input type="text" name="contactoEmergenciaNombre" required value={studentForm.contactoEmergenciaNombre} onChange={handleChange} placeholder="Ej. Juan Pérez" class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-red-500/50 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-red-400 font-bold uppercase mb-1">Celular Contacto Emergencia *</label>
                <input type="text" name="contactoEmergenciaCelular" required value={studentForm.contactoEmergenciaCelular} onChange={handleChange} placeholder="Ej. 0988362990" class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-red-500/50 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
            </div>
          </div>

          {/* SECCIÓN 4: DATOS DEL REPRESENTANTE */}
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-carbon dark:text-white font-body tracking-widest uppercase border-b border-carbon/20 dark:border-white/10 pb-1">
              4. Datos del Representante e Información Adicional
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Nombre del Responsable</label>
                <input type="text" name="nombreRepresentante" value={studentForm.nombreRepresentante} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Cédula del Responsable</label>
                <input type="text" name="cedulaRepresentante" value={studentForm.cedulaRepresentante} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white font-mono focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Celular del Responsable</label>
                <input type="text" name="celularRepresentante" value={studentForm.celularRepresentante} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">¿Cómo se enteró de nosotros?</label>
                <input type="text" name="comoSeEntero" value={studentForm.comoSeEntero} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-3 py-1.5 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
              </div>
            </div>
          </div>



          {/* ADMIN INTERNAL FIELDS (Hidden or minimized) */}
          <div class={`pt-4 border-t border-carbon/20 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 ${studentForm.modalidad === 'AMBAS' ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-3 bg-gray-100 dark:bg-[#0B1550]/50 p-3 rounded-sm border border-carbon dark:border-white/20/20`}>
            {studentForm.modalidad === 'AMBAS' ? (
              <>
                <div>
                  <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Cinturón Taekwondo</label>
                  <select
                    name="gradoTKD"
                    value={studentForm.gradoTKD}
                    onChange={handleChange}
                    class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/10 dark:border-white/5 rounded-sm px-3 py-1.5 text-[11px] text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20 uppercase tracking-wider font-bold"
                  >
                    {TAEKWONDO_BELTS.map((belt) => (
                      <option key={belt} value={belt}>{belt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Cinturón Kickboxing</label>
                  <select
                    name="gradoKB"
                    value={studentForm.gradoKB}
                    onChange={handleChange}
                    class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/10 dark:border-white/5 rounded-sm px-3 py-1.5 text-[11px] text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20 uppercase tracking-wider font-bold"
                  >
                    {KICKBOXING_BELTS.map((belt) => (
                      <option key={belt} value={belt}>{belt}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div>
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Grado / Cinturón</label>
                <select
                  name="grado"
                  value={studentForm.grado}
                  onChange={handleChange}
                  class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/10 dark:border-white/5 rounded-sm px-3 py-1.5 text-[11px] text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20 uppercase tracking-wider font-bold"
                >
                  {studentForm.modalidad === 'TAEKWONDO'
                    ? TAEKWONDO_BELTS.map((belt) => (
                        <option key={belt} value={belt}>{belt}</option>
                      ))
                    : KICKBOXING_BELTS.map((belt) => (
                        <option key={belt} value={belt}>{belt}</option>
                      ))
                  }
                </select>
              </div>
            )}
            <div>
              <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Modalidad</label>
              <select name="modalidad" value={studentForm.modalidad} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/10 dark:border-white/5 rounded-sm px-3 py-1.5 text-[11px] text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20">
                <option value="TAEKWONDO">Taekwondo</option>
                <option value="KICKBOXING">Kickboxing</option>
                <option value="AMBAS">Taekwondo y Kickboxing</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Periodicidad Pago</label>
              <select name="periodicidadPago" value={studentForm.periodicidadPago} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/10 dark:border-white/5 rounded-sm px-3 py-1.5 text-[11px] text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20">
                <option value="MENSUAL">Mensual</option>
                <option value="TRIMESTRAL">Trimestral</option>
                <option value="ANUAL">Anual</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-1">Último Pago</label>
              <input type="date" name="fechaUltimoPago" value={studentForm.fechaUltimoPago} onChange={handleChange} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/10 dark:border-white/5 rounded-sm px-3 py-1.5 text-[11px] text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-xs font-bold text-carbon dark:text-white font-body tracking-widest uppercase border-b border-carbon/20 dark:border-white/10 pb-1">
              5. Foto de Perfil (Opcional)
            </h3>
            <div class="flex items-center gap-4 bg-gray-50 dark:bg-[#1C1C21] p-4 rounded-sm border border-carbon/20 dark:border-white/10">
              {studentForm.foto ? (
                <img src={studentForm.foto} alt="Perfil" class="w-16 h-16 rounded-full object-cover border border-carbon dark:border-white/20" />
              ) : (
                <div class="w-16 h-16 rounded-full bg-white dark:bg-[#0A0B0E] border border-carbon/30 dark:border-white/20 flex items-center justify-center text-xs text-gray-500 uppercase">Sin Foto</div>
              )}
              <div class="flex-1">
                <label class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mb-2">Subir nueva foto desde tu equipo:</label>
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp" 
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  class="block w-full text-xs text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-carbon dark:file:bg-white file:text-white dark:file:text-carbon hover:file:bg-[#b08d20] dark:hover:file:bg-gray-200 transition-all disabled:opacity-50 cursor-pointer"
                />
                {uploadingImage && <p class="text-[10px] text-amber-400 mt-1 animate-pulse">Subiendo imagen a la nube...</p>}
              </div>
            </div>
          </div>



          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedStudent && (
              <button
                type="button"
                onClick={() => handleDownloadPDF(studentForm)}
                class="w-full py-4 bg-white dark:bg-[#0A0B0E] text-carbon dark:text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-carbon dark:hover:bg-white hover:text-white dark:hover:text-carbon shadow-[0_0_15px_rgba(201,162,39,0.2)] border border-carbon dark:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <FileText size={16} />
                Descargar Ficha PDF
              </button>
            )}
            <button
              type="submit"
              disabled={isSavingStudent}
              class={`w-full py-4 bg-rojo-impacto text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-red-700 shadow-[0_0_15px_rgba(140,29,29,0.5)] border border-rojo-impacto transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedStudent ? '' : 'sm:col-span-2'
              }`}
            >
              {isSavingStudent ? 'GUARDANDO...' : 'GUARDAR FICHA OFICIAL'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Registrar Pago */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title={`Registrar Pago`}
      >
        <form onSubmit={handleSavePayment} class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Monto ($ USD)</label>
              <input type="number" step="0.01" required value={paymentForm.monto} onChange={(e) => setPaymentForm({ ...paymentForm, monto: e.target.value })} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-4 py-2 text-xs text-carbon dark:text-white font-mono focus:outline-none focus:border-carbon dark:border-white/20" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Fecha de Pago</label>
              <input type="date" required value={paymentForm.fechaPago} onChange={(e) => setPaymentForm({ ...paymentForm, fechaPago: e.target.value })} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-4 py-2 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Método de Pago</label>
              <select value={paymentForm.metodoPago} onChange={(e) => setPaymentForm({ ...paymentForm, metodoPago: e.target.value })} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-4 py-2 text-xs text-carbon dark:text-white uppercase font-bold focus:outline-none focus:border-carbon dark:border-white/20">
                <option value="TRANSFERENCIA" class="bg-gray-50 dark:bg-[#1C1C21]">Transferencia</option>
                <option value="EFECTIVO" class="bg-gray-50 dark:bg-[#1C1C21]">Efectivo</option>
                <option value="TARJETA" class="bg-gray-50 dark:bg-[#1C1C21]">Tarjeta</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Mes a Cubrir</label>
              <input type="text" required value={paymentForm.periodoCubierto} onChange={(e) => setPaymentForm({ ...paymentForm, periodoCubierto: e.target.value })} class="w-full bg-gray-50 dark:bg-[#1C1C21] border border-carbon/20 dark:border-white/10 rounded-sm px-4 py-2 text-xs text-carbon dark:text-white focus:outline-none focus:border-carbon dark:border-white/20" />
            </div>
          </div>

          <p class="text-[10px] text-amber-300 italic bg-amber-500/10 p-3 rounded-sm border border-amber-500/20">
            * Al guardar este pago, la fecha de próximo pago se recalculará al <strong>Día {selectedStudent?.diaDeCobro}</strong> del siguiente periodo.
          </p>

          <button type="submit" disabled={isSavingPayment} class="w-full py-3 bg-carbon dark:bg-white text-white dark:text-carbon font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-[#b08d20] shadow-[0_0_15px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
            {isSavingPayment ? 'PROCESANDO...' : 'Confirmar Pago'}
          </button>
        </form>
      </Modal>

      {/* Modal Historial de Pagos */}
      <Modal isOpen={isHistoryModalOpen} onClose={() => setIsHistoryModalOpen(false)} title={`Historial de Pagos`}>
        <div class="space-y-4">
          {paymentHistory.length === 0 ? (
            <p class="text-xs text-gray-600 dark:text-gray-400 text-center py-4 font-body font-semibold uppercase">Sin pagos registrados.</p>
          ) : (
            <div class="divide-y divide-carbon/20 dark:divide-white/10 text-xs text-carbon dark:text-white">
              {paymentHistory.map((p) => (
                <div key={p.id} class="py-3 flex justify-between items-center">
                  <div>
                    <span class="font-bold text-emerald-400 text-sm font-mono">${p.monto.toFixed(2)} USD</span>
                    <span class="block text-[10px] text-gray-600 dark:text-gray-400 uppercase mt-1">{p.periodoCubierto} ({p.metodoPago})</span>
                  </div>
                  <span class="text-gray-700 dark:text-gray-300 font-mono text-[11px]">{p.fechaPago}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* Modal Confirmar Eliminación */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirmar Eliminación">
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-red-600 dark:text-red-400">
            <AlertTriangle size={48} className="shrink-0" />
            <p className="text-sm text-carbon dark:text-white font-body">
              ¿Estás seguro de eliminar al estudiante <span className="font-bold text-rojo-impacto uppercase">{selectedStudent?.nombres} {selectedStudent?.apellidos}</span>? 
              <br/><br/>
              Esta acción borrará todo su historial de pagos, ficha de inscripción y es <strong>irreversible</strong>.
            </p>
          </div>
          
          <div className="flex gap-3 justify-end mt-4 border-t border-gray-200 dark:border-white/10 pt-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDeleteStudent}
              disabled={isDeleting}
              className="px-4 py-2 text-xs font-bold text-white bg-rojo-impacto hover:bg-red-700 uppercase tracking-widest rounded-md transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              <Trash2 size={16} />
              {isDeleting ? 'Eliminando...' : 'Sí, Eliminar'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default EstudiantesAdmin;
