import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader, ImageOff, ArrowLeft, Calendar } from 'lucide-react';
import API from '../services/api';
import PhotoModal from '../components/PhotoModal';

const GeneralGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openModal = (index) => setSelectedPhotoIndex(index);
  const closeModal = () => setSelectedPhotoIndex(null);

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await API.get('/general-photos');
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching general photos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-screen">
        <Loader className="animate-spin text-rojo-impacto" size={50} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 min-h-screen">
      
      {/* Header Profile */}
      <div className="relative bg-white border border-gray-200 rounded-3xl p-6 md:p-10 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          
          <div className="text-center md:text-left flex-1">
            <Link to="/galeria" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rojo-impacto transition-colors mb-4">
              <ArrowLeft size={16} /> Volver a perfiles
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-body font-bold text-carbon leading-tight mb-2">
              FOTOS <span className="text-rojo-impacto">GENERALES</span>
            </h1>
            <p className="text-gray-500 font-body">Álbum del Dojang, seminarios, torneos y momentos especiales de todo el equipo.</p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold font-body normal-case tracking-normal text-carbon flex items-center gap-3">
          Álbum Público <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{photos.length} fotos</span>
        </h2>
        
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 border border-gray-200 rounded-3xl text-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
              <ImageOff size={28} className="text-gray-400" />
            </div>
            <h3 className="text-carbon font-bold text-lg mb-1">Sin fotos todavía</h3>
            <p className="text-sm text-gray-500 max-w-md">
              El álbum general aún no tiene fotos publicadas.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
            {photos.map((img, index) => (
              <div 
                key={img.id} 
                className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl bg-gray-100 cursor-pointer transition-all hover:-translate-y-1"
                onClick={() => openModal(index)}
              >
                <img src={img.url} alt={img.descripcion || 'Foto del evento'} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                
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
        photo={selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null}
        isOpen={selectedPhotoIndex !== null}
        onClose={closeModal}
        onNext={nextPhoto}
        onPrev={prevPhoto}
        hasMultiple={photos.length > 1}
      />

    </div>
  );
};

export default GeneralGallery;
