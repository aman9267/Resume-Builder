
import React from 'react';
import { TemplateId, ResumeData } from '../types';
import { CheckCircle2, Star, Eye, Zap, ShieldCheck } from 'lucide-react';
import { Preview } from './Preview';

interface TemplateSelectorProps {
  current: TemplateId;
  onSelect: (id: TemplateId) => void;
  data: ResumeData;
  isDarkMode?: boolean;
}

const TEMPLATES: { id: TemplateId; name: string; desc: string; badge?: string; badgeColor?: string }[] = [
  { id: 'modern', name: 'Modern', desc: 'Sleek sidebar layout', badge: 'Popular', badgeColor: 'bg-indigo-600' },
  { id: 'emerald-night', name: 'Emerald Night', desc: 'Deep green dark theme', badge: 'New', badgeColor: 'bg-emerald-600' },
  { id: 'minimal', name: 'Minimal', desc: 'Typographic focus', badge: 'ATS Proof', badgeColor: 'bg-slate-600' },
  { id: 'executive', name: 'Executive', desc: 'Formal & structured', badge: 'Premium', badgeColor: 'bg-blue-600' },
  { id: 'tech', name: 'Developer', desc: 'Technical & mono font' },
  { id: 'creative', name: 'Creative', desc: 'Bold & artistic' },
  { id: 'classic', name: 'Classic', desc: 'Traditional academic' },
  { id: 'bold', name: 'Bold', desc: 'High contrast design' },
  { id: 'grid', name: 'Modular', desc: 'Grid-based layout' },
  { id: 'nebula', name: 'Nebula', desc: 'Futuristic dark', badge: 'Viral', badgeColor: 'bg-purple-600' },
  { id: 'sidebar-right-1', name: 'Modern Flip', desc: 'Right-aligned sidebar' },
  { id: 'top-header-1', name: 'Top Banner', desc: 'Banner style header' },
  { id: 'centered-1', name: 'Classic Center', desc: 'Centered typography' },
  { id: 'bento-1', name: 'Bento UI', desc: 'Card-based layout' },
  { id: 'azure', name: 'Azure', desc: 'Ocean deep blue' },
  { id: 'forest', name: 'Forest', desc: 'Natural emerald' },
  { id: 'crimson', name: 'Crimson', desc: 'Powerful rose' },
  { id: 'midnight-gold', name: 'Royal Gold', desc: 'Luxury finish', badge: 'Elite', badgeColor: 'bg-yellow-600' },
  { id: 'modern-pro', name: 'Modern Pro', desc: 'Clean business' },
  { id: 'minimal-dark', name: 'Minimal Dark', desc: 'Sleek dark mode' },
];

const ALL_TEMPLATES = [...TEMPLATES];
const placeholders = ['impact', 'alpha', 'omega', 'zen', 'global', 'heritage', 'clean', 'smart', 'elite', 'professional'];
placeholders.forEach(p => {
  ALL_TEMPLATES.push({ id: `${p}-1` as TemplateId, name: p.charAt(0).toUpperCase() + p.slice(1), desc: `${p} business style` });
  ALL_TEMPLATES.push({ id: `${p}-2` as TemplateId, name: `${p.toUpperCase()} Pro`, desc: `Enhanced ${p} layout` });
});

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ current, onSelect, data, isDarkMode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 pb-32">
      {ALL_TEMPLATES.map((t) => (
        <div key={t.id} className="group flex flex-col items-center">
          <button 
            onClick={() => onSelect(t.id)}
            className={`relative w-full aspect-[1/1.414] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border-2 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 text-left mb-4 ${
              current === t.id ? 'border-indigo-500 ring-4 ring-indigo-50 dark:ring-indigo-900/30' : 'border-slate-100 dark:border-slate-800 group-hover:border-slate-200 dark:group-hover:border-slate-700'
            }`}
          >
            <div className="absolute inset-0 origin-top-left scale-[0.25] w-[400%] h-[400%] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity">
              <Preview data={data} template={t.id} isDarkMode={isDarkMode} />
            </div>
            
            <div className={`absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 bg-indigo-600/0 ${current === t.id ? 'opacity-100 bg-indigo-600/10' : 'group-hover:opacity-100 group-hover:bg-indigo-600/20'}`}>
               <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                 {current === t.id ? (
                   <CheckCircle2 className="text-indigo-600 dark:text-indigo-400" size={28} />
                 ) : (
                   <Eye className="text-indigo-600 dark:text-indigo-400" size={24} />
                 )}
               </div>
            </div>

            {t.badge && (
              <div className={`absolute top-4 left-4 ${t.badgeColor || 'bg-indigo-600'} text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg z-10`}>
                <Zap size={10} fill="currentColor" /> {t.badge}
              </div>
            )}
          </button>
          
          <div className="text-center w-full px-2">
            <h3 className="font-black text-slate-800 dark:text-white text-xs md:text-sm uppercase tracking-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors capitalize">{t.name.replace('-', ' ')}</h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1 truncate">{t.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
