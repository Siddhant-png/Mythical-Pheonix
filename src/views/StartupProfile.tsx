import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Linkedin,
  MapPin,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';


interface StartupProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'Completed' | 'In Progress' | 'Prototype';
  liveUrl?: string;
  repositoryUrl?: string;
}

interface StartupProfileData {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  coverImage: string;
  location: string;
  sector: string;
  stage: string;
  foundedYear: number;
  dpiitVerified: boolean;
  about: string;
  mission: string;
  founders: string[];
  technologies: string[];
  website?: string;
  linkedin?: string;
  projects: StartupProject[];
  achievements: string[];
}

const startupProfiles: StartupProfileData[] = [
  {
    id: 'startup-1',
    name: 'Drishti Edge Technologies Pvt Ltd',
    tagline: 'Building intelligent solutions for public infrastructure',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300',
    coverImage:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400',
    location: 'Pune, Maharashtra',
    sector: 'Artificial Intelligence',
    stage: 'Early Stage',
    foundedYear: 2024,
    dpiitVerified: false,
    about:
      'Drishti Edge Technologies Pvt Ltd develops AI-powered solutions for government departments, public infrastructure and enterprise operations.',
    mission:
      'To make public services faster, more transparent and technology-driven.',
    founders: ['Aarav Deshmukh', 'Riya Sharma'],
    technologies: [
      'React',
      'TypeScript',
      'Python',
      'Machine Learning',
      'PostgreSQL'
    ],
    website: 'https://example.com',
    linkedin: 'https://www.linkedin.com',
    projects: [
      {
        id: 'project-1',
        title: 'AI Public Procurement Analyzer',
        description:
          'An intelligent platform that analyzes public procurement requirements and recommends suitable startup solutions.',
        technologies: ['React', 'Python', 'Machine Learning'],
        status: 'Completed',
        liveUrl: 'https://example.com'
      },
      {
        id: 'project-2',
        title: 'Civic Problem Intelligence',
        description:
          'A system for identifying, categorizing and prioritizing civic problems using AI.',
        technologies: ['TypeScript', 'NLP', 'Data Analytics'],
        status: 'In Progress'
      }
    ],
       achievements: [
      'Selected for a public innovation pilot',
      'Built a working AI recommendation prototype',
      'Participated in a civic technology innovation program'
    ]
  },

  {
    id: 'startup-2',
    name: 'AquaPulse Sensing Technologies',
    tagline: 'Smart sensing solutions for water management',
    logo: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=300',
    coverImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400',
    location: 'Bengaluru, Karnataka',
    sector: 'CleanTech',
    stage: 'Early Stage',
    foundedYear: 2023,
    dpiitVerified: false,
    about:
      'AquaPulse develops intelligent sensing solutions for water monitoring and resource management.',
    mission:
      'To make water management smarter, more efficient and sustainable.',
    founders: ['Founder Name 1', 'Founder Name 2'],
    technologies: ['IoT', 'Python', 'Machine Learning', 'Cloud'],
    website: 'https://example.com',
    linkedin: 'https://www.linkedin.com',
    projects: [
      {
        id: 'project-3',
        title: 'Smart Water Monitoring',
        description:
          'An intelligent platform for monitoring water quality and usage.',
        technologies: ['IoT', 'Python', 'Machine Learning'],
        status: 'In Progress'
      }
    ],
    achievements: [
      'Developed a smart sensing prototype',
      'Participated in a sustainability innovation program'
    ]
  },

  {
    id: 'startup-3',
    name: 'CivicGrid Analytics',
    tagline: 'Using data and AI to improve civic services',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300',
    coverImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400',
    location: 'New Delhi, India',
    sector: 'Artificial Intelligence',
    stage: 'Early Stage',
    foundedYear: 2024,
    dpiitVerified: false,
    about:
      'CivicGrid uses artificial intelligence and data analytics to improve civic services and urban planning.',
    mission:
      'To help cities make better decisions using reliable data and artificial intelligence.',
    founders: ['Founder Name 1', 'Founder Name 2'],
    technologies: ['React', 'TypeScript', 'Python', 'Machine Learning'],
    website: 'https://example.com',
    linkedin: 'https://www.linkedin.com',
    projects: [
      {
        id: 'project-4',
        title: 'Civic Problem Intelligence',
        description:
          'A platform for analyzing civic problems and public-service data.',
        technologies: ['TypeScript', 'NLP', 'Data Analytics'],
        status: 'In Progress'
      }
    ],
    achievements: [
      'Built a civic data analytics prototype',
      'Worked on public-service intelligence solutions'
    ]
  },

  {
    id: 'startup-4',
    name: 'GreenRoute Mobility',
    tagline: 'Building smarter and more sustainable transportation',
    logo: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300',
    coverImage:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1400',
    location: 'Hyderabad, Telangana',
    sector: 'Mobility',
    stage: 'Early Stage',
    foundedYear: 2023,
    dpiitVerified: false,
    about:
      'GreenRoute develops technology for sustainable transportation and route optimization.',
    mission:
      'To make transportation cleaner, smarter and more efficient.',
    founders: ['Founder Name 1', 'Founder Name 2'],
    technologies: ['React', 'TypeScript', 'Python', 'Artificial Intelligence'],
    website: 'https://example.com',
    linkedin: 'https://www.linkedin.com',
    projects: [
      {
        id: 'project-5',
        title: 'Smart Route Optimization',
        description:
          'An AI-powered system for optimizing transportation routes.',
        technologies: ['Python', 'Artificial Intelligence', 'Data Analytics'],
        status: 'Prototype'
      }
    ],
    achievements: [
      'Created a route optimization prototype',
      'Explored sustainable mobility solutions'
    ]
  }
];

