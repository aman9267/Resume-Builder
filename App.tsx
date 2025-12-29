
import React, { useState, useEffect } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { TemplateSelector } from './components/TemplateSelector';
import { Layout, LogOut, FileText, Download, ChevronLeft, Sparkles, Layers, ArrowRight, Plus, Edit3, Moon, Sun, Zap, CheckCircle, Award } from 'lucide-react';
import { ResumeData, TemplateId, User } from './types';
import { generatePDF } from './lib/pdf';

const INITIAL_DATA: ResumeData = {
  resumeTitle: 'My Professional Resume',
  fullName: 'Johnathan Doe',
  jobTitle: 'Senior Software Engineer',
  email: 'john.doe@example.com',
  phone: '+1 (555) 000-1111',
  location: 'San Francisco, CA',
  website: 'github.com/jdoe',
  profilePhoto: 'https://picsum.photos/200/200',
  summary: 'Passionate software engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and cloud architecture. Proven track record of leading high-performance teams.',
  skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
  experience: [
    {
      id: '1',
      company: 'Tech Innovators Inc.',
      role: 'Senior Developer',
      duration: '2020 - Present',
      description: [
        'Led the core platform team in migrating a monolithic architecture to microservices.',
        'Improved application performance by 40% through code optimization and caching.',
        'Mentored 5 junior developers and implemented standardized code review processes.'
      ]
    },
    {
      id: '2',
      company: 'Digital Solutions LLC',
      role: 'Full Stack Engineer',
      duration: '2017 - 2020',
      description: [
        'Developed and maintained 10+ client projects using React and Express.',
        'Integrated third-party APIs and optimized database queries.',
        'Collaborated with designers to ensure high-quality UI/UX across all applications.'
      ]
    }
  ],
  education: [
    {
      id: 'e1',
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      year: '2013 - 2017'
    }
  ]
};

// Fixed TEMPLATE_LIST to contain only valid TemplateId values defined in types.ts
const TEMPLATE_LIST: TemplateId[] = [
  'modern', 'minimal', 'executive', 'tech', 'creative', 'classic', 'bold', 'elegant', 'grid', 'compact',
  'corporate', 'startup', 'academic', 'marketing', 'design', 'retail', 'medical', 'legal', 'sales', 'hospitality',
  'finance', 'engineering', 'government', 'freelance', 'entry', 'senior', 'vintage', 'futuristic', 'simple', 'skyline',
  'azure', 'crimson', 'forest', 'sunset', 'nebula', 'slate', 'amber', 'teal', 'rose', 'indigo', 'midnight', 'coffee', 'lavender', 'mint', 'lemon', 'charcoal', 'royal', 'gold', 'platinum', 'titanium',
  'sidebar-right-1', 'sidebar-right-2', 'top-header-1', 'top-header-2', 'centered-1', 'centered-2', 'split-1', 'split-2', 'bento-1', 'bento-2',
  'magazine-1', 'magazine-2', 'editorial-1', 'editorial-2', 'brutalist-1', 'brutalist-2', 'neo-1', 'neo-2', 'glass-1', 'glass-2',
  'ruby', 'emerald', 'sapphire', 'amethyst', 'quartz', 'topaz', 'obsidian', 'marble',
  'diamond', 'ocean', 'fire', 'earth', 'wind', 'sunlight', 'shadow', 'neon', 'monochrome', 'spectrum',
  'arctic', 'lava', 'midnight-gold', 'vintage-ink', 'modern-pro', 'minimal-dark', 'executive-bold', 'tech-blue', 'creative-soft', 'classic-ivory', 'emerald-night'
];

