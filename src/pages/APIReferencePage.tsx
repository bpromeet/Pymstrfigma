import React, { useEffect } from 'react';
import APIReference from '../components/APIReference';

const APIReferencePage: React.FC = () => {
  const handleBack = () => {
    // Navigate to Documents page by updating URL hash
    // This will trigger the app's navigation system to show the Documents page
    window.location.hash = '#/documents';
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <APIReference onBack={handleBack} />;
};

export default APIReferencePage;
