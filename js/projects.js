// All portfolio content that changes often lives in this file.
// To add a project, copy one object in PROJECTS and edit it.

const GITHUB_USER = 'Dubai-lab';

const PROJECTS = [
  {
    name: 'SchoolSync',
    category: 'School management SaaS',
    accent: '#f59e0b',
    tagline: 'One platform for enrollment, grades, attendance and fees, designed for schools in Liberia.',
    description:
      'SchoolSync replaces paper registers and scattered spreadsheets with a single multi-tenant system. Each school gets its own website, role-based dashboards for every office, and two companion mobile apps: a student portal and an attendance app.',
    highlights: [
      'Dashboards for admins, bursars, deans, guidance staff, IT admins, teachers and students',
      'Attendance by NFC tap or kiosk scan, and it keeps working without internet',
      'Fees with bank-transfer verification, receipts, report cards and transcripts',
      'Built-in designer for student ID cards and transcripts',
    ],
    stack: ['React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Capacitor', 'Tailwind CSS', 'Stripe', 'Vitest'],
    meta: '431 commits',
    image: 'assets/screens/schoolsync.jpg',
    live: 'https://schoolsyncedu.vercel.app',
    repos: [{ label: 'Source code', url: 'https://github.com/Dubai-lab/schoolsyncedu' }],
  },
  {
    name: 'George Rental',
    category: 'Property and rent management',
    accent: '#ef4444',
    tagline: 'Rent collection and receipts for commercial storefronts in Monrovia.',
    description:
      'A landlord managing around 50 shopfronts across four areas of Monrovia was tracking rent in ledger notebooks. George Rental moves that online: tenants pay by mobile money or bank transfer and upload proof, the owner confirms, and both sides keep a receipt.',
    highlights: [
      'Owner console for stores, tenants, agreements, payments, reports and a map view',
      'Tenant portal to pay rent, view receipts and raise maintenance requests',
      'MTN MoMo, Orange Money and bank transfer flows with proof upload',
      'Email notifications from Supabase Edge Functions, plus two-step sign-in',
      'Companion tenant mobile app built with React Native and Expo',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Mapbox', 'React Native', 'Expo'],
    meta: '45 commits',
    image: 'assets/screens/georgerental.jpg',
    live: 'https://george-rental.vercel.app',
    repos: [{ label: 'Source code', url: 'https://github.com/Dubai-lab/george_rental' }],
  },
  {
    name: 'AIU System',
    category: 'Voice assistant and Face ID',
    accent: '#f5c451',
    tagline: 'A university management system you can log in to with your face and operate by voice.',
    description:
      'AIU System combines three services: a React frontend, a FastAPI backend and a separate face-recognition service. Students mark attendance with a face check, and an AI assistant can carry out tasks across the system for admins, teachers and students.',
    highlights: [
      'Face ID login and face-verified class attendance using InsightFace on ONNX Runtime',
      'Voice assistant built on the Claude API with tools that act on real system data',
      'No face images are stored, only one 512-number embedding per user in pgvector',
      'The browser never writes to the database; every write goes through the backend',
      'Covers academics, attendance, invoices, payments and transactional email',
    ],
    stack: ['React', 'TypeScript', 'Python', 'FastAPI', 'Claude API', 'InsightFace', 'pgvector', 'Docker'],
    meta: '3 services',
    image: 'assets/screens/aiu.jpg',
    live: 'https://aiu-system.vercel.app',
    repos: [{ label: 'Source code', url: 'https://github.com/Dubai-lab/aiu-system' }],
  },
  {
    name: 'BioAttend',
    category: 'Biometric staff attendance',
    accent: '#14b8a6',
    tagline: 'Fingerprint and face attendance with shift management for hospital staff.',
    description:
      'Staff walk up to a kiosk and present a finger or their face; they never sign in. The hard part was the hardware: the fingerprint reader is a USB device that no browser API can reach, so I wrote a local Python bridge that drives the vendor library and exposes it to the web app.',
    highlights: [
      'Python bridge connects the browser to a USB fingerprint reader',
      'Face embeddings computed in the browser, matched in PostgreSQL',
      'Only a registered kiosk can write attendance, enforced in the database',
      'Check-in and check-out windows, late approvals and night shifts that cross midnight',
      'An ambiguous face match names nobody and falls back to a staff number',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'PL/pgSQL', 'Python', 'Human (face AI)', 'USB hardware'],
    meta: '36 commits',
    image: 'assets/screens/bioattend.jpg',
    live: 'https://bio-attend-one.vercel.app',
    repos: [{ label: 'Source code', url: 'https://github.com/Dubai-lab/BioAttend' }],
  },
  {
    name: 'Smart Mail',
    category: 'Email and OTP delivery SaaS',
    accent: '#818cf8',
    tagline: 'Design email templates, connect your SMTP, and send through an API.',
    description:
      'Smart Mail is a developer-facing email platform split across three repositories: a React dashboard with a drag-and-drop template builder, a NestJS API, and a command-line tool. Developers create templates, generate API keys and send transactional email and one-time passwords from their own apps.',
    highlights: [
      'Drag-and-drop email template builder with live preview and HTML export',
      'NestJS and Prisma API with JWT auth, role guards and API-key validation',
      'Subscription plans and payments with Stripe',
      'Admin panel for users, plans, payments, system logs and a blog',
      'CLI to log in, fetch API keys and pull templates from the terminal',
    ],
    stack: ['React', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Stripe', 'Nodemailer', 'Node.js CLI'],
    meta: '3 repositories',
    visual: 'terminal',
    repos: [
      { label: 'Frontend', url: 'https://github.com/Dubai-lab/smartmail' },
      { label: 'Backend', url: 'https://github.com/Dubai-lab/smartmail-backend' },
      { label: 'CLI', url: 'https://github.com/Dubai-lab/smartmail-cli' },
    ],
  },
  {
    name: 'Fingerprint MIS 8',
    category: 'Fingerprint attendance app',
    accent: '#38bdf8',
    tagline: 'A cross-platform Flutter app for fingerprint-based attendance in schools.',
    description:
      'Fingerprint MIS takes attendance for classes and exams using a fingerprint scanner connected to the device. It is the latest version of a project I rebuilt and improved several times, and it has a web companion written in TypeScript.',
    highlights: [
      'Five roles: admin, instructor, invigilator, security and student',
      'Fingerprint SDK integrated through a native platform channel',
      'Course enrollment, live attendance marking and exam invigilation',
      'Reports with charts, exported to Excel, CSV and PDF',
    ],
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Cloud Functions', 'Kotlin'],
    meta: '36 commits',
    visual: 'fingerprint',
    repos: [
      { label: 'Flutter app', url: 'https://github.com/Dubai-lab/fingerprintmis8' },
      { label: 'Web version', url: 'https://github.com/Dubai-lab/fingerprint_attendance' },
    ],
  },
  {
    name: 'Liberia EcoLedger',
    category: 'Blockchain e-waste tracking',
    accent: '#4ade80',
    tagline: 'An immutable record of every electronic device, from point of sale to disposal.',
    description:
      'EcoLedger records device registration, ownership transfers and certified disposal on the Ethereum Sepolia testnet. Manufacturers are accountable for what they import, recyclers log disposals, and the smart contract mints EcoCredit tokens to owners who dispose of devices properly.',
    highlights: [
      'Two Solidity contracts: an ERC-20 reward token and the device registry',
      'Gasless for users: an operator wallet relays transactions through an Edge Function',
      'Email sign-in with embedded wallets, so nobody needs a crypto wallet first',
      'Dashboards for consumers, manufacturers, recyclers, regulators and auditors',
      'QR scanning for devices and a public ledger anyone can inspect',
    ],
    stack: ['React', 'TypeScript', 'Solidity', 'ethers.js', 'Privy', 'Supabase', 'Edge Functions', 'Recharts'],
    meta: '82 commits',
    image: 'assets/screens/ecoledger.jpg',
    live: 'https://liberiaecoledger.vercel.app',
    repos: [{ label: 'Source code', url: 'https://github.com/Dubai-lab/liberiaecoledger' }],
  },
];

const MORE_REPOS = [
  { name: 'vestahairhub', text: 'Hair and beauty marketplace with seller onboarding.', lang: 'TypeScript', live: 'https://vestahairhub.vercel.app' },
  { name: 'DLS', text: 'Football League Hub, a league tracking site.', lang: 'HTML', live: 'https://footballleaguehub.vercel.app' },
  { name: 'otp-saas-backend', text: 'Backend API for a one-time-password delivery service.', lang: 'TypeScript' },
  { name: 'appraisal', text: 'Appraisal management system.', lang: 'TypeScript' },
  { name: 'wayfarer', text: 'Online travel ticketing app.', lang: 'Dart' },
  { name: 'announce_it_app', text: 'Announcements mobile app.', lang: 'Dart' },
  { name: 'Car_Management_System', text: 'Car management system built with Laravel.', lang: 'Blade' },
  { name: 'my_shop', text: 'Online shop built with Laravel.', lang: 'Blade' },
];
