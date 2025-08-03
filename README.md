# A-Z Slick Plumbing Website

A modern, responsive website for A-Z Slick Plumbing services built with React, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with beautiful animations
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Contact Integration**: Google Maps integration and contact forms
- **Service Showcase**: Professional presentation of plumbing services
- **Gallery**: Image gallery showcasing previous work
- **FAQ Section**: Common questions and answers
- **SEO Optimized**: Proper meta tags and structure

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd az-slick-plumbing-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/            # shadcn/ui components
│   ├── About.tsx      # About section
│   ├── ContactUs.tsx  # Contact form
│   ├── FAQ.tsx        # FAQ section
│   ├── Footer.tsx     # Footer component
│   ├── Gallery.tsx    # Image gallery
│   ├── Hero.tsx       # Hero section
│   ├── MapSection.tsx # Google Maps integration
│   ├── Navbar.tsx     # Navigation
│   └── Services.tsx   # Services showcase
├── pages/             # Page components
├── assets/            # Images and static assets
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Use GitHub Actions for automatic deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Customization

### Colors
The project uses a custom color scheme defined in `tailwind.config.ts`:
- Primary blue: `azplumbing-blue`
- Accent yellow: `azplumbing-yellow`

### Content
Update the content in the respective component files to match your business information.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions about this project, please contact the development team.
