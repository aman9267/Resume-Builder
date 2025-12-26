
export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface ResumeData {
  resumeTitle: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  profilePhoto: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

export type TemplateId = 
  // Core Styles
  | 'modern' | 'minimal' | 'executive' | 'tech' | 'creative' | 'compact' | 'classic' | 'elegant' | 'bold' | 'grid'
  | 'corporate' | 'startup' | 'academic' | 'marketing' | 'design' | 'retail' | 'medical' | 'legal' | 'sales' | 'hospitality'
  | 'finance' | 'engineering' | 'government' | 'freelance' | 'entry' | 'senior' | 'vintage' | 'futuristic' | 'simple' | 'skyline'
  // Color Themes
  | 'azure' | 'crimson' | 'forest' | 'sunset' | 'nebula' | 'slate' | 'amber' | 'teal' | 'rose' | 'indigo' | 'midnight' | 'coffee' | 'lavender' | 'mint' | 'lemon' | 'charcoal' | 'royal' | 'gold' | 'platinum' | 'titanium'
  | 'emerald' | 'ruby' | 'sapphire' | 'amethyst' | 'quartz' | 'topaz' | 'obsidian' | 'marble' | 'diamond' | 'ocean' | 'fire' | 'earth' | 'wind' | 'sunlight' | 'shadow' | 'neon' | 'monochrome' | 'spectrum'
  | 'arctic' | 'lava' | 'midnight-gold' | 'vintage-ink' | 'modern-pro' | 'minimal-dark' | 'executive-bold' | 'tech-blue' | 'creative-soft' | 'classic-ivory' | 'emerald-night'
  // Layout Variations
  | 'sidebar-right-1' | 'sidebar-right-2' | 'top-header-1' | 'top-header-2' | 'centered-1' | 'centered-2' | 'split-1' | 'split-2' | 'bento-1' | 'bento-2'
  | 'magazine-1' | 'magazine-2' | 'editorial-1' | 'editorial-2' | 'brutalist-1' | 'brutalist-2' | 'neo-1' | 'neo-2' | 'glass-1' | 'glass-2'
  | 'professional-1' | 'professional-2' | 'clean-1' | 'clean-2' | 'smart-1' | 'smart-2' | 'elite-1' | 'elite-2' | 'global-1' | 'global-2'
  | 'impact-1' | 'impact-2' | 'alpha-1' | 'alpha-2' | 'omega-1' | 'omega-2' | 'zen-1' | 'zen-2' | 'bold-pro-1' | 'bold-pro-2'
  | 'soft-glow-1' | 'soft-glow-2' | 'industrial-1' | 'industrial-2' | 'heritage-1' | 'heritage-2' | 'modern-serif-1' | 'modern-serif-2';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
