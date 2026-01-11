# 🚀 HireHub - Job Search & Recruitment Platform

A modern, full-stack job search and recruitment platform built with microservices architecture, enabling seamless job discovery for job seekers and efficient talent acquisition for recruiters.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-5.2-green.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Services Documentation](#services-documentation)
- [Database Indexing](#database-indexing)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

**HireHub** is a comprehensive job search and recruitment platform that connects job seekers with opportunities and helps recruiters find the right talent. The platform features AI-powered career guidance, resume analysis, subscription-based premium features, and a seamless application management system.

### Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication with password reset functionality
- 🤖 **AI-Powered Features** - Career guidance and ATS resume analysis using Google Gemini AI
- 💳 **Payment Integration** - Razorpay integration for subscription management
- 📊 **Real-time Updates** - Kafka-based event-driven architecture
- 🎨 **Modern UI** - Responsive design with dark mode support
- 🐳 **Containerized** - Docker support for easy deployment
- ⚡ **Performance Optimized** - Database indexing for fast queries and search operations


### User Profile & Account Management

*User profile page showcasing profile information, contact details, resume management, and subscription status tracking.*

### Job Discovery & Listings
*Explore opportunities page displaying available job listings with filters and application status indicators.*

### AI-Powered Resume Analysis
*ATS compatibility analyzer providing detailed feedback on resume formatting, keywords, structure, and readability with a comprehensive score breakdown.*

### Career Guidance
*Personalized career path recommendations based on user skills, including job options, skills to learn, and learning approaches powered by Google Gemini AI.*

*Interactive skills input interface for generating personalized career recommendations.*

### Job Details
*Detailed job posting view with company information, job description, location, salary, and application status.*

### Company Profiles
*Company profile page displaying company information, mission, and active job openings.*



## ✨ Features

### For Job Seekers 👨‍💼

- **User Registration & Profile Management**
  - Register with role selection (Job Seeker/Recruiter)
  - Upload resume (PDF) during registration
  - Complete profile with bio and contact information
  - Profile picture upload and management
  - Skills management (add/remove skills)

- **Job Discovery & Application**
  - Browse all active job listings
  - View detailed job descriptions
  - Apply to jobs with one click
  - Track application status
  - View all applied jobs in dashboard

- **AI-Powered Career Tools**
  - **Career Guidance**: Get personalized career path suggestions based on skills
  - **ATS Resume Analyzer**: Analyze resume for ATS compatibility with detailed feedback
  - Skills-based job recommendations

- **Subscription Features**
  - Premium subscription for enhanced features
  - Subscription status tracking
  - Renewal management

### For Recruiters 👔

- **Company Management**
  - Register and manage up to 5 companies
  - Add company details (name, description, website, logo)
  - View all registered companies
  - Company profile pages

- **Job Posting & Management**
  - Create new job postings
  - Update existing job listings
  - View all active jobs
  - Manage job applications

- **Application Management**
  - View all applications for a specific job
  - Update application status (Pending/Approved/Rejected)
  - Candidate profile viewing

### General Features 🌟

- **Authentication & Security**
  - User registration with role-based access
  - Secure login with JWT tokens
  - Password reset via email
  - Protected routes and API endpoints

- **User Interface**
  - Modern, responsive design
  - Dark mode support
  - Smooth animations and transitions
  - Mobile-friendly interface

- **Performance**
  - Redis caching for improved performance
  - Optimized database queries
  - Efficient file upload handling (Cloudinary integration)

## 🏗️ Architecture

The application follows a **microservices architecture** pattern with the following services:

```
┌─────────────┐
│   Frontend  │ (Next.js 16)
│   (React)   │
└──────┬──────┘
       │
       ├─────────────────┬─────────────────┬─────────────────┬─────────────────┐
       │                 │                 │                 │                 │
┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
│ Auth Service│  │ Job Service │  │User Service │  │Payment      │  │Utils Service│
│             │  │             │  │             │  │Service      │  │             │
│ - Register  │  │ - Companies │  │ - Profile   │  │ - Checkout  │  │ - Kafka     │
│ - Login     │  │ - Jobs      │  │ - Skills    │  │ - Verify    │  │ Consumer    │
│ - Reset     │  │ - Apps      │  │ - Apply     │  │             │  │ - AI Tools  │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                 │                 │                 │                 │
       └─────────────────┴─────────────────┴─────────────────┴─────────────────┘
                                         │
                          ┌──────────────┴──────────────┐
                          │                             │
                   ┌──────▼──────┐              ┌──────▼──────┐
                   │  PostgreSQL │              │    Redis    │
                   │  (Neon DB)  │              │   (Cache)   │
                   └─────────────┘              └─────────────┘
                          │
                   ┌──────▼──────┐
                   │  Kafka      │
                   │  (Events)   │
                   └─────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.1 (React 19.2.3)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.18
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Theming**: Next Themes (Dark mode support)

### Backend Services
- **Runtime**: Node.js with Express 5.2.1
- **Language**: TypeScript 5.9.3
- **Database**: PostgreSQL (Neon Serverless) with optimized indexes
- **Caching**: Redis 5.10.0
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **Message Broker**: KafkaJS
- **Database Indexing**: B-tree, GIN (pg_trgm), partial, and composite indexes

### Third-Party Services
- **Cloud Storage**: Cloudinary (for resume and profile pictures)
- **Payment Gateway**: Razorpay
- **AI/ML**: Google Gemini AI (@google/genai)
- **Email Service**: Nodemailer (via Kafka consumer)

### DevOps & Tools
- **Containerization**: Docker
- **Package Manager**: npm
- **Development**: Nodemon, Concurrently

## 📁 Project Structure

```
JOB-SEARC-APP/
│
│
├── frontend/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/                # Next.js app router pages
│   │   │   ├── (auth)/         # Authentication pages (login, register)
│   │   │   ├── account/        # User account pages
│   │   │   │   └── (components)/ # Account components
│   │   │   ├── jobs/           # Job listing and detail pages
│   │   │   ├── company/        # Company profile pages
│   │   │   ├── payment/        # Payment success pages
│   │   │   ├── subscribe/      # Subscription page
│   │   │   └── forgot/         # Password reset pages
│   │   ├── components/         # Reusable React components
│   │   │   ├── ui/             # UI primitives (Radix UI)
│   │   │   ├── hero.tsx        # Landing page hero
│   │   │   ├── career-guide.tsx # AI career guidance component
│   │   │   └── resume-analyzer.tsx # ATS resume analyzer
│   │   ├── context/            # React Context providers
│   │   │   └── AppContext.tsx  # Global app state
│   │   └── lib/                # Utility functions and types
│   ├── public/                 # Static assets
│   ├── Dockerfile              # Frontend Docker configuration
│   └── package.json
│
└── services/                    # Backend microservices
    │
    ├── auth/                    # Authentication Service
    │   ├── src/
    │   │   ├── controllers/    # Business logic
    │   │   │   └── auth.ts     # Auth controllers (register, login, reset)
    │   │   ├── routes/         # API routes
    │   │   │   └── auth.ts     # Auth endpoints
    │   │   ├── middleware/     # Express middleware
    │   │   │   └── multer.ts   # File upload handling
    │   │   ├── utils/          # Utility functions
    │   │   │   ├── db.ts       # Database connection (Neon)
    │   │   │   ├── errorHandler.ts # Error handling
    │   │   │   └── producer.ts # Kafka message producer
    │   │   └── index.ts        # Service entry point
    │   └── Dockerfile
    │
    ├── job/                     # Job Management Service
    │   ├── src/
    │   │   ├── controllers/
    │   │   │   └── job.ts      # Job & company CRUD operations
    │   │   ├── routes/
    │   │   │   └── job.ts      # Job endpoints
    │   │   ├── middleware/
    │   │   │   ├── auth.ts     # JWT authentication
    │   │   │   └── multer.ts   # Logo upload handling
    │   │   └── utils/          # Shared utilities
    │   └── Dockerfile
    │
    ├── user/                    # User Profile Service
    │   ├── src/
    │   │   ├── controllers/
    │   │   │   └── user.ts     # Profile, skills, applications
    │   │   ├── routes/
    │   │   │   └── user.ts     # User endpoints
    │   │   └── middleware/
    │   │       ├── auth.ts     # JWT authentication
    │   │       └── multer.ts   # Profile pic & resume upload
    │   └── Dockerfile
    │
    ├── payment/                 # Payment Service
    │   ├── src/
    │   │   ├── controllers/
    │   │   │   └── payment.ts  # Razorpay integration
    │   │   ├── routes/
    │   │   │   └── payment.ts  # Payment endpoints
    │   │   └── middleware/
    │   │       └── auth.ts     # JWT authentication
    │   └── Dockerfile
    │
    └── utils/                   # Utility Service (Kafka Consumer)
        ├── src/
        │   ├── consumer.ts     # Kafka message consumer
        │   ├── GeminiPrompts.ts # AI prompt templates
        │   └── index.ts        # Service entry point
        └── Dockerfile
```

## 🔌 Services Documentation

### 1. Auth Service (`services/auth`)

**Port**: Configurable via environment variable

**Responsibilities**:
- User registration (Job Seekers & Recruiters)
- User authentication (Login)
- Password reset functionality
- Database initialization (creates users, skills, user_skills tables)
- Database indexing (performance optimization)
- Redis connection management
- JWT token generation

**Endpoints**:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password with token

**Database Tables**:
- `users` - User information
- `skills` - Available skills
- `user_skills` - User-skill relationships

**Key Features**:
- Role-based registration (jobseeker/recruiter)
- Resume upload for job seekers
- Password hashing with bcrypt
- Email notifications via Kafka

---

### 2. Job Service (`services/job`)

**Port**: Configurable via environment variable

**Responsibilities**:
- Company management (CRUD operations)
- Job posting and management
- Application viewing and status updates
- Job listing and details
- Database indexing (performance optimization for search queries)

**Endpoints**:
- `POST /api/job/company/new` - Create new company
- `GET /api/job/company/all` - Get all companies (authenticated)
- `GET /api/job/company/:id` - Get company details
- `DELETE /api/job/company/:companyId` - Delete company
- `POST /api/job/new` - Create new job posting
- `PUT /api/job/:jobId` - Update job posting
- `GET /api/job/all` - Get all active jobs (authenticated)
- `GET /api/job/:jobId` - Get job details
- `GET /api/job/application/:jobId` - Get all applications for a job
- `PUT /api/job/application/update/:id` - Update application status

**Key Features**:
- Company logo upload (Cloudinary)
- Job status management
- Application tracking
- Multi-company support (max 5 per recruiter)

---

### 3. User Service (`services/user`)

**Port**: Configurable via environment variable

**Responsibilities**:
- User profile management
- Skills management
- Job applications
- Resume and profile picture updates

**Endpoints**:
- `GET /api/user/me` - Get current user profile
- `GET /api/user/:userId` - Get user profile by ID
- `PUT /api/user/update/profile` - Update user profile
- `PUT /api/user/update/pic` - Update profile picture
- `PUT /api/user/update/resume` - Update resume
- `POST /api/user/skill/add` - Add skill to user
- `PUT /api/user/skill/delete` - Remove skill from user
- `POST /api/user/apply/job` - Apply for a job
- `GET /api/user/application/all` - Get all user applications

**Key Features**:
- Profile picture upload (Cloudinary)
- Resume upload and management (PDF)
- Skills tagging system
- Application history tracking

---

### 4. Payment Service (`services/payment`)

**Port**: Configurable via environment variable

**Responsibilities**:
- Subscription payment processing
- Payment verification
- Razorpay integration

**Endpoints**:
- `POST /api/payment/checkout` - Create payment order
- `POST /api/payment/verify` - Verify payment and activate subscription

**Key Features**:
- Razorpay payment gateway integration
- Subscription activation upon successful payment
- Payment verification and status update

---

### 5. Utils Service (`services/utils`)

**Port**: Configurable via environment variable

**Responsibilities**:
- Kafka message consumption
- AI-powered features (Career Guidance, Resume Analysis)
- Email notifications (password reset)
- File processing and Cloudinary uploads

**Features**:
- **Career Guidance**: Analyzes user skills and provides career path suggestions using Google Gemini AI
- **ATS Resume Analyzer**: Evaluates resume for ATS compatibility and provides improvement suggestions
- **Email Service**: Sends transactional emails (password reset links)
- **File Processing**: Handles file uploads to Cloudinary

**Kafka Topics**:
- Email notifications
- AI service requests
- File upload processing

---

## 📊 Database Indexing

The application uses **strategic database indexing** to optimize query performance, especially for job searches and filtering operations.

### Overview

Database indexes are automatically created when services start, improving query performance by 10x - 1000x depending on data size.

### Index Types

1. **B-tree Indexes** - Standard indexes for filtering, sorting, and joins
   - Used for: PRIMARY KEY, UNIQUE constraints, foreign keys
   - Examples: `user_id`, `job_id`, `company_id`, `email`

2. **GIN Indexes** - Generalized Inverted Index for text search
   - Used for: `ILIKE` queries on job titles and locations
   - Requires: `pg_trgm` extension (enabled automatically)
   - Examples: `jobs.title`, `jobs.location`

3. **Partial Indexes** - Index only a subset of rows
   - Used for: Active jobs (`is_active = true`), subscribed applications
   - Benefits: Smaller size, faster queries

4. **Composite Indexes** - Index on multiple columns
   - Used for: Multi-column queries (e.g., `is_active + created_at`)
   - Examples: `(job_id, subscribed, applied_at)`

### Key Indexes

#### Jobs Table
- `idx_jobs_is_active` - Filter active jobs
- `idx_jobs_company_id` - Join with companies
- `idx_jobs_posted_by_recruiter` - Filter by recruiter
- `idx_jobs_title_trgm` - Text search on job titles (GIN)
- `idx_jobs_location_trgm` - Text search on locations (GIN)
- `idx_jobs_created_at` - Sort by creation date

#### Applications Table
- `idx_applications_job_id` - Filter applications by job
- `idx_applications_applicant_id` - Filter by applicant
- `idx_applications_subscribed` - Filter premium subscribers

#### Companies Table
- `idx_companies_recruiter_id` - Filter companies by recruiter

#### Users & Skills
- `idx_user_skills_user_id` - Filter skills by user
- `idx_user_skills_skill_id` - Filter users by skill
- `idx_users_role` - Filter by user role

### Automatic Index Creation

Indexes are created automatically during service initialization:

```typescript
// In services/job/src/index.ts and services/auth/src/index.ts
async function initDb() {
    // Create tables...
    await initIndexes(); // Automatically adds all performance indexes
}
```

### Performance Impact

**Example Query:**
```sql
SELECT * FROM jobs 
WHERE is_active = true 
AND title ILIKE '%developer%'
ORDER BY created_at DESC;
```

- **Before Indexing**: Full table scan (O(n))
- **After Indexing**: Index-based search (O(log n))
- **Expected Improvement**: 10x - 1000x faster

### Requirements

- **PostgreSQL Extension**: `pg_trgm` is required for text search indexes
  - Automatically enabled during initialization
  - If your database provider restricts extensions, contact support or use standard B-tree indexes

### Documentation

For detailed indexing information, see [INDEXING.md](./INDEXING.md).

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon Serverless recommended)
- Redis server
- Kafka instance (for event-driven features)
- Cloudinary account (for file storage)
- Razorpay account (for payments)
- Google Gemini API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd JOB-SEARC-APP
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Service Dependencies**
   ```bash
   # Install dependencies for each service
   cd services/auth && npm install
   cd ../job && npm install
   cd ../user && npm install
   cd ../payment && npm install
   cd ../utils && npm install
   ```

4. **Set up Environment Variables**
   
   See [Environment Variables](#environment-variables) section below.

5. **Build Services**
   ```bash
   # Build each service
   cd services/auth && npm run build
   cd ../job && npm run build
   cd ../user && npm run build
   cd ../payment && npm run build
   cd ../utils && npm run build
   ```

6. **Start Services**
   
   **Development Mode:**
   ```bash
   # Terminal 1: Auth Service
   cd services/auth && npm run dev
   
   # Terminal 2: Job Service
   cd services/job && npm run dev
   
   # Terminal 3: User Service
   cd services/user && npm run dev
   
   # Terminal 4: Payment Service
   cd services/payment && npm run dev
   
   # Terminal 5: Utils Service
   cd services/utils && npm run dev
   
   # Terminal 6: Frontend
   cd frontend && npm run dev
   ```

   **Production Mode:**
   ```bash
   # Start each service
   cd services/auth && npm start
   # ... repeat for other services
   
   # Start frontend
   cd frontend && npm start
   ```

### Docker Deployment

Each service and the frontend have Dockerfiles. Build and run using:

```bash
# Build images
docker build -t hirehub-auth ./services/auth
docker build -t hirehub-job ./services/job
docker build -t hirehub-user ./services/user
docker build -t hirehub-payment ./services/payment
docker build -t hirehub-utils ./services/utils
docker build -t hirehub-frontend ./frontend

# Run containers
docker run -p 3001:3001 hirehub-auth
docker run -p 3002:3002 hirehub-job
# ... repeat for other services
docker run -p 3000:3000 hirehub-frontend
```

## 🔐 Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_AUTH_SERVICE=http://localhost:3001
NEXT_PUBLIC_JOB_SERVICE=http://localhost:3002
NEXT_PUBLIC_USER_SERVICE=http://localhost:3003
NEXT_PUBLIC_PAYMENT_SERVICE=http://localhost:3004
NEXT_PUBLIC_UTILS_SERVICE=http://localhost:3005
```

### Auth Service (`.env`)

```env
PORT=3001
DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
Redis_Url=redis://localhost:6379
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
KAFKA_BROKER=localhost:9092
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### Job Service (`.env`)

```env
PORT=3002
DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
KAFKA_BROKER=localhost:9092
```

### User Service (`.env`)

```env
PORT=3003
DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
JOB_SERVICE_URL=http://localhost:3002
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
KAFKA_BROKER=localhost:9092
```

### Payment Service (`.env`)

```env
PORT=3004
DATABASE_URL=your_neon_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Utils Service (`.env`)

```env
PORT=3005
KAFKA_BROKER=localhost:9092
GEMINI_API_KEY=your_google_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## 📡 API Documentation

### Authentication Headers

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Response Format

Success responses follow this format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

### Example API Calls

**Register User:**
```bash
POST /api/auth/register
Content-Type: multipart/form-data

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phoneNumber": "1234567890",
  "role": "jobseeker",
  "bio": "Software developer...",
  "file": <resume.pdf>
}
```

**Create Job:**
```bash
POST /api/job/new
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior Full Stack Developer",
  "description": "Job description...",
  "company_id": 1,
  "requirements": "Requirements..."
}
```

## 🚢 Deployment

### Production Considerations

1. **Database**: Use managed PostgreSQL (Neon, Supabase, or AWS RDS)
2. **Redis**: Use managed Redis (Redis Cloud, AWS ElastiCache)
3. **Kafka**: Use managed Kafka (Confluent Cloud, AWS MSK)
4. **File Storage**: Cloudinary (already configured)
5. **Frontend**: Deploy to Vercel, Netlify, or any static hosting
6. **Backend**: Deploy services to AWS, Google Cloud, or Azure
7. **Environment Variables**: Use secure secret management (AWS Secrets Manager, etc.)

### Deployment Checklist

- [ ] Set all environment variables
- [ ] Configure CORS for production domains
- [ ] Set up SSL certificates
- [ ] Configure database connection pooling
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up CI/CD pipeline
- [ ] Configure backup strategies

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Update documentation for new features
- Ensure all services are tested
- Follow the existing code style


## 🙏 Acknowledgments

- Google Gemini AI for career guidance and resume analysis
- Radix UI for accessible component primitives
- Next.js team for the amazing framework
- All open-source contributors

---

**Built with ❤️ using TypeScript, Next.js, and Express**

