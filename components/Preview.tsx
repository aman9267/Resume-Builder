
import React from 'react';
import { ResumeData, TemplateId } from '../types';
import * as Templates from './templates/ResumeTemplates';

interface PreviewProps {
  data: ResumeData;
  template: TemplateId;
  isDarkMode?: boolean;
}

export const Preview: React.FC<PreviewProps> = ({ data, template, isDarkMode }) => {
  return (
    <div className="bg-white dark:bg-slate-900 w-[210mm] min-h-[297mm] shadow-lg origin-top transition-all duration-300">
      <Templates.ThemedTemplate data={data} themeKey={template} isDarkMode={isDarkMode} />
    </div>
  );
};
