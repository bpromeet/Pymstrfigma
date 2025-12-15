import React, { useState } from 'react';
import { FileText, BookOpen, Code, ChevronRight, ExternalLink, Anchor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import PageLayout from '../components/PageLayout';

interface DocumentsPageProps {
  onNavigateToDoc: (doc: 'quickstart' | 'api-reference' | 'code-examples') => void;
}

const DocumentsPage: React.FC<DocumentsPageProps> = ({ onNavigateToDoc }) => {
  const documentCategories = [
    {
      id: 'quickstart' as const,
      title: 'Quick Start',
      description: 'Get started with PYMSTR in minutes. Learn the basics and integrate your first payment.',
      icon: BookOpen,
      color: '#1E88E5',
      bgColor: 'bg-[#E3F2FD]',
      darkBgColor: 'dark:bg-[#1E88E5]/10',
      estimatedTime: '5 min read',
      topics: [
        'Account Setup',
        'API Key Generation',
        'First Payment Integration',
        'Testing & Deployment'
      ]
    },
    {
      id: 'api-reference' as const,
      title: 'API Reference',
      description: 'Complete API documentation with all endpoints, parameters, and response formats.',
      icon: Code,
      color: '#07D7FF',
      bgColor: 'bg-[#07D7FF]/10',
      darkBgColor: 'dark:bg-[#07D7FF]/10',
      estimatedTime: '15 min read',
      topics: [
        'Authentication',
        'Payment Links API',
        'Webhooks',
        'Error Handling'
      ]
    },
    {
      id: 'code-examples' as const,
      title: 'Code Examples',
      description: 'Ready-to-use code snippets in multiple languages. Copy, paste, and customize.',
      icon: FileText,
      color: '#F90BD5',
      bgColor: 'bg-[#F90BD5]/10',
      darkBgColor: 'dark:bg-[#F90BD5]/10',
      estimatedTime: '10 min read',
      topics: [
        'Node.js Integration',
        'Python Examples',
        'cURL Commands',
        'React Components'
      ]
    }
  ];

  return (
    <PageLayout>
      <PageLayout.Header
        icon={<BookOpen className="w-6 h-6 text-[#FF5914]" />}
        title="Documentation"
        subtitle="Integration Guides & API Docs"
      />
      
      <PageLayout.Content>
        {/* Document Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {documentCategories.map((doc) => {
          const Icon = doc.icon;
          
          return (
            <Card 
              key={doc.id}
              className="group hover:shadow-md transition-all duration-200 cursor-pointer border border-[#43586C] hover:border-[#07D7FF]"
              onClick={() => onNavigateToDoc(doc.id)}
            >
              <CardHeader>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${doc.bgColor} ${doc.darkBgColor} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" style={{ color: doc.color }} />
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#07D7FF] transition-colors" />
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {doc.description}
                  </CardDescription>
                </div>

                {/* Estimated Time Badge */}
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
                    {doc.estimatedTime}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                {/* Topics List */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Topics Covered
                  </p>
                  <ul className="space-y-1.5">
                    {doc.topics.map((topic, index) => (
                      <li 
                        key={index}
                        className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-[#07D7FF]" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToDoc(doc.id);
                  }}
                  className="w-full mt-6 bg-transparent border border-[#43586C] text-gray-900 dark:text-white hover:bg-[#E3F2FD] dark:hover:bg-[#07D7FF]/10 hover:border-[#07D7FF] rounded-full transition-all duration-200"
                >
                  View Documentation
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
        </div>

        {/* Additional Resources Section */}
        <Card className="border border-[#43586C] rounded-2xl shadow-sm bg-white dark:bg-[#303030]">
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>
            More tools and documentation to help you integrate PYMSTR
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#1E88E5]/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-[#1E88E5]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1">Developer Blog</h4>
                <p className="text-xs text-muted-foreground">
                  Latest updates, tutorials, and best practices
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#07D7FF]/10 flex items-center justify-center flex-shrink-0">
                <Code className="w-5 h-5 text-[#07D7FF]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1">GitHub Repository</h4>
                <p className="text-xs text-muted-foreground">
                  Sample projects and open-source SDKs
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#F90BD5]/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-[#F90BD5]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1">Postman Collection</h4>
                <p className="text-xs text-muted-foreground">
                  Import and test all API endpoints instantly
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#7DD069]/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-[#7DD069]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-1">Video Tutorials</h4>
                <p className="text-xs text-muted-foreground">
                  Step-by-step integration walkthroughs
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </CardContent>
        </Card>
      </PageLayout.Content>
    </PageLayout>
  );
};

export default DocumentsPage;