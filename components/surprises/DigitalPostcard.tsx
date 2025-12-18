import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Share2, Download, RefreshCw, Sparkles, Smile, Type, Trash2, MessageCircle } from 'lucide-react';

interface DigitalPostcardProps {
  currentDate: Date;
  isChristmasEve?: boolean;
}

interface Sticker {
  id: number;
  icon: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

const DigitalPostcard: React.FC<DigitalPostcardProps> = ({ currentDate, isChristmasEve = false }) => {
  const [step, setStep] = useState<'capture' | 'edit' | 'share'>('capture');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  
  // Customization States
  const [selectedFrame, setSelectedFrame] = useState<number>(0);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finalCanvasRef = useRef<HTMLCanvasElement>(null);

  // Feature Unlock Logic
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const isDay22Unlocked = (currentMonth === 11 && currentDay >= 22) || currentMonth !== 11;
  const isFullyUnlocked = isDay22Unlocked || isChristmasEve;

  // Theme Constants
  const FRAMES = [
    { name: "Plata Elegante", color: "#C0C0C0" },
    { name: "Azul Profundo", color: "#1E3A8A" },
    { name: "Nieve Mágica", color: "#E0F2FE" },
    { name: "Rojo Navidad", color: "#D42426" },
    { name: "Verde Bosque", color: "#1B5E20" },
    { name: "Oro Imperial", color: "#FFD700" },
  ];

  const STICKER_LIBRARY = ["❄️", "☃️", "🎄", "🎁", "🦌", "✨", "🔔", "🍪", "🎅", "🧣", "🕯️", "🌟"];

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) {
      setCameraError("No se pudo acceder a la cámara. Por favor sube una foto.");
      console.error(err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImageSrc(canvas.toDataURL('image/png'));
        stopCamera();
        setStep('edit');
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
          setStep('edit');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addSticker = (icon: string) => {
    const id = Date.now();
    const x = 50 + Math.random() * 500;
    const y = 50 + Math.random() * 500;
    const rotation = (Math.random() - 0.5) * 0.5;
    const scale = 0.8 + Math.random() * 0.4;
    
    setStickers([...stickers, { id, icon, x, y, rotation, scale }]);
  };

  const clearStickers = () => setStickers([]);

  useEffect(() => {
    if (step === 'edit' && imageSrc && finalCanvasRef.current) {
      const canvas = finalCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const img = new Image();
      img.onload = () => {
        canvas.width = 600;
        canvas.height = 800;

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        ctx.lineWidth = 20;
        if (selectedFrame === 0) {
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#E0E0E0'); gradient.addColorStop(0.5, '#A0A0A0'); gradient.addColorStop(1, '#E0E0E0');
          ctx.strokeStyle = gradient; ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        } else if (selectedFrame === 1) {
          ctx.strokeStyle = '#1E3A8A'; ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
          ctx.lineWidth = 5; ctx.strokeStyle = '#93C5FD'; ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70);
        } else if (selectedFrame === 2) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; ctx.fillRect(0,0, canvas.width, canvas.height);
          ctx.fillStyle = 'white';
          for(let i=0; i<80; i++) {
            ctx.beginPath(); ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, Math.PI*2); ctx.fill();
          }
          ctx.strokeStyle = '#F0F9FF'; ctx.lineWidth = 15; ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        } else if (selectedFrame === 3) {
          ctx.strokeStyle = '#D42426'; ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
          ctx.lineWidth = 4; ctx.strokeStyle = '#FFD700'; ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
        } else if (selectedFrame === 4) {
          ctx.strokeStyle = '#1B5E20'; ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
          ctx.lineWidth = 6; ctx.strokeStyle = '#FFFFFF'; ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);
        } else if (selectedFrame === 5) {
          const goldGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          goldGrad.addColorStop(0, '#BF953F'); goldGrad.addColorStop(0.25, '#FCF6BA'); goldGrad.addColorStop(0.5, '#B38728'); goldGrad.addColorStop(0.75, '#FBF5B7'); goldGrad.addColorStop(1, '#AA771C');
          ctx.strokeStyle = goldGrad; ctx.lineWidth = 25; ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
        }

        stickers.forEach(s => {
          ctx.save();
          ctx.translate(s.x, s.y); ctx.rotate(s.rotation); ctx.scale(s.scale, s.scale);
          ctx.font = "60px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.shadowColor = "rgba(0,0,0,0.3)"; ctx.shadowBlur = 5;
          ctx.fillText(s.icon, 0, 0);
          ctx.restore();
        });

        const currentYear = currentDate.getFullYear();
        const xmasDate = new Date(currentYear, 11, 25);
        const now = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const diffTime = xmasDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let mainText = daysLeft > 0 ? `Faltan ${daysLeft} días` : "¡Feliz Navidad!";
        if (currentDay === 24 && customMessage === "") mainText = "¡Feliz Nochebuena!";
        else if (customMessage.trim() !== "") mainText = customMessage;

        ctx.shadowColor = "rgba(0,0,0,0.5)"; ctx.shadowBlur = 10;
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        const footerHeight = senderName ? 140 : 100;
        const textY = canvas.height - footerHeight;
        ctx.fillRect(0, textY, canvas.width, footerHeight);
        
        ctx.font = "bold 50px 'Mountains of Christmas', cursive"; ctx.fillStyle = "#F8FAFC"; ctx.textAlign = "center";
        ctx.fillText(mainText, canvas.width / 2, textY + 55);
        
        ctx.font = "20px 'Roboto', sans-serif"; ctx.fillStyle = "#94A3B8";
        if (senderName.trim() !== "") {
          ctx.fillText(`De: ${senderName}`, canvas.width / 2, textY + 95);
          ctx.font = "italic 14px 'Roboto', sans-serif"; ctx.fillStyle = "#64748B";
          ctx.fillText("Postal Navideña • Edición Especial", canvas.width / 2, textY + 120);
        } else {
          ctx.fillText("Postal Navideña • Edición Especial", canvas.width / 2, textY + 85);
        }
      };
      img.src = imageSrc;
    }
  }, [step, imageSrc, selectedFrame, currentDate, stickers, customMessage, senderName, currentDay]);

  const downloadImage = () => {
    if (finalCanvasRef.current) {
      const link = document.createElement('a');
      link.download = 'mi-postal-navidena.png';
      link.href = finalCanvasRef.current.toDataURL();
      link.click();
      setStep('share');
    }
  };

  const shareImage = async () => {
    if (finalCanvasRef.current && navigator.share) {
      finalCanvasRef.current.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'postal-navidena.png', { type: 'image/png' });
          try {
            await navigator.share({
              title: currentDay === 24 ? '¡Feliz Nochebuena!' : 'Postal Navideña',
              text: '¡Mira la postal que he creado!',
              files: [file],
            });
          } catch (e) { console.log('Error sharing', e); }
        }
      });
    } else { downloadImage(); }
  };

  const shareViaWhatsApp = () => {
    const text = "¡Feliz Navidad! He creado una postal especial para ti. ✨🎄";
    window.open("https://wa.me/?text=" + encodeURIComponent(text), '_blank');
    downloadImage();
  };

  const reset = () => {
    setImageSrc(null); setStep('capture'); setStickers([]); setCustomMessage(""); setSenderName("");
    stopCamera();
  };

  return (
    <div className="animate-fade-in text-slate-100 w-full">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-christmas text-blue-200">
            {currentDay === 24 ? "Postal de Nochebuena" : "Postal Navideña"}
        </h3>
        <p className="text-xs text-blue-300">
            {isFullyUnlocked ? "Crea, Personaliza y Comparte" : "Edición Básica"}
        </p>
      </div>

      {step === 'capture' && (
        <div className="flex flex-col gap-4 items-center">
            {isCameraOpen ? (
                <div className="relative w-full max-w-sm aspect-[3/4] bg-black rounded-lg overflow-hidden border-2 border-blue-500 shadow-lg">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100" />
                    <button onClick={capturePhoto} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center hover:scale-110 transition-transform">
                        <div className="w-12 h-12 bg-blue-600 rounded-full"></div>
                    </button>
                </div>
            ) : (
                <div className="w-full h-48 bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center p-6 gap-4">
                    <p className="text-sm text-center text-slate-400">Toma una foto o sube una imagen</p>
                    <div className="flex gap-2">
                        <button onClick={startCamera} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                            <Camera size={20} /> Cámara
                        </button>
                        <label className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
                            <Upload size={20} /> Galería
                            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                    </div>
                    {cameraError && <p className="text-red-400 text-xs">{cameraError}</p>}
                </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {step === 'edit' && (
        <div className="flex flex-col items-center gap-6">
            <canvas ref={finalCanvasRef} className="w-full max-w-xs rounded-lg shadow-2xl border border-slate-600" />
            <div className="w-full space-y-4">
                <div>
                    <p className="text-xs uppercase tracking-widest text-blue-300 mb-2 font-bold flex items-center gap-2">
                        <Sparkles size={14} /> Marcos Festivos
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {FRAMES.map((frame, idx) => (
                            <button key={idx} onClick={() => setSelectedFrame(idx)} title={frame.name} className={`w-10 h-10 rounded-full border-2 flex-shrink-0 transition-all ${selectedFrame === idx ? 'scale-110 border-white ring-2 ring-blue-400 shadow-[0_0_10px_white]' : 'border-slate-500 opacity-70'}`} style={{ backgroundColor: frame.color }} />
                        ))}
                    </div>
                </div>

                {isFullyUnlocked && (
                    <div className="animate-fade-in-up delay-100">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-xs uppercase tracking-widest text-blue-300 font-bold flex items-center gap-2">
                                <Smile size={14} /> Stickers
                            </p>
                            {stickers.length > 0 && (
                                <button onClick={clearStickers} className="text-xs text-red-300 flex items-center gap-1 hover:text-red-200">
                                    <Trash2 size={12} /> Borrar
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-500">
                            {STICKER_LIBRARY.map((icon, idx) => (
                                <button key={idx} onClick={() => addSticker(icon)} className="text-2xl hover:scale-125 transition-transform p-1">{icon}</button>
                            ))}
                        </div>
                    </div>
                )}

                {isFullyUnlocked && (
                    <div className="animate-fade-in-up delay-200 space-y-2">
                        <p className="text-xs uppercase tracking-widest text-blue-300 font-bold flex items-center gap-2">
                            <Type size={14} /> Mensaje y Firma
                        </p>
                        <input type="text" placeholder="Mensaje Navideño" value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} maxLength={25} className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                        <input type="text" placeholder="Tu Nombre" value={senderName} onChange={(e) => setSenderName(e.target.value)} maxLength={20} className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
                    </div>
                )}
            </div>

            <div className="flex gap-2 w-full pt-2 border-t border-white/10">
                 <button onClick={downloadImage} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-1">
                    <Download size={18} /> Guardar Postal
                </button>
                 <button onClick={reset} className="w-12 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center justify-center" title="Reiniciar"><RefreshCw size={18} /></button>
            </div>
        </div>
      )}
      
      {step === 'share' && (
        <div className="flex flex-col items-center gap-4 py-6">
            <div className="bg-green-500/20 text-green-200 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-bounce-slow">
                <Sparkles size={16} /> ¡Postal Navideña Lista!
            </div>
            <p className="text-center text-sm text-slate-300">Imagen guardada correctamente.</p>
            <button onClick={shareImage} className="w-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all hover:scale-105"><Share2 size={20} /> Compartir</button>
            <button onClick={shareViaWhatsApp} className="w-full bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(22,163,74,0.5)] transition-all hover:scale-105"><MessageCircle size={20} /> WhatsApp</button>
            <button onClick={reset} className="text-slate-400 text-sm underline hover:text-white mt-2">Crear otra nueva</button>
        </div>
      )}
    </div>
  );
};

export default DigitalPostcard;