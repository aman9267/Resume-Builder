
import React from 'react';
import { ResumeData, Experience, Education } from '../types';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, FileText, Sparkles, Image as ImageIcon, Minus } from 'lucide-react';
import { generateSummary } from '../services/service';

interface EditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleAI = async () => {
    setIsGenerating(true);
    try {
      const result = await generateSummary(data.jobTitle, data.skills.join(', '));
      if (result) updateField('summary', result);
    } finally {
      setIsGenerating(false);
    }
  };

  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        } else {
          resolve(base64Str);
        }
      };
      img.onerror = () => resolve(base64Str);
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large! Please choose an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const compressed = await compressImage(reader.result as string);
          updateField('profilePhoto', compressed);
        } catch (err) {
          console.error("Compression failed", err);
          updateField('profilePhoto', reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    const newExp: Experience = { id: Date.now().toString(), company: '', role: '', duration: '', description: [''] };
    updateField('experience', [...data.experience, newExp]);
  };

  const addExperienceBullet = (expIdx: number) => {
    const newExp = [...data.experience];
    newExp[expIdx].description.push('');
    updateField('experience', newExp);
  };

  const updateExperienceBullet = (expIdx: number, bulletIdx: number, value: string) => {
    const newExp = [...data.experience];
    newExp[expIdx].description[bulletIdx] = value;
    updateField('experience', newExp);
  };

  const removeExperienceBullet = (expIdx: number, bulletIdx: number) => {
    const newExp = [...data.experience];
    if (newExp[expIdx].description.length > 1) {
      newExp[expIdx].description.splice(bulletIdx, 1);
      updateField('experience', newExp);
    }
  };

  const addEducation = () => {
    const newEdu: Education = { id: Date.now().toString(), school: '', degree: '', year: '' };
    updateField('education', [...data.education, newEdu]);
  };

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim();
      if (value && !data.skills.includes(value)) {
        updateField('skills', [...data.skills, value]);
        e.currentTarget.value = '';
      }
    }
  };

  return (
    <div className="p-8 space-y-10 pb-20 dark:bg-slate-900 transition-colors duration-300">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <User className="text-blue-600 dark:text-blue-400" size={20} />
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Personal Info</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative group shrink-0">
              <img 
                src={data.profilePhoto || 'https://via.placeholder.com/80'} 
                className="w-20 h-20 rounded-xl object-cover border-2 border-slate-100 dark:border-slate-800 shadow-sm" 
              />
              <label className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-xl cursor-pointer transition-opacity">
                <ImageIcon size={18} />
                <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" />
              </label>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Full Name</label>
              <input 
                type="text" 
                value={data.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:text-white focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Job Title</label>
              <input 
                type="text" 
                value={data.jobTitle}
                onChange={(e) => updateField('jobTitle', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Location</label>
              <input 
                type="text" 
                value={data.location}
                onChange={(e) => updateField('location', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Email</label>
              <input 
                type="email" 
                value={data.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Phone</label>
              <input 
                type="text" 
                value={data.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600 dark:text-blue-400" size={20} />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Professional Summary</h2>
          </div>
          <button 
            onClick={handleAI}
            disabled={isGenerating}
            className="text-xs font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:text-slate-400 dark:disabled:text-slate-600 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1.5 rounded-full transition-colors"
          >
            <Sparkles size={14} className={isGenerating ? 'animate-pulse' : ''} />
            {isGenerating ? 'Thinking...' : 'AI Magic'}
          </button>
        </div>
        <textarea 
          rows={5}
          value={data.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white outline-none resize-none leading-relaxed transition-all"
          placeholder="Write a brief professional summary..."
        />
      </section>

      {/* Experience Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="text-blue-600 dark:text-blue-400" size={20} />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Experience</h2>
          </div>
          <button onClick={addExperience} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
            <Plus size={16} /> Add Experience
          </button>
        </div>
        <div className="space-y-6">
          {data.experience.map((exp, idx) => (
            <div key={exp.id} className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 rounded-2xl relative group transition-all shadow-md">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-[10px] font-black text-blue-600 dark:text-blue-400">
                    {idx + 1}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Experience Entry</span>
                </div>
                <button 
                  onClick={() => updateField('experience', data.experience.filter((_, i) => i !== idx))}
                  className="text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 block">Company Name</label>
                  <input 
                    type="text" 
                    value={exp.company}
                    placeholder="e.g. Google Inc."
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[idx].company = e.target.value;
                      updateField('experience', newExp);
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Job Role</label>
                    <input 
                      type="text" 
                      value={exp.role}
                      placeholder="e.g. Senior Software Engineer"
                      onChange={(e) => {
                        const newExp = [...data.experience];
                        newExp[idx].role = e.target.value;
                        updateField('experience', newExp);
                      }}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">Work Period</label>
                    <input 
                      type="text" 
                      value={exp.duration}
                      placeholder="e.g. Jan 2020 - Present"
                      onChange={(e) => {
                        const newExp = [...data.experience];
                        newExp[idx].duration = e.target.value;
                        updateField('experience', newExp);
                      }}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Description Points</label>
                    <button 
                      onClick={() => addExperienceBullet(idx)}
                      className="text-[10px] font-black uppercase flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors px-2 py-1 rounded"
                    >
                      <Plus size={10} /> Add Bullet Point
                    </button>
                  </div>
                  <div className="space-y-2">
                    {exp.description.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex gap-2 group/bullet">
                        <div className="mt-3 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0"></div>
                        <input 
                          type="text"
                          value={bullet}
                          placeholder="Accomplished X by implementing Y..."
                          onChange={(e) => updateExperienceBullet(idx, bIdx, e.target.value)}
                          className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none dark:text-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                        <button 
                          onClick={() => removeExperienceBullet(idx, bIdx)}
                          className="text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover/bullet:opacity-100 transition-opacity p-2"
                        >
                          <Minus size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Code className="text-blue-600 dark:text-blue-400" size={20} />
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Skills</h2>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl transition-all">
          <div className="flex flex-wrap gap-2 mb-3">
            {data.skills.map((skill, idx) => (
              <span key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2 shadow-sm transition-all">
                {skill}
                <button 
                  onClick={() => updateField('skills', data.skills.filter((_, i) => i !== idx))}
                  className="hover:text-red-500 dark:hover:text-red-400 text-slate-300 dark:text-slate-600"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Type skill and press Enter..."
            onKeyDown={addSkill}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white outline-none transition-all"
          />
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-blue-600 dark:text-blue-400" size={20} />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Education</h2>
          </div>
          <button onClick={addEducation} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Plus size={20} className="text-blue-600 dark:text-blue-400" />
          </button>
        </div>
        <div className="space-y-3">
           {data.education.map((edu, idx) => (
            <div key={edu.id} className="grid grid-cols-12 gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl relative group border border-slate-100 dark:border-slate-800 transition-all">
               <div className="col-span-11 space-y-2">
                 <input 
                  type="text" 
                  value={edu.school}
                  placeholder="School/University"
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[idx].school = e.target.value;
                    updateField('education', newEdu);
                  }}
                  className="w-full font-semibold bg-transparent border-b border-transparent focus:border-blue-500 outline-none text-slate-800 dark:text-white text-sm transition-all"
                />
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={edu.degree}
                    placeholder="Degree"
                    onChange={(e) => {
                      const newEdu = [...data.education];
                      newEdu[idx].degree = e.target.value;
                      updateField('education', newEdu);
                    }}
                    className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs outline-none dark:text-white transition-all"
                  />
                  <input 
                    type="text" 
                    value={edu.year}
                    placeholder="Year"
                    onChange={(e) => {
                      const newEdu = [...data.education];
                      newEdu[idx].year = e.target.value;
                      updateField('education', newEdu);
                    }}
                    className="w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs outline-none dark:text-white transition-all"
                  />
                </div>
               </div>
               <button 
                  onClick={() => updateField('education', data.education.filter((_, i) => i !== idx))}
                  className="col-span-1 flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400"
                >
                  <Trash2 size={14} />
               </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
