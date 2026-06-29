import { useEffect, useMemo, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDistance } from 'date-fns';
import {
  CustomError,
  GENERIC_ERROR,
  INVALID_CONFIG_ERROR,
  INVALID_GITHUB_USERNAME_ERROR,
  setTooManyRequestError,
} from '../constants/errors';
import '../assets/index.css';
import { getInitialTheme, getSanitizedConfig, setupHotjar } from '../utils';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import ErrorPage from './error-page';
import { DEFAULT_THEMES } from '../constants/default-themes';
import ThemeChanger from './theme-changer';
import { BG_COLOR } from '../constants';
import AvatarCard from './avatar-card';
import { Profile } from '../interfaces/profile';
import DetailsCard from './details-card';
import SkillCard from './skill-card';
import ExperienceCard from './experience-card';
import EducationCard from './education-card';
import CertificationCard from './certification-card';
import { GithubProject } from '../interfaces/github-project';
import GithubProjectCard from './github-project-card';
import ExternalProjectCard from './external-project-card';
import BlogCard from './blog-card';
import Footer from './footer';
import PublicationCard from './publication-card';

const GitProfile = ({ config }: { config: Config }) => {
  const sanitizedConfig = useMemo(
    () => getSanitizedConfig(config),
    [config],
  ) as SanitizedConfig | Record<string, never>;
  const [theme, setTheme] = useState<string>(DEFAULT_THEMES[0]);
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);
  const activeRequestRef = useRef<AbortController | null>(null);

  const handleError = (err: AxiosError | Error): void => {
    console.error('Error:', err);

    if (err instanceof AxiosError) {
      const status = err.response?.status;

      if (status === 404) {
        setError(INVALID_GITHUB_USERNAME_ERROR);
        return;
      }

      if (status === 403) {
        const resetTimestamp = err.response?.headers?.['x-ratelimit-reset'];

        if (resetTimestamp) {
          try {
            const reset = formatDistance(
              new Date(resetTimestamp * 1000),
              new Date(),
              { addSuffix: true },
            );
            setError(setTooManyRequestError(reset));
          } catch {
            setError(GENERIC_ERROR);
          }
        } else {
          setError(GENERIC_ERROR);
        }
        return;
      }
    }

    setError(GENERIC_ERROR);
  };

  const getGithubProjects = async (
    publicRepoCount: number,
    signal?: AbortSignal,
  ): Promise<GithubProject[]> => {
    if (sanitizedConfig.projects.github.mode === 'automatic') {
      if (publicRepoCount === 0) {
        return [];
      }

      const excludeRepo =
        sanitizedConfig.projects.github.automatic.exclude.projects
          .map((project) => `+-repo:${project}`)
          .join('');

      const query = `user:${sanitizedConfig.github.username}+fork:${!sanitizedConfig.projects.github.automatic.exclude.forks}${excludeRepo}`;
      const url = `https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.projects.github.automatic.sortBy}&per_page=${sanitizedConfig.projects.github.automatic.limit}&type=Repositories`;

      const repoResponse = await axios.get(url, {
        headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        signal,
      });

      return repoResponse.data.items;
    } else {
      if (sanitizedConfig.projects.github.manual.projects.length === 0) {
        return [];
      }
      const repos = sanitizedConfig.projects.github.manual.projects
        .map((project) => `+repo:${project}`)
        .join('');

      const url = `https://api.github.com/search/repositories?q=${repos}+fork:true&type=Repositories`;

      const repoResponse = await axios.get(url, {
        headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        signal,
      });

      return repoResponse.data.items;
    }
  };

  useEffect(() => {
    if (Object.keys(sanitizedConfig).length === 0) {
      setError(INVALID_CONFIG_ERROR);
      return;
    }

    setError(null);
    setTheme(getInitialTheme(sanitizedConfig.themeConfig));
    setupHotjar(sanitizedConfig.hotjar);

    const controller = new AbortController();
    activeRequestRef.current = controller;

    const loadData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.github.com/users/${sanitizedConfig.github.username}`,
          { signal: controller.signal },
        );
        const data = response.data;

        setProfile({
          avatar: data.avatar_url,
          name: data.name || ' ',
          bio: data.bio || '',
          location: data.location || '',
          company: data.company || '',
        });

        if (!sanitizedConfig.projects.github.display) {
          return;
        }

        setGithubProjects(
          await getGithubProjects(data.public_repos, controller.signal),
        );
      } catch (err) {
        if (axios.isCancel(err)) return;
        handleError(err as AxiosError | Error);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sanitizedConfig]);

  useEffect(() => {
    theme && document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="fade-in min-h-screen">
      {error ? (
        <ErrorPage
          status={error.status}
          title={error.title}
          subTitle={error.subTitle}
        />
      ) : (
        <>
          <div className={`p-4 lg:p-10 min-h-full ${BG_COLOR}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box">
              <div className="col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  {!sanitizedConfig.themeConfig.disableSwitch && (
                    <ThemeChanger
                      theme={theme}
                      setTheme={setTheme}
                      loading={loading}
                      themeConfig={sanitizedConfig.themeConfig}
                    />
                  )}
                  <AvatarCard
                    profile={profile}
                    loading={loading}
                    avatarRing={sanitizedConfig.themeConfig.displayAvatarRing}
                    resumeFileUrl={sanitizedConfig.resume.fileUrl}
                  />
                  <DetailsCard
                    profile={profile}
                    loading={loading}
                    github={sanitizedConfig.github}
                    social={sanitizedConfig.social}
                  />
                  {sanitizedConfig.skills.length !== 0 && (
                    <SkillCard
                      loading={loading}
                      skills={sanitizedConfig.skills}
                    />
                  )}
                  {sanitizedConfig.experiences.length !== 0 && (
                    <ExperienceCard
                      loading={loading}
                      experiences={sanitizedConfig.experiences}
                    />
                  )}
                  {sanitizedConfig.certifications.length !== 0 && (
                    <CertificationCard
                      loading={loading}
                      certifications={sanitizedConfig.certifications}
                    />
                  )}
                  {sanitizedConfig.educations.length !== 0 && (
                    <EducationCard
                      loading={loading}
                      educations={sanitizedConfig.educations}
                    />
                  )}
                </div>
              </div>
              <div className="lg:col-span-2 col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  {sanitizedConfig.projects.github.display && (
                    <GithubProjectCard
                      header={sanitizedConfig.projects.github.header}
                      limit={sanitizedConfig.projects.github.automatic.limit}
                      githubProjects={githubProjects}
                      loading={loading}
                    />
                  )}
                  {sanitizedConfig.publications.length !== 0 && (
                    <PublicationCard
                      loading={loading}
                      publications={sanitizedConfig.publications}
                    />
                  )}
                  {sanitizedConfig.projects.external.projects.length !== 0 && (
                    <ExternalProjectCard
                      loading={loading}
                      header={sanitizedConfig.projects.external.header}
                      externalProjects={
                        sanitizedConfig.projects.external.projects
                      }
                    />
                  )}
                  {sanitizedConfig.blog.display && (
                    <BlogCard loading={loading} blog={sanitizedConfig.blog} />
                  )}
                </div>
              </div>
            </div>
          </div>
          {sanitizedConfig.footer && (
            <footer
              className={`p-4 footer ${BG_COLOR} text-base-content footer-center`}
            >
              <div className="card card-sm bg-base-100 shadow-sm">
                <Footer content={sanitizedConfig.footer} loading={loading} />
              </div>
            </footer>
          )}
        </>
      )}
    </div>
  );
};

export default GitProfile;
