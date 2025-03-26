# Roofing Business Template

A modern, responsive website template for roofing businesses built with Next.js and Tailwind CSS. This template includes an admin panel for easy content management.

## Features

- Modern, responsive design optimized for all devices
- 4 static pages: Home, About, Services, and Contact
- Content management system with live preview
- Easy to customize for different businesses
- Built with Next.js and Tailwind CSS for excellent performance and maintainability

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone this repository to create a new project for your client
   ```bash
   git clone https://github.com/yourusername/roofing-template.git client-name-website
   cd client-name-website
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the template

### Customizing Content

1. Visit the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)
2. Update the business information, homepage content, services, and more
3. Click "Save Changes" to update the content
4. Use the "Preview Site" button to see how the changes look before publishing

## Project Structure

- `/src/app` - Next.js app directory containing page routes
- `/src/components` - Reusable React components
- `/src/data` - Content data (content.json)
- `/src/utils` - Utility functions for content management
- `/public` - Static assets like images and fonts

## Content Management

All website content is stored in `/src/data/content.json`. This file is updated through the admin panel using the utility functions in `/src/utils/content.ts`.

The content is structured as follows:

- `business` - Basic business information (name, logo, contact details)
- `homepage` - Homepage content (hero section, features, testimonials)
- `about` - About page content (company history, team members)
- `services` - Services offered by the business
- `contact` - Contact page content
- `socials` - Social media links

## Deployment

### With Vercel (Recommended)

1. Push your customized template to a GitHub repository
2. Connect the repository to Vercel
3. Deploy with a single click

### Manual Deployment

1. Build the application
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server
   ```bash
   npm start
   # or
   yarn start
   ```

## Future Enhancements

- Add authentication to the admin panel
- Implement image upload capabilities
- Add a blog section with CMS functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Created by [Your Name]

Icons from [Heroicons](https://heroicons.com)
