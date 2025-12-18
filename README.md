# Tallboy Landscapes Website

A modern, mobile-first landscapes website built with Astro SSG and Contentful CMS.

## Features

- 🚀 Astro SSG with incremental site regeneration
- 📝 Contentful CMS integration
- 📱 Mobile-first responsive design
- 🎨 Beautiful earthy color scheme
- ⚡ Fast page loads with optimized images
- 🔄 Dynamic content from Contentful

## Contentful Setup

### Required Content Types

#### 1. Home Page (`homePage`)

- **Hero Image** (Media): Main hero image
- **Hero Title** (Short text): Main headline
- **Hero Subtitle** (Short text): Subheadline
- **About Title** (Short text)
- **About Description** (Long text)
- **Services Title** (Short text)
- **Testimonial Title** (Short text)

#### 2. Job (`job`)

- **Title** (Short text): Project name
- **Slug** (Short text): URL-friendly identifier
- **Location** (Short text): Project location
- **Hero Image** (Media): Main project image
- **Is Hero Image** (Boolean): Check to feature on homepage
- **Descriptions** (Array of Long text): Project descriptions
- **Images** (Array of Media): Project gallery images

#### 3. Service (`service`)

- **Title** (Short text): Service name
- **Description** (Long text): Service description
- **Icon** (Short text): Emoji or icon

#### 4. Testimonial (`testimonial`)

- **Name** (Short text): Client name
- **Content** (Long text): Testimonial text
- **Role** (Short text): Client role/title (optional)

## Getting Started

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   - Copy `.env.example` to `.env`
   - Add your Contentful Space ID and Access Token

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

- `/src/pages/` - Route pages (index, job detail pages)
- `/src/components/` - Reusable components (Header, Footer)
- `/src/layouts/` - Page layouts
- `/src/lib/` - Contentful client and utilities
- `/src/styles/` - Global styles

## Deployment

This site is optimized for deployment on Vercel with automatic rebuilds when Contentful content changes (using webhooks).

## Design Features

- Earthy color palette (sage green, terracotta, cream)
- Playfair Display for headings
- Inter for body text
- Alternating image/text layouts on job pages
- Smooth animations and transitions
- Accessible and SEO-friendly
