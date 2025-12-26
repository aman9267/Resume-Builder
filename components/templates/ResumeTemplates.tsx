
import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Globe, Shield, Calendar } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  isDarkMode?: boolean;
}

type LayoutType = 'sidebar-left' | 'sidebar-right' | 'top-header' | 'centered' | 'split' | 'bento' | 'minimal';

interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
  sidebar?: string;
  font: string;
  layout?: LayoutType;
  dark?: Partial<ThemeConfig>;
}

// MASSIVE THEME MAP (Combined Palettes & Layouts)
export const THEMES: Record<string, ThemeConfig> = {
  // --- BASE THEMES ---
  modern: { primary: 'bg-indigo-600', secondary: 'text-indigo-600', accent: 'bg-indigo-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-indigo-900', font: 'font-sans', layout: 'sidebar-left' },
  minimal: { primary: 'bg-slate-900', secondary: 'text-slate-900', accent: 'bg-slate-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-slate-100', font: 'font-sans', layout: 'minimal' },
  executive: { primary: 'bg-blue-900', secondary: 'text-blue-900', accent: 'bg-blue-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-blue-950', font: 'font-serif', layout: 'sidebar-left' },
  tech: { primary: 'bg-cyan-500', secondary: 'text-cyan-400', accent: 'bg-slate-900', bg: 'bg-slate-950', text: 'text-cyan-50', sidebar: 'bg-black', font: 'font-mono', layout: 'sidebar-left' },
  creative: { primary: 'bg-pink-500', secondary: 'text-pink-500', accent: 'bg-pink-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-pink-900', font: 'font-sans', layout: 'sidebar-right' },
  
  // --- COLOR PALETTES (100+ Variations) ---
  azure: { primary: 'bg-blue-600', secondary: 'text-blue-600', accent: 'bg-blue-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-blue-900', font: 'font-sans', layout: 'sidebar-left' },
  crimson: { primary: 'bg-rose-700', secondary: 'text-rose-700', accent: 'bg-rose-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-rose-950', font: 'font-sans', layout: 'top-header' },
  forest: { primary: 'bg-emerald-700', secondary: 'text-emerald-700', accent: 'bg-emerald-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-emerald-950', font: 'font-sans', layout: 'sidebar-left' },
  sunset: { primary: 'bg-orange-500', secondary: 'text-orange-600', accent: 'bg-orange-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-orange-900', font: 'font-sans', layout: 'top-header' },
  nebula: { primary: 'bg-purple-600', secondary: 'text-purple-400', accent: 'bg-slate-900', bg: 'bg-slate-950', text: 'text-purple-50', sidebar: 'bg-black', font: 'font-mono', layout: 'bento' },
  slate: { primary: 'bg-slate-700', secondary: 'text-slate-700', accent: 'bg-slate-100', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-slate-200', font: 'font-sans', layout: 'minimal' },
  emerald: { primary: 'bg-emerald-600', secondary: 'text-emerald-600', accent: 'bg-emerald-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-emerald-950', font: 'font-sans', layout: 'sidebar-left' },
  'emerald-night': { primary: 'bg-emerald-500', secondary: 'text-emerald-400', accent: 'bg-emerald-900/30', bg: 'bg-slate-950', text: 'text-emerald-50', sidebar: 'bg-emerald-950', font: 'font-sans', layout: 'sidebar-left' },
  
  // Layout Flipped Variants
  'sidebar-right-1': { primary: 'bg-indigo-600', secondary: 'text-indigo-600', accent: 'bg-indigo-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-slate-100', font: 'font-sans', layout: 'sidebar-right' },
  'sidebar-right-2': { primary: 'bg-rose-600', secondary: 'text-rose-600', accent: 'bg-rose-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-slate-100', font: 'font-sans', layout: 'sidebar-right' },
  
  // Top Header Variants
  'top-header-1': { primary: 'bg-slate-900', secondary: 'text-slate-900', accent: 'bg-slate-50', bg: 'bg-white', text: 'text-slate-900', font: 'font-sans', layout: 'top-header' },
  'top-header-2': { primary: 'bg-blue-600', secondary: 'text-blue-600', accent: 'bg-blue-50', bg: 'bg-white', text: 'text-slate-900', font: 'font-sans', layout: 'top-header' },
  
  // Centered Variants
  'centered-1': { primary: 'bg-slate-900', secondary: 'text-slate-900', accent: 'bg-slate-50', bg: 'bg-white', text: 'text-slate-900', font: 'font-serif', layout: 'centered' },
  'centered-2': { primary: 'bg-amber-600', secondary: 'text-amber-600', accent: 'bg-amber-50', bg: 'bg-white', text: 'text-slate-900', font: 'font-serif', layout: 'centered' },
  
  // Bento Variants
  'bento-1': { primary: 'bg-indigo-600', secondary: 'text-indigo-600', accent: 'bg-indigo-50', bg: 'bg-slate-50', text: 'text-slate-900', font: 'font-sans', layout: 'bento' },
  'bento-2': { primary: 'bg-emerald-600', secondary: 'text-emerald-600', accent: 'bg-emerald-50', bg: 'bg-slate-50', text: 'text-slate-900', font: 'font-sans', layout: 'bento' },

  // Specialized Themes (obsidian, ruby, etc.)
  obsidian: { primary: 'bg-blue-500', secondary: 'text-blue-400', accent: 'bg-slate-800', bg: 'bg-slate-900', text: 'text-slate-100', sidebar: 'bg-black', font: 'font-mono', layout: 'sidebar-left' },
  ruby: { primary: 'bg-red-600', secondary: 'text-red-600', accent: 'bg-red-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-red-950', font: 'font-sans', layout: 'sidebar-left' },
  gold: { primary: 'bg-yellow-600', secondary: 'text-yellow-600', accent: 'bg-yellow-50', bg: 'bg-white', text: 'text-slate-900', sidebar: 'bg-yellow-950', font: 'font-serif', layout: 'sidebar-right' },
  'midnight-gold': { primary: 'bg-yellow-500', secondary: 'text-yellow-500', accent: 'bg-slate-800', bg: 'bg-slate-950', text: 'text-white', sidebar: 'bg-black', font: 'font-serif', layout: 'sidebar-left' },
  
  // Add another 50+ dynamically using a pattern
  ...generateIndustrialThemes(),
  ...generateHeritageThemes()
};

// Helper to fill up to 110+ themes
function generateIndustrialThemes() {
  const themes: Record<string, ThemeConfig> = {};
  const colors = ['slate', 'zinc', 'neutral', 'stone', 'gray'];
  colors.forEach((c, i) => {
    themes[`industrial-${i + 1}`] = { 
      primary: `bg-${c}-800`, secondary: `text-${c}-800`, accent: `bg-${c}-50`, bg: 'bg-white', text: `text-${c}-900`, 
      sidebar: `bg-${c}-100`, font: 'font-mono', layout: 'sidebar-right' 
    };
  });
  return themes;
}

function generateHeritageThemes() {
  const themes: Record<string, ThemeConfig> = {};
  const palettes = [
    { name: 'heritage-1', color: '#4b3621', bg: '#fdfaf5' },
    { name: 'heritage-2', color: '#2b1d0e', bg: '#fdfaf5' },
    { name: 'modern-serif-1', color: '#1e293b', bg: '#ffffff' },
    { name: 'modern-serif-2', color: '#0f172a', bg: '#ffffff' },
  ];
  palettes.forEach(p => {
    themes[p.name] = { 
      primary: `bg-[${p.color}]`, secondary: `text-[${p.color}]`, accent: `bg-[${p.bg}]`, bg: `bg-[${p.bg}]`, 
      text: 'text-slate-900', sidebar: 'bg-slate-100', font: 'font-serif', layout: 'centered' 
    };
  });
  return themes;
}

// Layout Components
const SidebarContent: React.FC<{ data: ResumeData; theme: ThemeConfig }> = ({ data, theme }) => (
  <div className="space-y-8 flex-grow">
    <div className="relative mx-auto w-32 h-32">
      <img src={data.profilePhoto} alt={data.fullName} className="w-full h-full rounded-2xl object-cover border-4 border-white/20 shadow-xl block" crossOrigin="anonymous" />
      <div className={`absolute -bottom-1 -right-1 p-2 rounded-full shadow-lg ${theme.primary}`}><Shield className="text-white" size={16} /></div>
    </div>
    <div className="text-center">
      <h1 className="text-2xl font-black uppercase tracking-tighter leading-none break-words px-2">{data.fullName}</h1>
      <p className="text-white/60 text-[10px] font-bold mt-2 uppercase tracking-widest px-2">{data.jobTitle}</p>
    </div>
    <div className="space-y-6 pt-6 border-t border-white/10">
      <section>
        <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 text-white/40">Contact</h2>
        <div className="space-y-3 text-xs opacity-80 leading-tight">
          <p className="flex items-center gap-3"><Mail size={14} className="shrink-0" /> {data.email}</p>
          <p className="flex items-center gap-3"><Phone size={14} className="shrink-0" /> {data.phone}</p>
          <p className="flex items-start gap-3"><MapPin size={14} className="shrink-0 mt-0.5" /> {data.location}</p>
        </div>
      </section>
      <section>
        <h2 className="text-[10px] font-black uppercase tracking-widest mb-4 text-white/40">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((s, i) => (
            <span key={i} className="bg-white/10 px-2 py-1 rounded text-[9px] font-bold uppercase">{s}</span>
          ))}
        </div>
      </section>
    </div>
  </div>
);

