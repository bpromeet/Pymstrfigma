import React, { useEffect } from 'react';
import CodeExamples from '../components/CodeExamples';

const CodeExamplesPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return <CodeExamples onBack={() => window.history.back()} />;
};

export default CodeExamplesPage;
