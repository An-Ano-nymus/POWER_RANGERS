import React, { useState, useCallback } from 'react';
import {
  Upload,
  AlertTriangle,
  CheckCircle,
  Loader2,
  FileSearch,
  Download,
} from 'lucide-react';
import Navbar from '../components/Navbar';

interface AnalysisResult {
  status: 'clean' | 'malicious' | null;
  confidence: number;
  message: string;
  virus_name?: string;
  summary?: string;
  report_url?: string;
}

export default function Scanner() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) handleFiles(files[0]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) handleFiles(files[0]);
  };

  const handleFiles = (file: File) => {
    if (file.type.startsWith('image/')) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      analyzeFile(file);
    } else {
      alert('Please upload an image file');
    }
  };

  const analyzeFile = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      // Fake delay to simulate scanning
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Random dummy result
      const randomConfidence = parseFloat((Math.random() * (99 - 92) + 92).toFixed(1));

      setResult({
        status: 'clean',
        confidence: randomConfidence,
        message: 'No threats found. Your file is safe.',
      });
    } catch (error) {
      setResult({
        status: null,
        confidence: 0,
        message: `Error: ${(error as Error).message}`,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0f1c3d] to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FileSearch className="w-20 h-20 mx-auto mb-6 text-blue-400 animate-float" />
            <h1 className="text-4xl font-bold gradient-text mb-4">Malware Scanner</h1>
            <p className="text-gray-300 text-lg">Upload your image or GIF for instant malware analysis</p>
          </div>

          <div
            className={`glass-card rounded-2xl p-12 transition-all duration-300 ${
              isDragging ? 'border-blue-400/50 bg-blue-500/10' : 'border-white/10'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              {!preview ? (
                <>
                  <Upload className="w-24 h-24 mx-auto mb-6 text-blue-400/70" />
                  <p className="text-2xl mb-6 text-white font-light">Drag and drop your file here</p>
                  <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform hover:scale-105">
                    <Upload className="w-5 h-5 mr-2" />
                    Select File
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
                  </label>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    className="px-6 py-3 bg-red-500/80 hover:bg-red-500 rounded-xl text-white transition-colors duration-300 font-semibold"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                      setResult(null);
                    }}
                  >
                    Remove File
                  </button>
                </div>
              )}
            </div>
          </div>

          {isAnalyzing && (
            <div className="mt-12 text-center glass-card rounded-2xl p-8">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-400" />
              <p className="text-white text-lg">Analyzing file...</p>
            </div>
          )}

          {result && (
            <div className="mt-12 glass-card rounded-2xl p-8 text-center">
              {result.status === 'malicious' ? (
                <>
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                  <h2 className="text-2xl font-bold text-red-500 mb-2">Malware Detected!</h2>
                  <p className="text-white mb-2">
                    <strong>Virus Name:</strong> {result.virus_name}
                  </p>
                  <p className="text-white mb-4">{result.summary}</p>
                  <p className="text-white mb-4">
                    <strong>Confidence:</strong> {result.confidence}%
                  </p>
                  {result.report_url && (
                    <a
                      href={`http://127.0.0.1:5000${result.report_url}`}
                      className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-300"
                      download
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Report
                    </a>
                  )}
                </>
              ) : result.status === 'clean' ? (
                <>
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <h2 className="text-2xl font-bold text-green-400 mb-2">No Malware Detected</h2>
                  <p className="text-white mb-4">{result.message}</p>
                  <p className="text-white">
                    <strong>Confidence:</strong> {result.confidence}%
                  </p>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-yellow-400 mb-2">Analysis Error</h2>
                  <p className="text-white">{result.message}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