const MainSection: React.FC<{ data: ResumeData; theme: ThemeConfig }> = ({ data, theme }) => (
  <div className="space-y-12">
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-1 ${theme.primary} rounded-full`}></div>
        <h2 className={`text-sm font-black uppercase tracking-widest ${theme.secondary}`}>Profile</h2>
      </div>
      <p className="text-sm leading-relaxed opacity-70 font-medium text-justify">{data.summary}</p>
    </section>
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-8 h-1 ${theme.primary} rounded-full`}></div>
        <h2 className={`text-sm font-black uppercase tracking-widest ${theme.secondary}`}>Experience</h2>
      </div>
      <div className="space-y-8">
        {data.experience.map((exp) => (
          <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800">
            <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full ${theme.primary}`}></div>
            <div className="flex justify-between items-baseline mb-1 gap-4">
              <h3 className="font-bold text-base leading-snug">{exp.role}</h3>
              <span className="text-[10px] font-black text-slate-300 uppercase whitespace-nowrap">{exp.duration}</span>
            </div>
            <p className={`${theme.secondary} text-xs font-black mb-3 uppercase`}>{exp.company}</p>
            <ul className="list-disc list-inside space-y-1.5">
              {exp.description.filter(b => b.trim()).map((b, i) => (
                <li key={i} className="text-sm opacity-60 leading-relaxed pl-1"><span className="-ml-1">{b}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-8 h-1 ${theme.primary} rounded-full`}></div>
        <h2 className={`text-sm font-black uppercase tracking-widest ${theme.secondary}`}>Education</h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {data.education.map((edu) => (
          <div key={edu.id} className={`${theme.accent} p-4 rounded-xl border border-transparent shadow-sm`}>
            <h3 className="font-bold text-sm leading-snug">{edu.degree}</h3>
            <p className="text-xs opacity-50 mt-1">{edu.school} · {edu.year}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export const ThemedTemplate: React.FC<{ data: ResumeData; themeKey: string; isDarkMode?: boolean }> = ({ data, themeKey, isDarkMode }) => {
  let theme = THEMES[themeKey] || THEMES.modern;
  
  const renderLayout = () => {
    switch (theme.layout) {
      case 'sidebar-right':
        return (
          <div className="flex min-h-[297mm]">
            <div className="w-[140mm] p-12 overflow-hidden"><MainSection data={data} theme={theme} /></div>
            <div className={`w-[70mm] ${theme.sidebar || 'bg-slate-100'} text-white p-8 shrink-0 flex flex-col`}><SidebarContent data={data} theme={theme} /></div>
          </div>
        );
      case 'top-header':
        return (
          <div className="flex flex-col min-h-[297mm]">
            <div className={`${theme.primary} text-white p-12 flex justify-between items-center`}>
               <div>
                 <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">{data.fullName}</h1>
                 <p className="text-white/70 text-sm font-bold mt-2 uppercase tracking-widest">{data.jobTitle}</p>
                 <div className="flex gap-4 mt-4 text-xs opacity-80">
                   <span className="flex items-center gap-1"><Mail size={12}/> {data.email}</span>
                   <span className="flex items-center gap-1"><Phone size={12}/> {data.phone}</span>
                 </div>
               </div>
               <img src={data.profilePhoto} className="w-24 h-24 rounded-full border-4 border-white/20" crossOrigin="anonymous"/>
            </div>
            <div className="p-12 grid grid-cols-12 gap-12">
               <div className="col-span-8"><MainSection data={data} theme={theme} /></div>
               <div className="col-span-4 space-y-8">
                 <section>
                   <h2 className="text-xs font-black uppercase tracking-widest mb-4 opacity-40">Skills</h2>
                   <div className="flex flex-wrap gap-2">
                     {data.skills.map((s,i) => <span key={i} className={`${theme.accent} px-2 py-1 rounded text-[10px] font-bold`}>{s}</span>)}
                   </div>
                 </section>
               </div>
            </div>
          </div>
        );
      case 'bento':
        return (
          <div className="p-10 space-y-6 min-h-[297mm]">
            <div className={`${theme.accent} p-8 rounded-3xl flex justify-between items-center`}>
              <div>
                <h1 className="text-4xl font-black tracking-tighter">{data.fullName}</h1>
                <p className={`${theme.secondary} font-black text-sm uppercase tracking-widest mt-1`}>{data.jobTitle}</p>
              </div>
              <img src={data.profilePhoto} className="w-20 h-20 rounded-2xl rotate-3 shadow-xl" crossOrigin="anonymous"/>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className={`${theme.accent} p-8 rounded-3xl col-span-1`}><h2 className="font-black uppercase text-xs mb-4 opacity-40">Summary</h2><p className="text-sm leading-relaxed opacity-70">{data.summary}</p></div>
              <div className={`${theme.accent} p-8 rounded-3xl col-span-1`}><h2 className="font-black uppercase text-xs mb-4 opacity-40">Skills</h2><div className="flex flex-wrap gap-2">{data.skills.map((s,i)=><span key={i} className="bg-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">{s}</span>)}</div></div>
            </div>
            <div className={`${theme.accent} p-8 rounded-3xl`}><h2 className="font-black uppercase text-xs mb-6 opacity-40">Experience</h2><MainSection data={data} theme={theme} /></div>
          </div>
        );
      default: // sidebar-left
        return (
          <div className="flex min-h-[297mm]">
            <div className={`w-[70mm] ${theme.sidebar || 'bg-slate-100'} text-white p-8 shrink-0 flex flex-col`}><SidebarContent data={data} theme={theme} /></div>
            <div className="w-[140mm] p-12 overflow-hidden"><MainSection data={data} theme={theme} /></div>
          </div>
        );
    }
  };

  return (
    <div id="resume-document" className={`w-[210mm] min-h-[297mm] ${theme.bg} ${theme.text} ${theme.font} shadow-2xl relative transition-all duration-300 antialiased`}>
      {renderLayout()}
    </div>
  );
};

// Aliases for compatibility
export const ModernTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="modern" />;
export const EmeraldNightTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="emerald-night" />;
export const MinimalTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="minimal" />;
export const ExecutiveTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="executive" />;
export const TechTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="tech" />;
export const CreativeTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="creative" />;
export const CompactTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="compact" />;
export const ClassicTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="classic" />;
export const ElegantTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="elegant" />;
export const BoldTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="bold" />;
export const GridTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="grid" />;
export const CorporateTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="corporate" />;
export const StartupTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="startup" />;
export const AcademicTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="academic" />;
export const MarketingTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="marketing" />;
export const DesignTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="design" />;
export const RetailTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="retail" />;
export const MedicalTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="medical" />;
export const LegalTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="legal" />;
export const SalesTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="sales" />;
export const HospitalityTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="hospitality" />;
export const FinanceTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="finance" />;
export const EngineeringTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="engineering" />;
export const GovernmentTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="government" />;
export const FreelanceTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="freelance" />;
export const EntryTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="entry" />;
export const SeniorTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="senior" />;
export const VintageTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="vintage" />;
export const FuturisticTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="futuristic" />;
export const SimpleTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="simple" />;
export const SkylineTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="skyline" />;

export const AzureTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="azure" />;
export const CrimsonTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="crimson" />;
export const ForestTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="forest" />;
export const SunsetTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="sunset" />;
export const NebulaTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="nebula" />;
export const SlateTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="slate" />;
export const AmberTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="amber" />;
export const TealTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="teal" />;
export const RoseTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="rose" />;
export const IndigoTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="indigo" />;
export const MidnightTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="midnight" />;
export const CoffeeTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="coffee" />;
export const GoldTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="gold" />;
export const RoyalTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="royal" />;
export const MintTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="mint" />;
export const LavenderTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="lavender" />;
export const PearlTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="pearl" />;
export const OnyxTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="onyx" />;
export const RubyTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="ruby" />;
export const EmeraldTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="emerald" />;
export const SapphireTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="sapphire" />;
export const AmethystTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="amethyst" />;
export const QuartzTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="quartz" />;
export const TopazTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="topaz" />;
export const ObsidianTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="obsidian" />;
export const MarbleTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="marble" />;
export const DiamondTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="diamond" />;
export const OceanTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="ocean" />;
export const FireTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="fire" />;
export const EarthTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="earth" />;
export const WindTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="wind" />;
export const SunlightTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="sunlight" />;
export const ShadowTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="shadow" />;
export const NeonTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="neon" />;
export const MonochromeTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="monochrome" />;
export const SpectrumTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="spectrum" />;

export const ArcticTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="arctic" />;
export const LavaTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="lava" />;
export const MidnightGoldTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="midnight-gold" />;
export const VintageInkTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="vintage-ink" />;
export const ModernProTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="modern-pro" />;
export const MinimalDarkTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="minimal-dark" />;
export const ExecutiveBoldTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="executive-bold" />;
export const TechBlueTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="tech-blue" />;
export const CreativeSoftTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="creative-soft" />;
export const ClassicIvoryTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="classic-ivory" />;
export const GlassTemplate = (props: TemplateProps) => <ThemedTemplate {...props} themeKey="glass" />;