const App: React.FC = () => {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('resume_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.experience) {
          parsed.experience = parsed.experience.map((exp: any) => ({
            ...exp,
            description: Array.isArray(exp.description) ? exp.description : [exp.description].filter(Boolean)
          }));
        }
        return { ...INITIAL_DATA, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    }
    return INITIAL_DATA;
  });
  
  const [template, setTemplate] = useState<TemplateId>('modern');
  const [isDownloading, setIsDownloading] = useState(false);
  const [step, setStep] = useState<'landing' | 'template-selection' | 'editor'>('landing');
  const [showTemplatesDropdown, setShowTemplatesDropdown] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark_mode');
    return saved === 'true';
  });

  useEffect(() => {
    try {
      localStorage.setItem('resume_data', JSON.stringify(data));
    } catch (e) {
      console.warn("LocalStorage storage failed.", e);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem('dark_mode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleDownload = async () => {
    setIsDownloading(true);
    await generatePDF('resume-preview', `${data.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    setIsDownloading(false);
  };

  const startCreating = () => {
    setUser({ id: '1', name: 'User', email: 'user@example.com' });
    setStep('template-selection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const logout = () => {
    setUser(null);
    setStep('landing');
  };

  const selectTemplate = (id: TemplateId) => {
    setTemplate(id);
    setStep('editor');
    setShowTemplatesDropdown(false);
  };

  if (step === 'landing') {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-white dark:bg-slate-950 flex flex-col font-sans selection:bg-blue-100 transition-colors duration-500`}>
        <nav className="h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform group-hover:scale-110">
              <FileText className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white uppercase">ProResume</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={startCreating}
              className="hidden sm:block px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-sm uppercase tracking-widest rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl active:scale-95"
            >
              Build My Resume
            </button>
          </div>
        </nav>

        <main className="flex-1">
          <section className="relative pt-20 pb-32 px-6 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_20%,_rgba(99,102,241,0.15),_transparent_60%)] pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-sm border border-indigo-100/50 dark:border-indigo-800/50">
                <Sparkles size={12} /> Trusted by 100k+ Job Seekers
              </div>
              
              <h1 className="text-6xl md:text-[100px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85] mb-10">
                Your career <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">reimagined.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-16 px-4">
                The world's most powerful resume builder. Professional templates, AI-driven content generation, and instant ATS optimization.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-2xl px-4">
                <button 
                  onClick={startCreating}
                  className="w-full sm:flex-1 py-6 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-black rounded-2xl transition-all shadow-2xl shadow-indigo-300 dark:shadow-indigo-900/40 active:scale-95 flex items-center justify-center gap-4 group"
                >
                  Get Started for Free
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                </button>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest">
                  <CheckCircle size={16} className="text-emerald-500" /> No Credit Card Required
                </div>
              </div>

              <div className="mt-24 relative w-full max-w-5xl group">
                <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000"></div>
                <div className="relative bg-white dark:bg-slate-900 p-2 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                   <div className="w-full h-full bg-slate-100 dark:bg-slate-950 rounded-[1.5rem] flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2000" 
                        alt="App Preview" 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                         <div className="text-left space-y-2">
                            <h3 className="text-white text-3xl font-black">110+ Elite Templates</h3>
                            <p className="text-white/70 font-medium">Engineered for every industry and seniority.</p>
                         </div>
                         <button onClick={startCreating} className="p-4 bg-white rounded-full shadow-xl hover:scale-110 transition-transform">
                            <Plus size={24} className="text-indigo-600" />
                         </button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-32 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-6 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Zap size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">Instant Feedback</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Our real-time engine scores your resume and provides actionable tips to land more interviews.</p>
                  </div>
                  <div className="space-y-6 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">AI Generation</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Use Gemini 3.0 to craft the perfect professional summary and experience descriptions in seconds.</p>
                  </div>
                  <div className="space-y-6 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Award size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">ATS Optimized</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Every template is rigorously tested to ensure it passes through Applicant Tracking Systems flawlessly.</p>
                  </div>
               </div>
            </div>
          </section>
        </main>

        <footer className="bg-white dark:bg-slate-950 py-20 px-6 border-t border-slate-100 dark:border-slate-900">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <FileText className="text-white w-4 h-4" />
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-white uppercase">ProResume</span>
            </div>
            <div className="flex items-center gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
               <a href="#" className="hover:text-indigo-600 transition-colors">Templates</a>
               <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
               <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            </div>
            <p className="text-slate-400 font-bold text-sm">&copy; 2024 PRORESUME. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>
      </div>
    );
  }

  if (step === 'template-selection') {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300`}>
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <FileText className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-white uppercase">ProResume</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={logout} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-bold px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all uppercase tracking-widest text-xs">
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8 md:p-12">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-8">
              <div>
                <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Select a Design</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">Pick from our library of 110+ professional templates.</p>
              </div>
              <div className="bg-indigo-600 text-white px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">
                Step 1 of 2
              </div>
            </div>
            <TemplateSelector current={template} onSelect={selectTemplate} data={data} isDarkMode={isDarkMode} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300`}>
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setStep('template-selection')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            title="Back to Templates"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2 mr-3 group cursor-default">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <FileText className="text-white w-5 h-5" />
            </div>
            <span className="font-black text-lg tracking-tighter text-slate-900 dark:text-white hidden md:block uppercase">ProResume</span>
          </div>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

          <div className="relative">
            <button 
              onClick={() => setShowTemplatesDropdown(!showTemplatesDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 transition-all font-black uppercase text-[10px] tracking-widest border border-transparent"
            >
              <Layout size={16} />
              <span className="hidden sm:inline">Templates</span>
            </button>
            {showTemplatesDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-4 z-50 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <h3 className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-3 px-1 tracking-widest">Available Templates</h3>
                <div className="grid grid-cols-1 gap-2">
                  {TEMPLATE_LIST.map((t) => (
                    <button 
                      key={t}
                      onClick={() => selectTemplate(t)}
                      className={`flex items-center gap-3 p-2 rounded-xl text-left transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50 border-2 ${template === t ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-900/20' : 'border-transparent'}`}
                    >
                      <div className="w-8 h-10 rounded shadow-sm bg-slate-200 dark:bg-slate-700 opacity-50"></div>
                      <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight truncate">{t.replace('-', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 max-sm:hidden max-w-sm px-4 flex justify-center">
          <div className="flex items-center gap-2 w-full max-w-[240px] group bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
            <Edit3 size={14} className="text-slate-400 shrink-0" />
            <input 
              type="text" 
              value={data.resumeTitle}
              onChange={(e) => setData({ ...data, resumeTitle: e.target.value })}
              className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 dark:text-slate-200 w-full placeholder:text-slate-400 truncate"
              placeholder="Resume Name..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 md:px-6 py-2.5 rounded-xl font-black text-xs md:text-sm flex items-center gap-2 transition-all shadow-xl shadow-indigo-100 dark:shadow-none active:scale-95"
          >
            {isDownloading ? <span className="animate-spin text-lg">◌</span> : <Download size={18} />}
            <span className="hidden sm:inline uppercase tracking-widest">Download</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button 
            onClick={logout}
            className="text-slate-400 hover:text-red-600 transition-all p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="w-full lg:w-[480px] xl:w-[540px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-[calc(100vh-164px)] sm:h-[calc(100vh-64px)] overflow-y-auto no-scrollbar">
           <div className="px-6 py-4 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-10">
            <h2 className="font-black text-slate-800 dark:text-white flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
              <Layers className="text-indigo-600" size={14} />
              Editor Workspace
            </h2>
            <div className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">
              Live Editing
            </div>
          </div>
          <Editor data={data} onChange={setData} />
        </div>

        <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-8 flex justify-center overflow-y-auto h-[calc(100vh-164px)] sm:h-[calc(100vh-64px)]">
          <div className="scale-[0.55] sm:scale-[0.65] lg:scale-[0.75] xl:scale-[0.85] origin-top h-fit transition-all duration-300">
            <div id="resume-preview" className="shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden bg-white border border-slate-200 dark:border-slate-800">
              <Preview data={data} template={template} isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
