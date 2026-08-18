import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader, ImageOff, ArrowLeft, Calendar } from 'lucide-react';
import API from '../services/api';
import PhotoModal from '../components/PhotoModal';

const GaleriaDetalle = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openModal = (index) => setSelectedPhotoIndex(index);
  const closeModal = () => setSelectedPhotoIndex(null);
  
  const nextPhoto = () => {
    if (student?.gallery) {
      setSelectedPhotoIndex((prev) => (prev === student.gallery.length - 1 ? 0 : prev + 1));
    }
  };

  const prevPhoto = () => {
    if (student?.gallery) {
      setSelectedPhotoIndex((prev) => (prev === 0 ? student.gallery.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await API.get(`/students/public/${id}`);
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-screen">
        <Loader className="animate-spin text-rojo-impacto" size={50} />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center min-h-screen">
        <h2 className="text-2xl font-bold text-carbon mb-2">Estudiante no encontrado</h2>
        <Link to="/galeria" className="text-rojo-impacto hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Volver a la galería
        </Link>
      </div>
    );
  }

  const images = student.gallery || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 min-h-screen">
      
      {/* Header Profile */}
      <div className="relative bg-white border border-gray-200 rounded-3xl p-6 md:p-10 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
            {student.foto ? (
              <img src={student.foto} alt={student.nombres} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ImageOff size={40} className="text-gray-400 opacity-50" />
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left flex-1">
            <Link to="/galeria" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rojo-impacto transition-colors mb-4">
              <ArrowLeft size={16} /> Volver a perfiles
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-body font-bold text-carbon leading-tight mb-2">
              {student.nombres} <span className="text-rojo-impacto">{student.apellidos}</span>
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
              <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Grado</span>
                <span className="text-carbon font-bold text-sm">{student.grado}</span>
              </div>
              
              <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Modalidad</span>
                <span className="text-carbon font-bold text-sm">{student.modalidad || 'TAEKWONDO'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold font-body normal-case tracking-normal text-carbon flex items-center gap-3">
          Álbum de Fotos <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{images.length} fotos</span>
        </h2>
        
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 border border-gray-200 rounded-3xl text-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <ImageOff size={28} className="text-gray-400" />
            </div>
            <h3 className="text-carbon font-bold text-lg mb-1">Sin fotos todavía</h3>
            <p className="text-sm text-gray-500 max-w-md">
              El álbum personal de este estudiante aún no tiene fotos publicadas.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
            {images.map((img, index) => (
              <div 
                key={img.id} 
                className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl bg-gray-100 cursor-pointer transition-all hover:-translate-y-1"
                onClick={() => openModal(index)}
              >
                <img src={img.url} alt={img.descripcion || 'Foto del estudiante'} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-carbon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  {img.descripcion && (
                    <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md mb-2">{img.descripcion}</h3>
                  )}
                  <div className="flex items-center text-[10px] text-gray-300 gap-1.5 font-mono">
                    <Calendar size={12} className="text-rojo-impacto" />
                    {new Date(img.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PhotoModal 
        photo={selectedPhotoIndex !== null ? images[selectedPhotoIndex] : null}
        isOpen={selectedPhotoIndex !== null}
        onClose={closeModal}
        onNext={nextPhoto}
        onPrev={prevPhoto}
        hasMultiple={images.length > 1}
      />

    </div>
  );
};

export default GaleriaDetalle;
