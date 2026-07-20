import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function QRScanner({ onScan, disabled }) {
  const scannerRef = useRef(null);
  const [message, setMessage] = useState('Arahkan kamera ke QR code anggota.');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!scannerRef.current || disabled) {
      setReady(false);
      setMessage('Pemindai QR sedang nonaktif.');
      return;
    }

    let scanner;

    try {
      scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
          aspectRatio: 1.0,
          disableFlip: false,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          const result = decodedText.trim();
          if (result) {
            onScan?.(result);
            setMessage(`QR terdeteksi: ${result}`);
          }
        },
        () => {
          setMessage('Arahkan kamera ke QR code anggota.');
        }
      );

      setReady(true);
      setMessage('Arahkan kamera ke QR code anggota.');
    } catch (error) {
      setReady(false);
      setMessage('Kamera tidak tersedia atau browser tidak mendukung pemindaian QR.');
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(() => {});
      }
    };
  }, [disabled, onScan]);

  return (
    <div className="qr-box">
      <div ref={scannerRef} id="qr-reader" className={`scanner-shell ${ready ? 'scanner-ready' : ''}`}>
        <div className="scanner-placeholder">Memuat kamera…</div>
      </div>
      <p>{message}</p>
      <p>Jika kamera tidak tersedia, Anda tetap bisa mengisi form absensi manual.</p>
    </div>
  );
}

export default QRScanner;
