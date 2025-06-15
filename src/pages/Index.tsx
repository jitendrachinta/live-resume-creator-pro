
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Redirect to the HTML resume builder
    window.location.href = '/index.html';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Loading Resume Builder...</h1>
        <p className="text-blue-100">Redirecting you to the interactive resume builder</p>
      </div>
    </div>
  );
};

export default Index;
