import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../modules/auth/entities/user.entity';
import { Profile } from '../modules/profile/entities/profile.entity';

@Injectable()
export class DatabaseSeeder {
  private readonly logger = new Logger(DatabaseSeeder.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async seedInnocentProfile() {
    this.logger.log('Starting to seed Innocent NTAKIRUTIMANA profile...');

    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: 'innocentntakir@gmail.com' },
      });

      if (existingUser) {
        this.logger.log('Profile already exists. Updating...');

        // Update existing profile
        const profile = await this.profileRepository.findOne({
          where: { user: { id: existingUser.id } },
        });

        if (profile) {
          Object.assign(profile, this.getProfileData());
          await this.profileRepository.save(profile);
          this.logger.log('✓ Profile updated successfully!');
          return profile;
        }
      }

      // Create new user
      const hashedPassword = await bcrypt.hash('Innocent@2026', 10);

      const user = this.userRepository.create({
        email: 'innocentntakir@gmail.com',
        username: 'innocent_ntakirutimana',
        password: hashedPassword,
        isActive: true,
      });

      await this.userRepository.save(user);
      this.logger.log('✓ User created');

      // Create profile with full details
      const profile = this.profileRepository.create({
        ...this.getProfileData(),
        user: user,
      });

      await this.profileRepository.save(profile);
      this.logger.log('✓ Profile created successfully!');
      this.logger.log('═══════════════════════════════════════');
      this.logger.log('Email: innocentntakir@gmail.com');
      this.logger.log('Password: Innocent@2026');
      this.logger.log('═══════════════════════════════════════');

      return profile;
    } catch (error) {
      this.logger.error(`Failed to seed profile: ${error.message}`);
      throw error;
    }
  }

  private getProfileData() {
    return {
      firstName: 'Innocent',
      lastName: 'NTAKIRUTIMANA',
      email: 'innocentntakir@gmail.com',
      phone: '+250 788 000 000', // Update with actual phone
      avatar: undefined, // Can be updated later
      title: 'Full Stack Developer',
      yearsOfExperience: 6,

      bio: `Passionate Full Stack Developer with 6 years of experience building scalable web applications. 
Graduated from the University of Rwanda in 2021 with a degree in Computer Engineering. 
Specialized in modern backend technologies (NestJS, TypeScript, Laravel) and frontend frameworks (React, Vue). 
Committed to writing clean, maintainable code and delivering exceptional user experiences.`,

      education: [
        {
          degree: 'Bachelor of Science',
          institution: 'University of Rwanda',
          field: 'Computer Engineering',
          graduationYear: 2021,
          location: 'Kigali, Rwanda',
        },
      ],

      experience: [
        {
          title: 'Full Stack Developer',
          company: 'Make It Solutions',
          location: 'Rwanda',
          startDate: '2020',
          current: true,
          description:
            'Developing enterprise-level applications using modern tech stack. Leading backend architecture with NestJS and TypeScript, building RESTful APIs, implementing real-time features with WebSockets, and creating responsive frontends with React.',
          technologies: [
            'NestJS',
            'TypeScript',
            'TypeORM',
            'PostgreSQL',
            'MongoDB',
            'React',
            'Laravel',
            'Node.js',
          ],
        },
        {
          title: 'Software Developer',
          company: 'Various Projects',
          location: 'Rwanda',
          startDate: '2018',
          endDate: '2020',
          description:
            'Worked on multiple web development projects, gained experience in both frontend and backend technologies.',
          technologies: [
            'PHP',
            'Laravel',
            'JavaScript',
            'MySQL',
            'HTML',
            'CSS',
          ],
        },
      ],

      skills: {
        backend: [
          'NestJS',
          'TypeScript',
          'Node.js',
          'Laravel',
          'PHP',
          'Express.js',
          'RESTful APIs',
          'GraphQL',
          'WebSockets',
        ],
        frontend: [
          'React',
          'JavaScript',
          'HTML5',
          'CSS3',
          'Vue.js',
          'Responsive Design',
          'Bootstrap',
          'Tailwind CSS',
        ],
        databases: [
          'PostgreSQL',
          'MongoDB',
          'MySQL',
          'Redis',
          'TypeORM',
          'Mongoose',
        ],
        tools: [
          'Git',
          'Docker',
          'VS Code',
          'Postman',
          'npm/yarn',
          'Linux',
          'CI/CD',
        ],
        other: [
          'Microservices Architecture',
          'Queue Systems (Bull)',
          'Cron Jobs',
          'JWT Authentication',
          'Unit Testing (Jest)',
          'Agile/Scrum',
        ],
      },

      projects: [
        {
          name: 'School Management System',
          description:
            'Comprehensive school management system with modules for students, teachers, classes, attendance, exams, and fee management. Built with NestJS and TypeScript.',
          technologies: [
            'NestJS',
            'TypeScript',
            'PostgreSQL',
            'TypeORM',
            'React',
          ],
          imageUrl:
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
          featured: true,
          published: true,
          category: 'Fullstack' as 'Fullstack',
          effectiveness: 90,
          url: '',
          githubUrl: 'https://github.com/innocentntakir/school-management',
          type: 'Client Project',
          role: 'Lead Developer',
        },
        {
          name: 'Portfolio Website',
          description:
            'Modern personal portfolio website with admin dashboard for managing profile, projects, and contact messages. Features real-time updates and beautiful UI.',
          technologies: ['React', 'TypeScript', 'NestJS', 'PostgreSQL'],
          imageUrl:
            'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1000',
          featured: true,
          published: true,
          category: 'Fullstack' as 'Fullstack',
          effectiveness: 85,
          url: 'https://innocentntakirutimana.com',
          githubUrl: 'https://github.com/innocentntakir/portfolio',
          type: 'Personal Project',
          role: 'Solo Developer',
        },
      ],

      languages: [
        {
          language: 'Kinyarwanda',
          proficiency: 'Native',
        },
        {
          language: 'English',
          proficiency: 'Fluent',
        },
        {
          language: 'French',
          proficiency: 'Intermediate',
        },
      ],

      socialLinks: {
        github: 'https://github.com/innocentntakir',
        linkedin: 'https://www.linkedin.com/in/innocent-ntakirutimana',
        twitter: 'https://twitter.com/innocentntakir',
        website: 'https://innocentntakirutimana.com',
      },

      city: 'Kigali',
      country: 'Rwanda',

      servicesOffered: `I offer professional web development services including:

• Custom Web Application Development
• Backend API Development (NestJS, Laravel, Node.js)
• Frontend Development (React, Vue.js)
• Database Design & Optimization
• E-commerce Solutions
• Real-time Applications (WebSockets)
• System Architecture & Consulting
• Code Review & Mentoring
• Bug Fixes & Maintenance

Available for both freelance projects and full-time opportunities.`,

      availableForHire: true,
      isPublic: true,
    };
  }
}
