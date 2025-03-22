"use client"
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [submissionType, setSubmissionType] = useState('file');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    projectName: '',
    description: '',
    designUrl: ''
  });
  const [designFile, setDesignFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDesignFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setDesignFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (submissionType === 'file') {
        if (!designFile) {
          throw new Error('Please select a design file to upload');
        }
        
        const formDataToSend = new FormData();
        formDataToSend.append('email', formData.email);
        formDataToSend.append('projectName', formData.projectName);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('design', designFile);
        
        const response = await fetch('http://localhost:5000/api/submit/file', {
          method: 'POST',
          body: formDataToSend,
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit design file');
        }
        
        const data = await response.json();
        // Redirect to success page
        router.push(`/success?id=${data.submission.id}`);
        
      } else if (submissionType === 'url') {
        if (!formData.designUrl) {
          throw new Error('Please enter a valid design URL');
        }
        
        const response = await fetch('http://localhost:5000/api/submit/url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit design URL');
        }
        
        const data = await response.json();
        // Redirect to success page
        router.push(`/success?id=${data.submission.id}`);
      }
      
    } catch (err) {
      console.error('Error submitting design:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Head>
        <title>Design Assessment Submission</title>
        <meta name="description" content="Submit your design for assessment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-gray-900 shadow-xl rounded-lg overflow-hidden border border-gray-800">
          <div className="bg-gray-800 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Design Assessment Submission</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    submissionType === 'file'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setSubmissionType('file')}
                >
                  Upload File
                </button>
                <button
                  className={`px-4 py-2 rounded-md transition-colors ${
                    submissionType === 'url'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => setSubmissionType('url')}
                >
                  Submit URL
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/30 text-red-300 border border-red-800 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  required
                  placeholder="your@email.com"
                />
              </div>

              {submissionType === 'file' ? (
                <div className="mb-6">
                  <label className="block text-gray-300 font-medium mb-2">
                    Upload Design File *
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-700 rounded-md p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('design').click()}
                  >
                    <input
                      type="file"
                      id="design"
                      name="design"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-lg font-medium text-gray-300 mb-1">
                        Drop your file here
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {designFile ? designFile.name : 'or browse to upload'}
                      </p>
                      <button
                        type="button"
                        className="bg-gray-700 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Browse Files
                      </button>
                    </div>
                    
                    {preview && (
                      <div className="mt-6">
                        <p className="text-sm text-gray-400 mb-2">Preview:</p>
                        <img
                          src={preview}
                          alt="Design preview"
                          className="max-h-60 mx-auto rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block text-gray-300 font-medium mb-2" htmlFor="designUrl">
                    Design URL *
                  </label>
                  <input
                    type="url"
                    id="designUrl"
                    name="designUrl"
                    value={formData.designUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                    placeholder="https://"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the URL to your design (Figma, Behance, Dribbble, etc.)
                  </p>
                </div>
              )}

              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Submit Design'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}