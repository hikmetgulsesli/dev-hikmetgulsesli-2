import { describe, it, expect } from 'vitest';
import type {
  BaseEntity,
  SEO,
  Project,
  TechItem,
  BlogPost,
  Author,
  SocialLinks,
  Experience,
  Education,
  Skill,
  ContactFormData,
  ContactSubmission,
  Pagination,
  Filter,
  SortOption,
  ApiResponse,
  ApiError,
  PaginatedResponse,
} from '../types';

// Test types exist and have correct structure
describe('TypeScript Interfaces', () => {
  describe('BaseEntity', () => {
    it('should have correct fields', () => {
      const entity: BaseEntity = {
        id: '123',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      };
      expect(entity.id).toBe('123');
      expect(entity.createdAt).toBe('2024-01-01T00:00:00Z');
      expect(entity.updatedAt).toBe('2024-01-02T00:00:00Z');
    });
  });

  describe('SEO', () => {
    it('should have correct fields', () => {
      const seo: SEO = {
        title: 'Test Page',
        description: 'Test description',
        keywords: ['test', 'page'],
        ogImage: '/og-image.png',
        noIndex: false,
      };
      expect(seo.title).toBe('Test Page');
      expect(seo.keywords).toHaveLength(2);
      expect(seo.noIndex).toBe(false);
    });
  });

  describe('TechItem', () => {
    it('should have correct fields', () => {
      const tech: TechItem = {
        id: 'tech-1',
        name: 'React',
        icon: 'react-icon',
        category: 'frontend',
        url: 'https://react.dev',
      };
      expect(tech.name).toBe('React');
      expect(tech.category).toBe('frontend');
    });

    it('should accept all category values', () => {
      const categories: TechItem['category'][] = ['frontend', 'backend', 'database', 'devops', 'tool', 'mobile'];
      categories.forEach((cat) => {
        const tech: TechItem = { id: '1', name: 'Test', category: cat };
        expect(tech.category).toBe(cat);
      });
    });
  });

  describe('Project', () => {
    it('should have correct fields', () => {
      const project: Project = {
        id: 'proj-1',
        slug: 'my-project',
        title: 'My Project',
        description: 'Full description',
        shortDescription: 'Short desc',
        thumbnail: '/thumb.png',
        images: ['/img1.png', '/img2.png'],
        category: 'web',
        techStack: [],
        featured: true,
        publishedAt: '2024-01-01',
        status: 'published',
        content: '# Project Content',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      };
      expect(project.slug).toBe('my-project');
      expect(project.category).toBe('web');
      expect(project.status).toBe('published');
    });

    it('should accept all category values', () => {
      const categories: Project['category'][] = ['web', 'mobile', 'open-source', 'freelance'];
      categories.forEach((cat) => {
        const project: Project = {
          id: '1', slug: 'test', title: 'Test', description: 'Desc',
          shortDescription: 'Short', thumbnail: '', images: [],
          category: cat, techStack: [], featured: false,
          publishedAt: '2024-01-01', status: 'draft',
          content: '', createdAt: '2024-01-01', updatedAt: '2024-01-01',
        };
        expect(project.category).toBe(cat);
      });
    });
  });

  describe('Author', () => {
    it('should have correct fields', () => {
      const author: Author = {
        id: 'auth-1',
        name: 'Hikmet Güleşli',
        avatar: '/avatar.png',
        title: 'Full-Stack Developer',
        bio: 'Experienced developer',
        location: 'İstanbul, Türkiye',
        social: {
          github: 'https://github.com/hikmetgulsesli',
          linkedin: 'https://linkedin.com/in/hikmetgulsesli',
        },
        skills: ['React', 'Node.js'],
      };
      expect(author.name).toBe('Hikmet Güleşli');
      expect(author.social.github).toBe('https://github.com/hikmetgulsesli');
    });
  });

  describe('SocialLinks', () => {
    it('should have correct fields', () => {
      const social: SocialLinks = {
        github: 'https://github.com/test',
        linkedin: 'https://linkedin.com/in/test',
        twitter: 'https://twitter.com/test',
        email: 'test@example.com',
        website: 'https://test.com',
        instagram: 'https://instagram.com/test',
        youtube: 'https://youtube.com/@test',
      };
      expect(social.github).toBe('https://github.com/test');
      expect(social.email).toBe('test@example.com');
    });

    it('should allow partial social links', () => {
      const social: SocialLinks = {
        github: 'https://github.com/test',
      };
      expect(social.github).toBe('https://github.com/test');
      expect(social.linkedin).toBeUndefined();
    });
  });

  describe('BlogPost', () => {
    it('should have correct fields', () => {
      const blogPost: BlogPost = {
        id: 'blog-1',
        slug: 'my-first-post',
        title: 'My First Post',
        excerpt: 'This is an excerpt',
        featuredImage: '/featured.png',
        category: 'teknik',
        tags: ['react', 'typescript'],
        readTime: 5,
        publishedAt: '2024-01-01',
        status: 'published',
        content: '# Blog Content',
        author: {
          id: 'auth-1',
          name: 'Hikmet Güleşli',
          avatar: '/avatar.png',
          title: 'Developer',
          bio: 'Bio',
          social: { github: 'https://github.com/test' },
        },
        featured: true,
        pinned: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      };
      expect(blogPost.slug).toBe('my-first-post');
      expect(blogPost.category).toBe('teknik');
      expect(blogPost.author.name).toBe('Hikmet Güleşli');
    });

    it('should accept all category values', () => {
      const categories: BlogPost['category'][] = ['teknik', 'career', 'kisisel', 'tutorial'];
      categories.forEach((cat) => {
        const post: BlogPost = {
          id: '1', slug: 'test', title: 'Test', excerpt: 'Excerpt',
          category: cat, tags: [], readTime: 5, publishedAt: '2024-01-01',
          status: 'published', content: '', author: {
            id: '1', name: 'Test', avatar: '', title: 'T', bio: 'B', social: {},
          },
          featured: false, pinned: false, createdAt: '2024-01-01', updatedAt: '2024-01-01',
        };
        expect(post.category).toBe(cat);
      });
    });
  });

  describe('Experience', () => {
    it('should have correct fields', () => {
      const exp: Experience = {
        id: 'exp-1',
        title: 'Senior Developer',
        company: 'Tech Corp',
        companyUrl: 'https://techcorp.com',
        location: 'İstanbul',
        startDate: '2022-01',
        endDate: '2023-12',
        current: false,
        description: 'Worked on...',
        logo: '/logo.png',
        type: 'full-time',
        achievements: ['Built system X', 'Led team Y'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      };
      expect(exp.company).toBe('Tech Corp');
      expect(exp.type).toBe('full-time');
    });

    it('should allow current position without endDate', () => {
      const exp: Experience = {
        id: 'exp-1',
        title: 'Developer',
        company: 'Current Corp',
        startDate: '2024-01',
        current: true,
        description: 'Working here',
        type: 'full-time',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };
      expect(exp.current).toBe(true);
      expect(exp.endDate).toBeUndefined();
    });
  });

  describe('Education', () => {
    it('should have correct fields', () => {
      const edu: Education = {
        id: 'edu-1',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        institution: 'Boğaziçi University',
        institutionUrl: 'https://bogazici.edu.tr',
        startDate: '2018-09',
        endDate: '2022-06',
        description: 'Focused on...',
        logo: '/university.png',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      };
      expect(edu.degree).toBe('Bachelor of Science');
      expect(edu.institution).toBe('Boğaziçi University');
    });
  });

  describe('Skill', () => {
    it('should have correct fields', () => {
      const skill: Skill = {
        id: 'skill-1',
        name: 'React',
        icon: 'react',
        proficiency: 90,
        category: 'frontend',
        years: 5,
        projects: 15,
      };
      expect(skill.name).toBe('React');
      expect(skill.proficiency).toBe(90);
    });

    it('should accept all category values', () => {
      const categories: Skill['category'][] = ['frontend', 'backend', 'database', 'devops', 'mobile', 'design', 'soft-skills'];
      categories.forEach((cat) => {
        const skill: Skill = { id: '1', name: 'Test', category: cat };
        expect(skill.category).toBe(cat);
      });
    });
  });

  describe('ContactFormData', () => {
    it('should have correct fields', () => {
      const form: ContactFormData = {
        firstName: 'Elif',
        lastName: 'Yılmaz',
        email: 'elif@reelforge.com',
        subject: 'Proje işbirliği',
        message: 'Merhaba, projeniz hakkında konuşmak istiyorum.',
      };
      expect(form.firstName).toBe('Elif');
      expect(form.email).toBe('elif@reelforge.com');
    });
  });

  describe('ContactSubmission', () => {
    it('should extend ContactFormData with submission fields', () => {
      const submission: ContactSubmission = {
        id: 'sub-1',
        firstName: 'Ahmet',
        lastName: 'Kaya',
        email: 'ahmet@techstudio.io',
        subject: 'Freelance teklif',
        message: 'Merhaba, web sitesi projesi için teklif almak istiyorum.',
        submittedAt: '2024-01-15T10:30:00Z',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        status: 'new',
      };
      expect(submission.id).toBe('sub-1');
      expect(submission.status).toBe('new');
    });

    it('should accept all status values', () => {
      const statuses: ContactSubmission['status'][] = ['new', 'read', 'replied', 'archived'];
      statuses.forEach((status) => {
        const sub: ContactSubmission = {
          id: '1', firstName: 'T', lastName: 'T', email: 't@t.com',
          subject: 'Test', message: 'Test message here 20 chars+',
          submittedAt: '2024-01-01', status,
        };
        expect(sub.status).toBe(status);
      });
    });
  });

  describe('Pagination', () => {
    it('should have correct fields', () => {
      const pagination: Pagination = {
        page: 2,
        limit: 10,
        total: 45,
        totalPages: 5,
        hasNext: true,
        hasPrev: true,
      };
      expect(pagination.page).toBe(2);
      expect(pagination.totalPages).toBe(5);
      expect(pagination.hasNext).toBe(true);
    });
  });

  describe('Filter', () => {
    it('should allow partial filter fields', () => {
      const filter1: Filter = { category: 'web' };
      const filter2: Filter = { search: 'react' };
      const filter3: Filter = { tags: ['react', 'typescript'], dateFrom: '2024-01-01' };

      expect(filter1.category).toBe('web');
      expect(filter2.search).toBe('react');
      expect(filter3.tags).toHaveLength(2);
    });
  });

  describe('SortOption', () => {
    it('should have correct fields', () => {
      const sort: SortOption = {
        field: 'publishedAt',
        direction: 'desc',
      };
      expect(sort.field).toBe('publishedAt');
      expect(sort.direction).toBe('desc');
    });
  });

  describe('ApiResponse', () => {
    it('should have correct success structure', () => {
      const response: ApiResponse<Project> = {
        success: true,
        data: {
          id: '1', slug: 'test', title: 'Test', description: 'Desc',
          shortDescription: 'Short', thumbnail: '', images: [],
          category: 'web', techStack: [], featured: false,
          publishedAt: '2024-01-01', status: 'published', content: '',
          createdAt: '2024-01-01', updatedAt: '2024-01-01',
        },
      };
      expect(response.success).toBe(true);
      expect(response.data?.title).toBe('Test');
    });

    it('should have correct error structure', () => {
      const response: ApiResponse<null> = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Geçersiz veri',
          details: { firstName: 'Ad zorunludur' },
        },
      };
      expect(response.success).toBe(false);
      expect(response.error?.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('ApiError', () => {
    it('should have correct fields', () => {
      const error: ApiError = {
        code: 'NOT_FOUND',
        message: 'Kaynak bulunamadı',
        details: { id: 'Geçersiz ID' },
      };
      expect(error.code).toBe('NOT_FOUND');
      expect(error.details?.id).toBe('Geçersiz ID');
    });
  });

  describe('PaginatedResponse', () => {
    it('should have correct structure', () => {
      const response: PaginatedResponse<BlogPost> = {
        data: [
          {
            id: '1', slug: 'post-1', title: 'Post 1', excerpt: 'Excerpt',
            category: 'teknik', tags: [], readTime: 5, publishedAt: '2024-01-01',
            status: 'published', content: '', author: {
              id: '1', name: 'Test', avatar: '', title: 'T', bio: 'B', social: {},
            },
            featured: false, pinned: false, createdAt: '2024-01-01', updatedAt: '2024-01-01',
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      };
      expect(response.data).toHaveLength(1);
      expect(response.pagination.total).toBe(1);
    });
  });
});
