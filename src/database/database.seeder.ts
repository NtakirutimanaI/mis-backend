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

  async seedCompanyProfile() {
    this.logger.log('Starting to seed MIS company profile...');

    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email: 'info@makeitsolutions.rw' },
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
      const hashedPassword = await bcrypt.hash('Mis@2026', 10);

      const user = this.userRepository.create({
        email: 'info@makeitsolutions.rw',
        username: 'make_it_solutions',
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
      this.logger.log('Email: info@makeitsolutions.rw');
      this.logger.log('Password: Mis@2026');
      this.logger.log('═══════════════════════════════════════');

      return profile;
    } catch (error) {
      this.logger.error(`Failed to seed profile: ${error.message}`);
      throw error;
    }
  }

  private getProfileData() {
    return {
      firstName: 'MAKE IT',
      lastName: 'SOLUTIONS (MIS)',
      email: 'info@makeitsolutions.rw',
      phone: '+250 788 000 000',
      avatar: undefined,
      title: 'ICT Solutions Provider',
      yearsOfExperience: 6,

      bio: `MAKE IT SOLUTIONS (MIS) is a leading ICT company specializing in web development, mobile applications, and digital transformation. 
With 6 years of experience delivering cutting-edge technology solutions, we help businesses harness the power of modern technology.
Our team specializes in NestJS, TypeScript, React, Laravel, and cloud infrastructure to build scalable, maintainable systems.`,

      education: [
        {
          degree: 'Custom Web Development',
          institution: 'Full-Stack Solutions',
          graduationYear: 2020,
          description: 'End-to-end web applications built with NestJS, React, and TypeScript — from concept to deployment, tailored to your business needs.',
        },
        {
          degree: 'Mobile App Development',
          institution: 'Cross-Platform & Native',
          graduationYear: 2021,
          description: 'iOS and Android applications using React Native and Flutter, delivering seamless user experiences across all devices.',
        },
        {
          degree: 'Backend API & Cloud Infrastructure',
          institution: 'Scalable Architecture',
          graduationYear: 2022,
          description: 'RESTful and GraphQL APIs with PostgreSQL, cloud deployment on AWS/Vercel, and DevOps automation for high-availability systems.',
        },
        {
          degree: 'UI/UX Design & Frontend Engineering',
          institution: 'Pixel-Perfect Interfaces',
          graduationYear: 2023,
          description: 'Modern responsive frontends with React, Vue.js, and Tailwind CSS, focused on performance, accessibility, and beautiful design.',
        },
      ],

      about: `MAKE IT SOLUTIONS (MIS) is a leading ICT company in Rwanda specializing in web development, mobile applications, and digital transformation. With 6 years of experience, we help businesses harness modern technology through custom software solutions, cloud infrastructure, and expert consulting. Our team is passionate about delivering high-quality, scalable systems that drive real business value.`,

      experience: [
        {
          title: 'ICT Solutions Provider',
          company: 'Make It Solutions',
          location: 'Rwanda',
          startDate: '2020',
          current: true,
          description:
            'Providing enterprise-level ICT solutions using modern tech stack. Leading development of web applications, RESTful APIs, and responsive frontends for clients across various industries.',
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
          title: 'Software Development Services',
          company: 'MIS',
          location: 'Rwanda',
          startDate: '2018',
          endDate: '2020',
          description:
            'Delivered multiple web development projects for clients, building expertise in both frontend and backend technologies.',
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
          'Cloud Infrastructure',
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
            'Comprehensive school management system with modules for students, teachers, classes, attendance, exams, and fee management.',
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
          type: 'Client Project',
          role: 'Lead Developer',
        },
        {
          name: 'MIS Company Website',
          description:
            'Modern company website with admin dashboard for managing profile, projects, services, and contact messages.',
          technologies: ['React', 'TypeScript', 'NestJS', 'PostgreSQL'],
          imageUrl:
            'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1000',
          featured: true,
          published: true,
          category: 'Fullstack' as 'Fullstack',
          effectiveness: 85,
          type: 'Company Project',
          role: 'Development Team',
        },
      ],

      languages: [
        {
          language: 'English',
          proficiency: 'Business',
        },
      ],

      socialLinks: {
        website: 'https://makeitsolutions.rw',
      },

      city: 'Kigali',
      country: 'Rwanda',

      servicesOffered: `MIS offers professional ICT services including:

• Custom Web Application Development
• Backend API Development (NestJS, Laravel, Node.js)
• Frontend Development (React, Vue.js)
• Mobile Application Development
• Database Design & Optimization
• E-commerce Solutions
• Cloud Infrastructure & DevOps
• System Architecture & Consulting
• IT Consulting & Digital Transformation
• Maintenance & Support

Contact us to discuss your next project.`,

      availableForHire: true,
      isPublic: true,
    };
  }
}
