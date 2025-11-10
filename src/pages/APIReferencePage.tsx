import React, { useEffect } from 'react';
import APIReference from '../components/APIReference';

const APIReferencePage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <APIReference onBack={() => window.history.back()} />;
};

export default APIReferencePage;
