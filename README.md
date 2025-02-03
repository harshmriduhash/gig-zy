# Gigzy AI Marketplace

A modern freelance marketplace platform specializing in AI and technology services.

## Features

### Core Features
- User authentication with role-based access control
- Project posting and bidding system
- Real-time messaging
- Secure payment processing
- Time tracking
- File sharing
- Project templates

### AI Services
- Machine Learning Models
- Deep Learning Solutions
- Natural Language Processing
- Computer Vision
- Reinforcement Learning
- AI Gaming Solutions
- AI Integration Services
- Chatbot Development
- Voice Assistants
- Automation Solutions

### Project Management
- Time tracking
- File management
- Project templates
- Milestone tracking
- Team collaboration

### Analytics & Reporting
- Real-time analytics
- Custom dashboards
- Performance metrics
- Export capabilities

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Supabase
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gigzy-ai-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

### Database Setup

1. Connect to Supabase by clicking the "Connect to Supabase" button in the top right corner.
2. The database migrations will automatically run and set up the required tables and schemas.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── pages/         # Page components
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Deployment

The application can be deployed to Netlify:

1. Connect your repository to Netlify
2. Set up environment variables in Netlify dashboard
3. Deploy using the Netlify CI/CD pipeline

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Supabase](https://supabase.io/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide](https://lucide.dev/) for the beautiful icons