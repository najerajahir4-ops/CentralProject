import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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
    { id: 'privacidad', label: 'Política de Privacidad' },
    { id: 'terminos', label: 'Términos y Condiciones' },
    { id: 'descargo', label: 'Descargo Deportivo y Médico' },
    { id: 'imagen', label: 'Uso de Imagen y Menores' },
    { id: 'cookies', label: 'Cookies y Seguridad' },
  ];

  return (
    <div className="bg-blanco-absoluto min-h-screen text-carbon pb-24 font-body">
      {/* HEADER PRINCIPAL */}
      <div className="border-b border-gray-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="font-oswald uppercase font-bold text-3xl sm:text-4xl text-carbon tracking-[2px] leading-tight">
              Centro <span className="text-rojo-impacto">Legal</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-body">
              Términos institucionales, políticas de privacidad y normativas de Club Central.
            </p>
          </div>
        </div>
      </div>

      {/* CONTENEDOR: SIDEBAR NAVEGACIÓN + TEXTO */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* SIDEBAR NAVEGACIÓN */}
          <aside className="lg:col-span-3 print:hidden">
            <div className="sticky top-24 space-y-6">
              <p className="font-oswald text-xs font-semibold uppercase tracking-widest text-gray-400">
                Documentación
              </p>
              
              <nav className="space-y-1 border-l border-gray-200">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setTab(tab.id)}
                      className={`w-full text-left py-2.5 pl-4 font-oswald uppercase text-sm tracking-wider transition-colors -ml-px block ${
                        isActive
                          ? 'border-l-2 border-rojo-impacto text-carbon font-bold'
                          : 'border-l-2 border-transparent text-gray-500 hover:text-carbon hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-gray-100 text-xs text-gray-500 space-y-1 font-body">
                <p className="font-medium text-carbon">Contacto institucional</p>
                <p className="truncate text-gray-500">clubsociedaddeportivacentralwt@gmail.com</p>
                <p className="text-gray-500">+593 98 452 2651</p>
                <p className="text-gray-400 pt-1">Santo Domingo, Ecuador</p>
              </div>
            </div>
          </aside>

          {/* CONTENIDO DEL DOCUMENTO ACTIVO */}
          <main className="lg:col-span-9 max-w-3xl">
            
            {/* 1. POLÍTICA DE PRIVACIDAD */}
            {activeTab === 'privacidad' && (
              <article className="space-y-6 animate-fade-in text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <header className="border-b border-gray-200/80 pb-4">
                  <h2 className="font-oswald uppercase font-bold text-2xl sm:text-3xl text-carbon tracking-[2px]">
                    Política de <span className="text-rojo-impacto">Privacidad</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 font-body">
                    Conforme a la Ley Orgánica de Protección de Datos Personales (LOPDP) de la República del Ecuador.
                  </p>
                </header>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    1. Responsable del Tratamiento
                  </h3>
                  <p>
                    El responsable del tratamiento de los datos personales es <strong>Club Central (Taekwondo & Kickboxing)</strong>, academia deportiva dirigida por los profesores Diego Pérez y Mauricio Almeida, con sede en calle Federico Páez y Av. Jacinto Cortez, Santo Domingo, Ecuador. Correo de contacto institucional: <span className="text-carbon font-medium">clubsociedaddeportivacentralwt@gmail.com</span>.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    2. Principios de Tratamiento
                  </h3>
                  <p>
                    Tratamos la información bajo los principios de juridicidad, transparencia, lealtad, confidencialidad, minimización y proporcionalidad, recopilando únicamente los datos indispensables para la actividad deportiva.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    3. Datos Recopilados y Finalidad
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><strong className="text-carbon font-medium">Identificación y Contacto:</strong> Nombres, número de cédula, edad, teléfonos y correo. Utilizados para el registro de afiliación, diplomas y carnets marciales.</li>
                    <li><strong className="text-carbon font-medium">Representantes Legales (Menores):</strong> Nombres, cédula y teléfono de contacto para autorizaciones parentales y contacto de emergencia.</li>
                    <li><strong className="text-carbon font-medium">Datos Administrativos de Pago:</strong> Registro de aportes mensuales, fecha de vencimiento y periodicidad para la gestión de membresías.</li>
                    <li><strong className="text-carbon font-medium">Asistencia y Grados:</strong> Control de asistencia diario y registro de cinturones para habilitación a exámenes y torneos.</li>
                  </ul>
                </section>

                <section className="space-y-2 border-l-2 border-rojo-impacto/50 pl-4 py-1 my-4 bg-gray-50/50 rounded-r">
                  <h3 className="font-oswald uppercase font-bold text-base text-carbon tracking-wider">
                    4. Tratamiento de Datos de Salud (Art. 25 LOPDP)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-body">
                    La ficha médica (alergias o lesiones previas) constituye una categoría especial de datos. Se utiliza exclusivamente para proteger la salud física del deportista durante los entrenamientos y orientar una atención de emergencia oportuna.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    5. Protección de Menores de Edad
                  </h3>
                  <p>
                    Conforme al Código de la Niñez y Adolescencia del Ecuador, el registro de deportistas menores de 18 años requiere la debida autorización de su padre, madre o representante legal.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    6. Derechos del Titular (ARCO)
                  </h3>
                  <p>
                    Usted tiene derecho a solicitar en cualquier momento el acceso, rectificación, actualización, supresión o revocatoria del consentimiento de sus datos personales.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 border border-gray-200/80 rounded-lg">
                      <p className="font-oswald uppercase tracking-wider font-bold text-xs text-carbon">Acceso y Rectificación</p>
                      <p className="text-xs text-gray-500 mt-0.5 font-body">Conocer y corregir los datos registrados en el expediente.</p>
                    </div>
                    <div className="p-3 border border-gray-200/80 rounded-lg">
                      <p className="font-oswald uppercase tracking-wider font-bold text-xs text-carbon">Supresión y Revocatoria</p>
                      <p className="text-xs text-gray-500 mt-0.5 font-body">Solicitar el retiro de información o revocar el consentimiento voluntario.</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 pt-1">
                    Para ejercer estos derechos, envíe una comunicación a <span className="text-carbon font-medium">clubsociedaddeportivacentralwt@gmail.com</span> adjuntando copia de identificación.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    7. Seguridad y Cero Comercialización
                  </h3>
                  <p>
                    Club Central no comercializa, transfiere ni cede bases de datos a terceros para fines publicitarios. La información se aloja en infraestructura protegida bajo certificados SSL/TLS y directivas de acceso restringido.
                  </p>
                </section>
              </article>
            )}

            {/* 2. TÉRMINOS Y CONDICIONES */}
            {activeTab === 'terminos' && (
              <article className="space-y-6 animate-fade-in text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <header className="border-b border-gray-200/80 pb-4">
                  <h2 className="font-oswald uppercase font-bold text-2xl sm:text-3xl text-carbon tracking-[2px]">
                    Términos y <span className="text-rojo-impacto">Condiciones</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 font-body">
                    Normativa de formación marcial, convivencia, asistencia y cuotas en Club Central.
                  </p>
                </header>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    1. Membresía y Formación Marcial
                  </h3>
                  <p>
                    La matrícula otorga el derecho a recibir instrucción técnica en Taekwondo Olímpico (WT) o Kickboxing en los horarios convenidos. El alumno se compromete a respetar los valores de las artes marciales: cortesía, integridad, perseverancia, autocontrol y espíritu indomable.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    2. Política de Pagos y Mensualidades
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                    <li><strong className="text-carbon font-medium">Ciclo de Cobro:</strong> Cada alumno cuenta con una fecha de corte mensual asignada al inscribirse. Las pensiones corresponden a periodos regulares de 30 días calendario.</li>
                    <li><strong className="text-carbon font-medium">Puntualidad:</strong> Para asegurar la operatividad y sostenibilidad de la sede, las cuotas deben abonarse dentro de los primeros 5 días posteriores a la fecha de corte.</li>
                    <li><strong className="text-carbon font-medium">Reembolsos:</strong> Los valores por concepto de inscripción o mensualidades no son reembolsables una vez iniciado el periodo correspondiente.</li>
                    <li><strong className="text-carbon font-medium">Congelamiento por Fuerza Mayor:</strong> Ante prescripción médica justificada, se puede solicitar la suspensión temporal de la membresía por un periodo máximo de 30 días continuos.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    3. Indumentaria y Equipamiento
                  </h3>
                  <p>
                    Es requisito presentarse con el uniforme reglamentario (Dobok o indumentaria deportiva) limpio. En sesiones de combate controlado es obligatorio el uso de implementos de protección homologados (cabezal, pechera, bucal, canilleras y coquilla).
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    4. Disciplina y Convivencia
                  </h3>
                  <p>
                    Club Central se reserva el derecho de admisión y permanencia. Constituyen faltas graves pasibles de suspensión o separación definitiva las faltas de respeto hacia compañeros o profesores, el uso indebido de las técnicas en riñas fuera del dojang, o actitudes antideportivas reiteradas.
                  </p>
                </section>
              </article>
            )}

            {/* 3. DESCARGO DEPORTIVO Y MÉDICO */}
            {activeTab === 'descargo' && (
              <article className="space-y-6 animate-fade-in text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <header className="border-b border-gray-200/80 pb-4">
                  <h2 className="font-oswald uppercase font-bold text-2xl sm:text-3xl text-carbon tracking-[2px]">
                    Descargo Deportivo <span className="text-rojo-impacto">& Médico</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 font-body">
                    Consentimiento informado y declaración de aptitud física para artes marciales de contacto.
                  </p>
                </header>

                <div className="border-l-2 border-gray-300 pl-4 py-1 text-sm text-gray-600 italic bg-gray-50/40 rounded-r">
                  La práctica del Taekwondo Olímpico y Kickboxing implica acondicionamiento cardiovascular, ejercicios de elasticidad y combate deportivo reglado. Al inscribirse, el alumno y su representante declaran conocer y aceptar las siguientes disposiciones.
                </div>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    1. Asunción de Riesgos Inherentes
                  </h3>
                  <p>
                    El alumno y su representante reconocen que, aun aplicando medidas docentes preventivas y protecciones adecuadas, las disciplinas de contacto conllevan un riesgo fortuito de contusiones, distensiones musculares o lesiones derivadas del esfuerzo físico inherente al deporte.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    2. Declaración de Aptitud Física
                  </h3>
                  <p>El deportista (o su representante legal) certifica bajo juramento que:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                    <li>Se encuentra en condiciones físicas y de salud aptas para la actividad física formativa.</li>
                    <li>No ha ocultado antecedentes de cardiopatías no controladas, afecciones respiratorias agudas ni lesiones articulares sin el debido alta médica.</li>
                    <li>Notificará oportunamente a los instructores ante cualquier malestar, mareo o síntoma anómalo durante las clases.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    3. Protocolo de Primeros Auxilios
                  </h3>
                  <p>
                    Ante cualquier eventualidad física, el personal técnico prestará asistencia primaria inmediata y contactará al teléfono de emergencia registrado en la ficha. De ser necesario, se coordinará el traslado al centro de salud más cercano.
                  </p>
                </section>
              </article>
            )}

            {/* 4. USO DE IMAGEN Y MENORES */}
            {activeTab === 'imagen' && (
              <article className="space-y-6 animate-fade-in text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <header className="border-b border-gray-200/80 pb-4">
                  <h2 className="font-oswald uppercase font-bold text-2xl sm:text-3xl text-carbon tracking-[2px]">
                    Uso de Imagen <span className="text-rojo-impacto">& Menores</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 font-body">
                    Tratamiento de fotografías y videos institucionales en actividades del dojang.
                  </p>
                </header>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    1. Finalidad Deportiva e Institucional
                  </h3>
                  <p>
                    Las grabaciones y fotografías tomadas en entrenamientos, exámenes de cinturón y campeonatos tienen como exclusivo fin difundir los avances de los atletas, celebrar logros en el Salón de la Fama y comunicar eventos en los canales oficiales de la academia.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    2. Cuidado de la Dignidad del Menor
                  </h3>
                  <p>
                    Conforme al Código de la Niñez y Adolescencia del Ecuador, no se difunden imágenes que vulneren la intimidad ni se asocian fotografías con direcciones domiciliarias o números de identificación personal. Todo el contenido es estrictamente deportivo e institucional.
                  </p>
                </section>

                <section className="space-y-2 border-l-2 border-gray-300 pl-4 py-1 my-4 bg-gray-50/40 rounded-r">
                  <h3 className="font-oswald uppercase font-bold text-sm text-carbon tracking-wider">
                    3. Carácter Voluntario y Revocatoria
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-body">
                    El consentimiento para difusión de imágenes es enteramente voluntario. Si en cualquier momento un representante o alumno decide revocar esta autorización, bastará con comunicarlo por correo a <span className="text-carbon font-medium">clubsociedaddeportivacentralwt@gmail.com</span> y los registros serán retirados del portal web en un plazo máximo de 48 horas hábiles.
                  </p>
                </section>
              </article>
            )}

            {/* 5. COOKIES Y SEGURIDAD */}
            {activeTab === 'cookies' && (
              <article className="space-y-6 animate-fade-in text-gray-600 text-sm sm:text-[15px] leading-relaxed">
                <header className="border-b border-gray-200/80 pb-4">
                  <h2 className="font-oswald uppercase font-bold text-2xl sm:text-3xl text-carbon tracking-[2px]">
                    Cookies & <span className="text-rojo-impacto">Seguridad Digital</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 font-body">
                    Información sobre cookies técnicas y estándares de navegación segura.
                  </p>
                </header>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    1. Uso de Cookies Técnicas
                  </h3>
                  <p>
                    Una cookie es un pequeño identificador que se conserva en su navegador. Club Central utiliza exclusivamente <strong>cookies técnicas esenciales</strong> para el inicio de sesión del panel docente y el rendimiento fluido del portal.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    2. Cero Rastreo Publicitario
                  </h3>
                  <p>
                    Nuestra web no instala cookies publicitarias de terceros, no contiene píxeles de remarketing comercial ni elabora perfiles de navegación para venta a agencias. La interacción es de carácter deportivo y educativo.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    3. Cifrado y Conexión Segura
                  </h3>
                  <p>
                    Todas las transmisiones entre su navegador y nuestra plataforma se realizan bajo cifrado seguro HTTPS (TLS/SSL), garantizando la confidencialidad de la información.
                  </p>
                </section>

                <section className="space-y-2">
                  <h3 className="font-oswald uppercase font-bold text-lg text-carbon tracking-wider pt-2">
                    4. Control en el Navegador
                  </h3>
                  <p>
                    Usted puede configurar su navegador (Chrome, Edge, Safari o Firefox) para bloquear o borrar las cookies técnicas en cualquier momento desde las opciones de privacidad de su equipo.
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
