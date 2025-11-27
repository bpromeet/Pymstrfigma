import React, { useEffect } from 'react';
import CodeExamples from '../components/CodeExamples';

const CodeExamplesPage: React.FC = () => {
  const handleBack = () => {
    // Navigate to Documents page by updating URL hash
    // This will trigger the app's navigation system to show the Documents page
    window.location.hash = '#/documents';
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <CodeExamples onBack={handleBack} />;
};

export default CodeExamplesPage;
