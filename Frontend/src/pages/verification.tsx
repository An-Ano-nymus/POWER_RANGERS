import React, { useState } from 'react';
import { Shield, Upload, Download, ShieldAlert } from 'lucide-react';

function App() {
  const [sendImage, setSendImage] = useState<string | null>(null);
  const [verifyImage, setVerifyImage] = useState<string | null>(null);
  const [hasMalware, setHasMalware] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = async (imageData: string, type: 'send' | 'verify') => {
    try {
      const response = await fetch('/api/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error('Backend not integrated');
      }

      const data = await response.json();

      if (type === 'send') {
        setSendImage(data.processedImage);
      } else {
        setHasMalware(data.hasMalware);
        if (!data.hasMalware) {
          setVerifyImage(data.processedImage);
        } else {
          setVerifyImage(null);
        }
      }
    } catch (error: any) {
      console.error('Error processing image:', error);
      if (type === 'verify') {
        setVerifyImage(null);
        setHasMalware(false);
        alert(error.message || 'Error contacting backend');
      } else {
        setSendImage(null);
        alert(error.message || 'Error contacting backend');
      }
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'send' | 'verify') => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      if (type === 'verify') setIsProcessing(true);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageData = reader.result as string;
        await processImage(imageData, type);
        if (type === 'verify') setIsProcessing(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        if (type === 'verify') setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (sendImage) {
      const link = document.createElement('a');
      link.href = sendImage;
      link.download = 'secure-shield-image.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-12 h-12 text-red-500" />
          <h1 className="text-4xl font-bold ml-3">SecureShield</h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Experience next-generation security with our advanced AI-powered malware detection system. 
          Protect your digital assets with real-time analysis of images.
        </p>
      </div>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Send Card */}
        <div className="bg-[#112240] rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Upload className="w-6 h-6 mr-2 text-blue-400" />
            Send
          </h2>
          <div className="aspect-square mb-6 bg-[#1e293b] rounded-lg overflow-hidden flex items-center justify-center">
            {sendImage ? (
              <img src={sendImage} alt="Send Preview" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="text-gray-500">No image uploaded</div>
            )}
          </div>
          <div className="flex gap-4">
            <label className="flex-1">
              <input
                type="file"
                onChange={(e) => handleUpload(e, 'send')}
                accept="image/*"
                className="hidden"
              />
              <div className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
              <form action="/upload"><button> Upload</button></form>  
              </div>
            </label>
            <button
              onClick={handleDownload}
              disabled={!sendImage}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              <form action="/download"><button> Download</button></form> 
            </button>
          </div>
        </div>

        {/* Verify Card */}
        <div className="bg-[#112240] rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <ShieldAlert className="w-6 h-6 mr-2 text-purple-400" />
            Verify
          </h2>
          <div className="aspect-square mb-6 bg-[#1e293b] rounded-lg overflow-hidden flex items-center justify-center">
            {isProcessing ? (
              <div className="text-blue-400 flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-2"></div>
                <p>Processing image...</p>
              </div>
            ) : hasMalware ? (
              <div className="text-red-500 flex flex-col items-center">
                <ShieldAlert className="w-12 h-12 mb-2" />
                <p>You can't access this. This contains malware.</p>
              </div>
            ) : verifyImage ? (
              <img src={verifyImage} alt="Verify Preview" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="text-gray-500">No image uploaded</div>
            )}
          </div>
          <div className="flex gap-4">
            <label className="flex-1">
              <input
                type="file"
                onChange={(e) => handleUpload(e, 'verify')}
                accept="image/*"
                className="hidden"
                disabled={isProcessing}
                          />
                          
              <div
                className={`w-full ${
                  isProcessing
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-500 hover:bg-purple-600 cursor-pointer'
                } text-white py-2 px-4 rounded-lg flex items-center justify-center`}
              >
                <Upload className="w-4 h-4 mr-2" />
                <form action="/view"><button> Upload</button></form> 
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