interface StartupProfileProps {
  startupId: string;
  onBack: () => void;
}

export function StartupProfile({
  startupId,
  onBack
}: StartupProfileProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [startupId]);

  const startup = startupProfiles.find(
    profile => profile.id === startupId
  );

  if (!startup) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Startup not found
        </h2>

        <button
          onClick={onBack}
          className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Startup Discovery
      </button>

      {/* Profile Header */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="h-52 overflow-hidden bg-slate-200">
          <img
            src={startup.coverImage}
            alt={`${startup.name} cover`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="px-6 pb-6">
          <div className="-mt-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <img
                src={startup.logo}
                alt={startup.name}
                className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg"
              />

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="inline-block rounded-xl bg-white/95 px-4 py-2 text-3xl font-black text-slate-900 shadow-lg backdrop-blur-sm">
  {startup.name}
</h1>

                  {startup.dpiitVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                      <ShieldCheck className="h-4 w-4" />
                      DPIIT Verified
                    </span>
                  )}
                </div>

                <p className="mt-1 text-slate-600">
                  {startup.tagline}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {startup.location}
                  </span>

                  <span>{startup.sector}</span>
                  <span>Founded {startup.foundedYear}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {startup.website && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
                >
                  Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              {startup.linkedin && (
                <a
                  href={startup.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About and Information */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-900">
            About the Startup
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {startup.about}
          </p>

          <h3 className="mt-6 font-bold text-slate-900">
            Mission
          </h3>

          <p className="mt-2 leading-7 text-slate-600">
            {startup.mission}
          </p>

          <h3 className="mt-6 font-bold text-slate-900">
            Founders
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {startup.founders.map(founder => (
              <span
                key={founder}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700"
              >
                <Users className="h-4 w-4" />
                {founder}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-900">
            Startup Information
          </h2>

          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="text-slate-500">Sector</p>
              <p className="font-bold text-slate-900">
                {startup.sector}
              </p>
            </div>

            <div>
              <p className="text-slate-500">Stage</p>
              <p className="font-bold text-slate-900">
                {startup.stage}
              </p>
            </div>

            <div>
              <p className="text-slate-500">Technology Stack</p>

              <div className="mt-2 flex flex-wrap gap-2">
                {startup.technologies.map(technology => (
                  <span
                    key={technology}
                    className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Projects */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-slate-900">
            Previous Work & Projects
          </h2>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {startup.projects.length} Projects
          </span>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {startup.projects.map(project => (
            <article
              key={project.id}
              className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900">
                  {project.title}
                </h3>

                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                  {project.status}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map(technology => (
                  <span
                    key={technology}
                    className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
                  >
                    Live Demo
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}

                {project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700"
                  >
                    Source Code
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">
          Achievements
        </h2>

        <div className="mt-4 space-y-3">
          {startup.achievements.map(achievement => (
            <div
              key={achievement}
              className="flex items-center gap-3 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800"
            >
              <Star className="h-5 w-5 shrink-0" />
              {achievement}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StartupProfile;