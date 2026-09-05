import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  Activity, 
  Camera, 
  Lock, 
  Printer, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

const LegalHub = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'privacidad';

  const setTab = (tabId) => {
    setSearchParams({ tab: tabId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const tabs = [
    { id: 'privacidad', label: 'Política de Privacidad', icon: ShieldCheck, badge: 'LOPDP Ecuador' },
    { id: 'terminos', label: 'Términos y Condiciones', icon: FileText, badge: 'Reglamento' },
    { id: 'descargo', label: 'Descargo Deportivo & Médico (Waiver)', icon: Activity, badge: 'Obligatorio' },
    { id: 'imagen', label: 'Uso de Imagen & Menores de Edad', icon: Camera, badge: 'Consentimiento' },
    { id: 'cookies', label: 'Seguridad & Cookies Técnicas', icon: Lock, badge: 'RFC 9116' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-blanco-absoluto min-h-screen text-carbon pb-24">
      {/* HEADER PRINCIPAL */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-body font-bold text-2xl sm:text-3xl lg:text-4xl text-carbon leading-tight tracking-tight">
                Marco Legal & <span className="text-rojo-impacto">Normativa Oficial</span>
              </h1>
              <p className="font-body text-sm sm:text-base text-gray-600 mt-3 max-w-2xl leading-relaxed">
                Regulaciones internas, protección de datos conforme a la legislación ecuatoriana y términos de formación marcial en <strong>Club Central</strong>.
              </p>
            </div>

            {/* Quick Metadata & Print */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">
                Última revisión: Septiembre 2026
              </span>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 bg-carbon hover:bg-black text-white text-xs font-semibold tracking-wider uppercase rounded-md transition-colors shadow-sm"
                title="Imprimir documento legal actual"
              >
                <Printer size={14} /> Imprimir / Guardar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL: SIDEBAR + DOCUMENTO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR DE NAVEGACIÓN */}
          <aside className="lg:col-span-4 print:hidden">
            <div className="sticky top-24 space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 px-3 py-2">
                Documentos Legales
              </p>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-lg text-left transition-all font-body text-sm ${
                      isActive
                        ? 'bg-rojo-impacto text-white font-semibold shadow-md translate-x-1'
                        : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200/80 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-white' : 'text-rojo-impacto'} />
                      <span>{tab.label}</span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold tracking-wider ${
                        isActive
                          ? 'bg-black/20 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </button>
                );
              })}

              {/* Caja de Contacto Rápido Legal */}
              <div className="mt-6 p-4 rounded-lg bg-white border border-gray-200 space-y-3 text-xs text-gray-600">
                <p className="font-bold text-carbon text-sm flex items-center gap-2">
                  <HelpCircle size={16} className="text-rojo-impacto" /> ¿Dudas Legales?
                </p>
                <p>
                  Para ejercer tus derechos de acceso, rectificación o revocatoria de datos:
                </p>
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-rojo-impacto flex-shrink-0" />
                    <span className="truncate font-medium text-carbon">clubsociedaddeportivacentralwt@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-rojo-impacto flex-shrink-0" />
                    <span className="font-medium text-carbon">+593 98 452 2651</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-rojo-impacto flex-shrink-0 mt-0.5" />
                    <span>Santo Domingo, Ecuador</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENIDO DEL DOCUMENTO ACTIVO */}
          <main className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm leading-relaxed">
            
            {/* 1. POLÍTICA DE PRIVACIDAD (LOPDP ECUADOR) */}
            {activeTab === 'privacidad' && (
              <article className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-100 pb-6">
                  <span className="text-xs font-bold text-rojo-impacto uppercase tracking-widest">
                    Marco Normativo • República del Ecuador
                  </span>
                  <h2 className="font-body font-bold text-2xl sm:text-3xl text-carbon tracking-tight normal-case mt-1">
                    Política de Privacidad y Protección de Datos Personales
                  </h2>
                  <p className="text-xs text-gray-500 mt-2">
                    Conforme a la Ley Orgánica de Protección de Datos Personales (LOPDP) de Ecuador
                  </p>
                </div>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">1. Identificación del Responsable del Tratamiento</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    El responsable del tratamiento de sus datos personales es <strong>Club Central (Taekwondo & Kickboxing)</strong>, academia deportiva dirigida por los profesores <strong>Diego Pérez</strong> y <strong>Mauricio Almeida</strong>, con sede principal ubicada en la calle Federico Páez y Av. Jacinto Cortez, Santo Domingo, Ecuador. Correo de contacto institucional: <code className="text-rojo-impacto bg-red-50 px-1.5 py-0.5 rounded">clubsociedaddeportivacentralwt@gmail.com</code>.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">2. Principios del Tratamiento de Datos</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    En Club Central tratamos la información bajo los principios de juridicidad, lealtad, transparencia, finalidad estricta, pertinencia y minimización, proporcionalidad, confidencialidad y seguridad técnica.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">3. Datos Recopilados y Finalidades Específicas</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Recopilamos y almacenamos en nuestro sistema de gestión exclusivamente los siguientes datos necesarios para la práctica deportiva y gestión del club:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li><strong>Datos de Identificación y Contacto:</strong> Nombres completos, número de cédula de identidad, edad, fecha de nacimiento, teléfonos personales y correo electrónico. <em>Finalidad:</em> Registro de afiliación, emisión de carnets marciales, diplomas de cinturón y comunicaciones de horarios o torneos.</li>
                    <li><strong>Datos de Representantes Legales (en caso de menores de edad):</strong> Nombre completo, cédula y celular del representante. <em>Finalidad:</em> Vínculo de patria potestad, autorizaciones reglamentarias y contacto en caso de emergencia.</li>
                    <li><strong>Datos Financieros y de Pagos:</strong> Fechas de pago, monto cancelado, método de pago y periodicidad (mensual/trimestral/anual). <em>Finalidad:</em> Control administrativo de matrículas y control de mora mediante el semáforo interno.</li>
                    <li><strong>Récord de Asistencia y Disciplina:</strong> Registro diario de asistencias y ascensos de grado (cinturones). <em>Finalidad:</em> Habilitación a exámenes de grado y competencias federadas.</li>
                  </ul>
                </section>

                <section className="space-y-3 bg-red-50/60 border-l-4 border-rojo-impacto p-4 rounded-r-lg">
                  <h3 className="font-body font-bold text-base text-carbon flex items-center gap-2 normal-case">
                    <AlertTriangle size={18} className="text-rojo-impacto" /> 4. Tratamiento Especial de Datos de Salud (Art. 25 LOPDP)
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    La ficha médica del estudiante (registro de <strong>alergias, enfermedades preexistentes y lesiones físicas previas</strong>) constituye una <em>categoría especial de datos sensibles</em>. Club Central trata estos datos <strong>exclusivamente para salvaguardar la vida, la salud y la integridad física del deportista</strong> durante las sesiones de entrenamiento, combates y traslados de emergencia, garantizando que los instructores conozcan sus limitaciones anatómicas o requerimientos médicos vitales.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">5. Protección de Niñas, Niños y Adolescentes (NNA)</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    De conformidad con el Artículo 21 de la LOPDP y el Código de la Niñez y Adolescencia de Ecuador, el tratamiento de datos de menores de 18 años requiere la autorización explícita de su padre, madre o representante legal, velando siempre por el interés superior del menor y su desarrollo integral en el deporte.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">6. Derechos de los Titulares (Derechos ARCO)</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Usted o su representante legal tienen derecho a solicitar en cualquier momento:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="font-bold text-sm text-carbon">Acceso & Información</p>
                      <p className="text-xs text-gray-600 mt-1">Conocer qué datos personales suyos o de su hijo reposan en el sistema.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="font-bold text-sm text-carbon">Rectificación & Actualización</p>
                      <p className="text-xs text-gray-600 mt-1">Corregir datos inexactos, cambios de dirección, teléfonos o condición médica.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="font-bold text-sm text-carbon">Eliminación / Supresión</p>
                      <p className="text-xs text-gray-600 mt-1">Solicitar la eliminación de la ficha una vez concluida su permanencia deportiva.</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="font-bold text-sm text-carbon">Oposición / Revocatoria</p>
                      <p className="text-xs text-gray-600 mt-1">Oponerse al tratamiento no esencial o revocar el uso de imágenes públicas.</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 pt-2">
                    Para ejercer estos derechos, envíe una solicitud a <span className="font-semibold text-carbon">clubsociedaddeportivacentralwt@gmail.com</span> adjuntando copia de la cédula del titular o representante.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">7. No Comercialización y Medidas de Seguridad</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Club Central <strong>jamás vende, alquila ni comparte bases de datos con terceros</strong> para fines publicitarios. La plataforma cuenta con controles de ciberseguridad estrictos: cifrado SSL/TLS, base de datos en Supabase con credenciales DML protegidas, control de accesos restringido mediante roles administrativos y auditoría digital de cada modificación.
                  </p>
                </section>
              </article>
            )}

            {/* 2. TÉRMINOS Y CONDICIONES DEL DOJANG */}
            {activeTab === 'terminos' && (
              <article className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-100 pb-6">
                  <span className="text-xs font-bold text-rojo-impacto uppercase tracking-widest">
                    Reglamento Disciplinario & Administrativo
                  </span>
                  <h2 className="font-body font-bold text-2xl sm:text-3xl text-carbon tracking-tight normal-case mt-1">
                    Términos & Condiciones del Dojang
                  </h2>
                  <p className="text-xs text-gray-500 mt-2">
                    Normas de convivencia, asistencia, pagos y disciplina en Club Central
                  </p>
                </div>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">1. Membresía y Formación Marcial</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    La inscripción en Club Central confiere el derecho a recibir instrucción técnica, física y táctica en <strong>Taekwondo Olímpico (WT)</strong> y/o <strong>Kickboxing</strong> impartida por instructores calificados según el horario elegido. El practicante se compromete a mantener los valores fundamentales de las artes marciales: cortesía, integridad, perseverancia, autocontrol y espíritu indomable.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">2. Política de Pagos y Mensualidades</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li><strong>Día de Pago (Corte):</strong> Cada estudiante tiene un día de cobro mensual estipulado al momento de la matrícula. Las pensiones cubren el periodo regular de clases de 30 días calendario.</li>
                    <li><strong>Sistema de Estado Financiero:</strong> El sistema de administración clasifica a los alumnos bajo un semáforo financiero (Al día, Por Vencer o Vencido). A fin de garantizar la sostenibilidad de la sede, las mensualidades deben cancelarse en los primeros 5 días posteriores a su vencimiento.</li>
                    <li><strong>No Reembolso:</strong> Los valores pagados en concepto de inscripción, mensualidades o uniformes no son reembolsables una vez iniciado el periodo lectivo correspondiente.</li>
                    <li><strong>Congelamiento de Membresía:</strong> En caso de fuerza mayor o incapacidad médica debidamente acreditada mediante certificado médico, el alumno o representante podrá solicitar el congelamiento temporal de su mensualidad por un plazo máximo de 30 días continuos.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">3. Uniformidad e Implementación de Seguridad</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Es requisito indispensable para entrenar en el tatami:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>Asistir con el Dobok oficial (Taekwondo) o indumentaria reglamentaria (Kickboxing) limpio y en óptimas condiciones.</li>
                    <li>Para las sesiones de combate (*kyorugi* / sparring), es obligatorio el uso de equipo de protección personal completo: protector bucal, cabezal, pechera (peto), guantines, canilleras y coquilla genital.</li>
                    <li>Prohibido el ingreso al tatami con calzado de calle, pulseras, relojes, anillos o elementos punzantes que puedan causar daño a los compañeros.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">4. Código de Conducta y Disciplina</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Club Central se reserva el derecho de admisión y permanencia. Serán causales de sanción disciplinaria o separación definitiva de la academia, sin derecho a devolución económica:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>Faltas de respeto verbal o física hacia maestros, compañeros, padres de familia o jueces.</li>
                    <li>Uso indebido o agresivo de las técnicas de artes marciales aprendidas fuera del dojang o en riñas callejeras.</li>
                    <li>Conductas antideportivas reiteradas o daño premeditado a las instalaciones de la academia.</li>
                  </ul>
                </section>
              </article>
            )}

            {/* 3. DESCARGO DE RESPONSABILIDAD DEPORTIVA Y MÉDICA (WAIVER) */}
            {activeTab === 'descargo' && (
              <article className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-100 pb-6">
                  <span className="text-xs font-bold text-rojo-impacto uppercase tracking-widest">
                    Asunción de Riesgos • Salud & Seguridad
                  </span>
                  <h2 className="font-body font-bold text-2xl sm:text-3xl text-carbon tracking-tight normal-case mt-1">
                    Descargo de Responsabilidad Deportiva & Médica
                  </h2>
                  <p className="text-xs text-gray-500 mt-2">
                    Consentimiento informado y declaración de aptitud física para artes marciales de contacto
                  </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs sm:text-sm">
                  <strong>IMPORTANTE:</strong> La práctica del Taekwondo Olímpico y Kickboxing demanda exigencia cardiovascular, flexibilidad, agilidad y contacto físico regulado. Al matricularse, el alumno y su representante declaran conocer y aceptar las siguientes condiciones.
                </div>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">1. Asunción Voluntaria de Riesgos Inherentes</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    El deportista y su representante legal reconocen que la práctica de deportes de combate conlleva un riesgo natural e involuntario de fatiga muscular, raspones, contusiones, luxaciones, esguinces u otras lesiones físicas fortuitas derivadas de la propia naturaleza de la disciplina deportiva, aun cuando los instructores aplican estrictas medidas de precaución y pedagogía preventiva.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">2. Declaración Jurada de Aptitud Física</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    El alumno (o su representante legal) certifica bajo juramento que:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>Se encuentra en condiciones físicas, cardiovasculares y psicológicas idóneas para realizar actividad física moderada y de alta intensidad.</li>
                    <li>No ha ocultado ni omitido en su ficha médica antecedentes de cardiopatías, afecciones respiratorias no controladas (como asma severo), cirugías recientes, problemas de coagulación o lesiones osteomusculares graves no dadas de alta médica.</li>
                    <li>Se compromete a informar inmediatamente a los profesores cualquier cambio sobrevenido en su estado de salud o la aparición de síntomas anómalos durante la clase.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">3. Protocolo de Emergencias y Asistencia Médica</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    En caso de accidente imprevisto, descompensación o lesión que requiera atención médica especializada durante un entrenamiento, seminario o campeonato:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>El personal de Club Central está facultado para prestar los primeros auxilios básicos de contención inmediata.</li>
                    <li>Se notificará de inmediato al <strong>Contacto de Emergencia</strong> registrado en la ficha del estudiante.</li>
                    <li>Se autoriza a los instructores o personal a cargo a coordinar el traslado del deportista al centro de salud o servicio de emergencias médicas públicas o privadas más cercano (ej. Cruz Roja, IESS, Hospital Santo Domingo), siendo los gastos médicos externos de cuenta y cargo de la póliza de seguro personal o de la familia del deportista.</li>
                  </ul>
                </section>
              </article>
            )}

            {/* 4. USO DE IMAGEN Y MENORES DE EDAD */}
            {activeTab === 'imagen' && (
              <article className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-100 pb-6">
                  <span className="text-xs font-bold text-rojo-impacto uppercase tracking-widest">
                    Código de la Niñez y Adolescencia • Imagen Institucional
                  </span>
                  <h2 className="font-body font-bold text-2xl sm:text-3xl text-carbon tracking-tight normal-case mt-1">
                    Política de Uso de Imagen & Protección de Menores
                  </h2>
                  <p className="text-xs text-gray-500 mt-2">
                    Consentimiento para fotografías, videos promocionales, Salón de Campeones y redes sociales
                  </p>
                </div>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">1. Finalidad Deportiva e Institucional</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Club Central registra material audiovisual (fotografías y videos) durante los entrenamientos diarios, exámenes de cambio de cinturón, torneos interprovinciales y exhibiciones marciales con la única finalidad de:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>Celebrar y destacar los logros deportivos de los alumnos en el <strong>Salón de la Fama / Alumnos Destacados</strong> y en la Galería Oficial de la web.</li>
                    <li>Publicar contenido pedagógico, informativo y motivacional en los canales oficiales del club (Instagram, Facebook, TikTok y sitio web).</li>
                    <li>Generar la memoria histórica y fotográfica del dojang.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-lg text-carbon normal-case">2. Respeto Estricto a la Dignidad del Menor</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    En fiel observancia del <strong>Código de la Niñez y Adolescencia del Ecuador</strong>:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                    <li>Queda terminantemente prohibida la captación y difusión de imágenes que puedan vulnerar la intimidad, dignidad o integridad moral del menor.</li>
                    <li>Nunca se publicarán datos de geolocalización residencial, números de cédula ni información médica en conjunto con las fotografías públicas.</li>
                    <li>Las fotos se circunscriben estrictamente a situaciones deportivas, usando el uniforme oficial y en posturas de respeto y marcialidad.</li>
                  </ul>
                </section>

                <section className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-body font-bold text-base text-carbon flex items-center gap-2 normal-case">
                    <CheckCircle2 size={18} className="text-green-600" /> 3. Carácter Voluntario y Derecho de Revocatoria
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    La autorización del uso de imagen es de carácter <strong>voluntario</strong> y se consigna en la ficha de ingreso mediante la casilla de verificación <code>autorizaImagen</code>. Si un padre de familia, tutor legal o estudiante adulto decide en cualquier momento revocar este consentimiento:
                  </p>
                  <p className="text-gray-700 text-xs sm:text-sm font-medium mt-2">
                    Basta con solicitarlo formalmente al correo <span className="text-rojo-impacto">clubsociedaddeportivacentralwt@gmail.com</span> o directamente a los profesores, y la imagen será dada de baja de las galerías de la página web en un plazo máximo de <strong>48 horas hábiles</strong>.
                  </p>
                </section>
              </article>
            )}

            {/* 5. POLÍTICA DE COOKIES Y SEGURIDAD TÉCNICA */}
            {activeTab === 'cookies' && (
              <article className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-100 pb-6">
                  <span className="text-xs font-bold text-rojo-impacto uppercase tracking-widest">
                    Transparencia Digital • Política de Cookies
                  </span>
                  <h2 className="font-body font-bold text-2xl sm:text-3xl text-carbon tracking-tight normal-case mt-1">
                    Política de Cookies y Seguridad Digital
                  </h2>
                  <p className="text-xs text-gray-500 mt-2">
                    Información clara sobre el uso de cookies técnicas y las medidas de protección digital en Club Central
                  </p>
                </div>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-base sm:text-lg text-carbon normal-case">
                    1. ¿Qué son las cookies y para qué las utilizamos?
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Una cookie es un pequeño archivo de información que se guarda en su navegador web al visitar una página. En <strong>Club Central</strong> utilizamos cookies de manera transparente, ética y estrictamente limitada.
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Nuestra plataforma utiliza únicamente <strong>cookies técnicas y esenciales</strong>, las cuales son indispensables para que el sitio web cargue con rapidez, funcione de forma segura y permita al personal docente gestionar las asistencias y expedientes deportivos.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-base sm:text-lg text-carbon normal-case">
                    2. Tipos de cookies utilizadas en nuestra web
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-rojo-impacto flex items-center justify-center font-bold text-sm">
                        <Lock size={16} />
                      </div>
                      <h4 className="font-bold text-sm text-carbon normal-case">Cookies de Sesión y Autenticación Segura</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Permiten que los instructores y administradores inicien sesión en el sistema interno de forma protegida, asegurando que nadie ajeno acceda a los registros de los alumnos.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-carbon flex items-center justify-center font-bold text-sm">
                        <Activity size={16} />
                      </div>
                      <h4 className="font-bold text-sm text-carbon normal-case">Cookies de Preferencias y Rendimiento</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Recuerdan configuraciones técnicas básicas de navegación para que las páginas carguen de forma fluida e instantánea en visitas sucesivas.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3 bg-green-50/70 border-l-4 border-green-600 p-4 rounded-r-lg">
                  <h3 className="font-body font-bold text-base text-carbon flex items-center gap-2 normal-case">
                    <CheckCircle2 size={18} className="text-green-600" /> 3. Garantía de Cero Rastreo Publicitario
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    Club Central no tiene fines comerciales ajenos al deporte: <strong>no utilizamos cookies publicitarias invasivas, no instalamos píxeles de rastreo comercial de terceros ni vendemos perfiles de navegación a agencias de marketing</strong>. La visita a nuestra web es 100% privada y deportiva.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-body font-bold text-base sm:text-lg text-carbon normal-case">
                    4. ¿Cómo puede el usuario gestionar o desactivar las cookies?
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Usted puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo en cualquier momento mediante la configuración de las opciones de su navegador web:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-700">
                    <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
                    <li><strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio &gt; Administrar y eliminar cookies.</li>
                    <li><strong>Mozilla Firefox:</strong> Ajustes &gt; Privacidad y seguridad &gt; Cookies y datos del sitio.</li>
                    <li><strong>Safari (Apple):</strong> Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.</li>
                  </ul>
                  <p className="text-xs text-gray-500 pt-1">
                    Nota: La información pública de Club Central (horarios, historia, contactos, blog) continuará estando plenamente visible aun si decide deshabilitar las cookies.
                  </p>
                </section>

                <section className="space-y-3 bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-body font-bold text-base text-carbon flex items-center gap-2 normal-case">
                    <ShieldCheck size={18} className="text-rojo-impacto" /> 5. Seguridad de la Plataforma y Contacto
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                    Toda la navegación por nuestra plataforma se encuentra protegida bajo cifrado seguro (<strong>protocolo HTTPS con certificado SSL</strong>), garantizando la integridad y confidencialidad de la información.
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Si tiene dudas sobre nuestra política de cookies o el tratamiento de su información, puede comunicarse al correo: <span className="font-semibold text-carbon">clubsociedaddeportivacentralwt@gmail.com</span>.
                  </p>
                </section>
              </article>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default LegalHub;
