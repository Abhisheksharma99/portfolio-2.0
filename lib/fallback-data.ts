export const fallbackBlogs = [
  {
    _id: "blog1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    excerpt: "Learn how to build modern web applications with Next.js, the React framework for production.",
    content: `
# Getting Started with Next.js

Next.js is a React framework that enables server-side rendering, static site generation, and more. It's designed to make building React applications easier and more efficient.

## Why Next.js?

- **Server-side Rendering (SSR)**: Improves performance and SEO
- **Static Site Generation (SSG)**: Pre-renders pages at build time
- **API Routes**: Build API endpoints as part of your Next.js app
- **File-based Routing**: Create routes based on your file structure
- **Built-in CSS Support**: Import CSS files directly in your components

## Getting Started

To create a new Next.js app, run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

Visit http://localhost:3000 to see your application.

## Key Concepts

### Pages

In Next.js, a page is a React Component exported from a file in the \`pages\` directory. Each page is associated with a route based on its file name.

### Data Fetching

Next.js provides several ways to fetch data:

- \`getStaticProps\`: Fetch data at build time
- \`getStaticPaths\`: Specify dynamic routes to pre-render
- \`getServerSideProps\`: Fetch data on each request

### API Routes

API routes provide a solution to build your API with Next.js. Any file inside the folder \`pages/api\` is mapped to \`/api/*\` and will be treated as an API endpoint instead of a page.

## Conclusion

Next.js provides a great developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    author: "Abhishek Sharma",
    tags: ["Next.js", "React", "Web Development"],
    category: "Web Development",
    isPublished: true,
    publishedAt: new Date("2023-01-15"),
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-15"),
    seo: {
      title: "Getting Started with Next.js - A Comprehensive Guide",
      description: "Learn how to build modern web applications with Next.js, the React framework for production.",
      keywords: ["Next.js", "React", "Web Development", "JavaScript", "Frontend"],
    },
  },
  {
    _id: "blog2",
    title: "Mastering TypeScript for React Development",
    slug: "mastering-typescript-for-react-development",
    excerpt:
      "Discover how TypeScript can improve your React development experience with static typing and better tooling.",
    content: `
# Mastering TypeScript for React Development

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. When combined with React, it provides an excellent development experience.

## Why TypeScript with React?

- **Type Safety**: Catch errors during development instead of runtime
- **Better IDE Support**: Improved autocomplete, navigation, and refactoring
- **Self-Documenting Code**: Types serve as documentation
- **Enhanced Component Props**: Clear interface for component props
- **Safer Refactoring**: Compiler catches issues when you change code

## Setting Up TypeScript with React

Create a new React project with TypeScript:

\`\`\`bash
npx create-react-app my-app --template typescript
# or with Next.js
npx create-next-app@latest --ts
\`\`\`

## Key TypeScript Concepts for React

### Typing Component Props

\`\`\`tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
\`\`\`

### Typing Hooks

\`\`\`tsx
const [count, setCount] = useState<number>(0);

// For complex state
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
\`\`\`

### Custom Hooks with TypeScript

\`\`\`tsx
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Implementation...
}

// Usage
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
\`\`\`

## Best Practices

1. **Use Interface for Props**: Interfaces are more extensible and clearer for component props
2. **Avoid any**: Try to be specific with types instead of using \`any\`
3. **Type Your State**: Always type your useState hooks
4. **Use Type Assertions Sparingly**: Only use when you know better than TypeScript
5. **Leverage Utility Types**: Use built-in utility types like Partial, Pick, Omit

## Conclusion

TypeScript significantly improves the React development experience by catching errors early and providing better tooling. The initial learning curve is worth the long-term benefits in code quality and maintainability.
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    author: "Abhishek Sharma",
    tags: ["TypeScript", "React", "JavaScript"],
    category: "Web Development",
    isPublished: true,
    publishedAt: new Date("2023-02-20"),
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-20"),
    seo: {
      title: "Mastering TypeScript for React Development - A Complete Guide",
      description:
        "Learn how TypeScript can improve your React development experience with static typing and better tooling.",
      keywords: ["TypeScript", "React", "JavaScript", "Static Typing", "Web Development"],
    },
  },
  {
    _id: "blog3",
    title: "Building Responsive UIs with Tailwind CSS",
    slug: "building-responsive-uis-with-tailwind-css",
    excerpt:
      "Learn how to create beautiful, responsive user interfaces quickly with Tailwind CSS's utility-first approach.",
    content: `
# Building Responsive UIs with Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It provides low-level utility classes that let you build completely custom designs.

## Why Tailwind CSS?

- **Utility-First**: Compose designs directly in your markup
- **Responsive Design**: Built-in responsive modifiers
- **Component-Friendly**: Extract reusable components
- **Customizable**: Tailor the framework to your design system
- **Performance**: Only include the CSS you use in production

## Getting Started

Install Tailwind CSS in your project:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Configure your template paths in \`tailwind.config.js\`:

\`\`\`js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

Add the Tailwind directives to your CSS:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## Building Responsive Designs

Tailwind makes responsive design easy with responsive modifiers:

\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- This div will be full width on mobile, half width on medium screens, and one-third width on large screens -->
</div>
\`\`\`

## Creating a Card Component

\`\`\`html
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div>
\`\`\`

## Extracting Components

When you find yourself repeating patterns, extract them into reusable components:

\`\`\`css
@layer components {
  .btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
}
\`\`\`

## Conclusion

Tailwind CSS provides a different approach to styling your applications. By using utility classes, you can build custom designs faster without writing custom CSS. Its responsive design features make it easy to create interfaces that work well on all screen sizes.
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    author: "Abhishek Sharma",
    tags: ["Tailwind CSS", "CSS", "Responsive Design"],
    category: "Web Design",
    isPublished: true,
    publishedAt: new Date("2023-03-10"),
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-03-10"),
    seo: {
      title: "Building Responsive UIs with Tailwind CSS - A Practical Guide",
      description:
        "Learn how to create beautiful, responsive user interfaces quickly with Tailwind CSS's utility-first approach.",
      keywords: ["Tailwind CSS", "CSS", "Responsive Design", "UI", "Frontend"],
    },
  },
  {
    _id: "blog4",
    title: "Introduction to Server Components in React",
    slug: "introduction-to-server-components-in-react",
    excerpt:
      "Explore React Server Components and how they can improve performance and user experience in your applications.",
    content: `
# Introduction to Server Components in React

React Server Components represent a new paradigm in React development, allowing components to render on the server without JavaScript overhead for the client.

## What Are Server Components?

Server Components are a new type of React component that:

- Render on the server only
- Can access server-side resources directly
- Reduce client-side JavaScript bundle size
- Seamlessly integrate with client components

## Benefits of Server Components

- **Reduced Bundle Size**: Server components aren't included in the JavaScript bundle sent to clients
- **Direct Backend Access**: Access databases and file systems directly without API endpoints
- **Automatic Code Splitting**: Only client components are sent to the browser
- **Improved Performance**: Less JavaScript to download, parse, and execute
- **Better SEO**: Content is rendered on the server

## Server vs. Client Components

### Server Components:

- Cannot use hooks (useState, useEffect, etc.)
- Cannot use browser-only APIs
- Can directly access server resources
- Don't require client-side JavaScript

### Client Components:

- Can use all React features (hooks, effects, etc.)
- Can access browser APIs
- Cannot directly access server resources
- Require JavaScript to run in the browser

## Using Server Components in Next.js

Next.js 13+ has built-in support for React Server Components. By default, all components in the \`app\` directory are Server Components unless specified otherwise.

To create a Client Component, add the \`"use client"\` directive at the top of your file:

\`\`\`jsx
"use client"

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
\`\`\`

## Data Fetching with Server Components

Server Components can fetch data directly:

\`\`\`jsx
// This component runs only on the server
export default async function UserProfile({ userId }) {
  const user = await db.user.findUnique({ where: { id: userId } })
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  )
}
\`\`\`

## Best Practices

1. **Use Server Components by Default**: Start with Server Components and only use Client Components when needed
2. **Keep Client Components Lean**: Move as much logic as possible to Server Components
3. **Colocate Data Fetching**: Fetch data in the components that need it
4. **Interleave Server and Client Components**: Server Components can render Client Components and vice versa

## Conclusion

React Server Components represent a significant evolution in how we build React applications. By moving more work to the server, we can create faster, more efficient applications with better user experiences.
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    author: "Abhishek Sharma",
    tags: ["React", "Server Components", "Next.js"],
    category: "Web Development",
    isPublished: true,
    publishedAt: new Date("2023-04-05"),
    createdAt: new Date("2023-04-01"),
    updatedAt: new Date("2023-04-05"),
    seo: {
      title: "Introduction to Server Components in React - The Future of React",
      description:
        "Explore React Server Components and how they can improve performance and user experience in your applications.",
      keywords: ["React", "Server Components", "Next.js", "Performance", "JavaScript"],
    },
  },
  {
    _id: "blog5",
    title: "Creating Animations with Framer Motion",
    slug: "creating-animations-with-framer-motion",
    excerpt: "Learn how to add beautiful animations to your React applications using Framer Motion.",
    content: `
# Creating Animations with Framer Motion

Framer Motion is a production-ready motion library for React that makes it easy to create beautiful animations and interactions.

## Why Framer Motion?

- **Declarative Animations**: Simple, declarative syntax
- **Gestures**: Built-in support for drag, tap, hover, and more
- **Layout Animations**: Animate layout changes automatically
- **Variants**: Create coordinated animations across components
- **Accessibility**: Respects reduced motion preferences

## Getting Started

Install Framer Motion:

\`\`\`bash
npm install framer-motion
\`\`\`

Import and use the \`motion\` component:

\`\`\`jsx
import { motion } from 'framer-motion'

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      Hello, Framer Motion!
    </motion.div>
  )
}
\`\`\`

## Basic Animations

### Animate on Mount

\`\`\`jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  I fade in and slide up!
</motion.div>
\`\`\`

### Hover and Tap Animations

\`\`\`jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  Click me!
</motion.button>
\`\`\`

## Using Variants

Variants allow you to define animation states and orchestrate animations across components:

\`\`\`jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

function List() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.text}
        </motion.li>
      ))}
    </motion.ul>
  )
}
\`\`\`

## Layout Animations

The \`layout\` prop automatically animates layout changes:

\`\`\`jsx
function ExpandingCard({ isExpanded, setIsExpanded }) {
  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        borderRadius: 10,
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <motion.h2 layout>Title</motion.h2>
      {isExpanded && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          This content appears when expanded.
        </motion.p>
      )}
    </motion.div>
  )
}
\`\`\`

## Page Transitions

Create smooth page transitions in Next.js:

\`\`\`jsx
// pages/_app.js
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  )
}

// pages/index.js
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Home Page</h1>
    </motion.div>
  )
}
\`\`\`

## Conclusion

Framer Motion makes it easy to add professional animations to your React applications. With its declarative API and powerful features, you can create engaging user experiences with minimal code.
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    author: "Abhishek Sharma",
    tags: ["Framer Motion", "React", "Animation"],
    category: "Web Design",
    isPublished: true,
    publishedAt: new Date("2023-05-15"),
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-05-15"),
    seo: {
      title: "Creating Animations with Framer Motion - A Complete Guide",
      description: "Learn how to add beautiful animations to your React applications using Framer Motion.",
      keywords: ["Framer Motion", "React", "Animation", "UI", "UX"],
    },
  },
]

export const fallbackProjects = [
  {
    _id: "project1",
    title: "E-commerce Platform",
    slug: "e-commerce-platform",
    description: "A full-featured e-commerce platform built with Next.js, Tailwind CSS, and MongoDB.",
    content: `
# E-commerce Platform

A modern, full-featured e-commerce platform built with Next.js, Tailwind CSS, and MongoDB.

## Features

- User authentication and authorization
- Product catalog with categories and filters
- Shopping cart and checkout process
- Payment integration with Stripe
- Order management and tracking
- Admin dashboard for product and order management
- Responsive design for all devices

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Payment**: Stripe
- **Deployment**: Vercel

## Challenges and Solutions

One of the main challenges was implementing a real-time shopping cart that persists across sessions. I solved this by using a combination of local storage and database synchronization when users log in.

Another challenge was optimizing the product catalog for performance with a large number of products. I implemented server-side pagination, image optimization, and efficient database queries to ensure fast loading times.

## Results

The platform has been successfully deployed and is currently handling hundreds of transactions daily. The client reported a 35% increase in conversion rate compared to their previous solution.
    `,
    image: "/placeholder.svg?height=600&width=800",
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/username/e-commerce-platform",
    technologies: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Stripe"],
    featured: true,
    publishedAt: new Date("2023-01-15"),
    createdAt: new Date("2022-10-10"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    _id: "project2",
    title: "Task Management App",
    slug: "task-management-app",
    description: "A collaborative task management application with real-time updates and team features.",
    content: `
# Task Management App

A collaborative task management application designed for teams to organize and track their work efficiently.

## Features

- User authentication and team management
- Project and task creation with deadlines
- Task assignments and priority levels
- Real-time updates using WebSockets
- File attachments and comments
- Kanban board and list views
- Email notifications for task updates
- Dark and light theme support

## Technologies Used

- **Frontend**: React, Redux, Material-UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-time**: Socket.io
- **File Storage**: AWS S3
- **Deployment**: AWS EC2

## Challenges and Solutions

Implementing real-time updates across multiple clients was challenging. I used Socket.io to create a robust real-time system that ensures all team members see the latest changes instantly.

Another challenge was designing an intuitive UI that works well for both simple personal tasks and complex team projects. I solved this by creating a flexible interface that adapts to the complexity of the project.

## Results

The application is now used by over 20 teams with 200+ active users. Teams report saving an average of 5 hours per week on task coordination and status updates.
    `,
    image: "/placeholder.svg?height=600&width=800",
    demoUrl: "https://example.com/task-app",
    githubUrl: "https://github.com/username/task-management",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "AWS"],
    featured: true,
    publishedAt: new Date("2023-02-20"),
    createdAt: new Date("2022-11-15"),
    updatedAt: new Date("2023-02-20"),
  },
  {
    _id: "project3",
    title: "AI Content Generator",
    slug: "ai-content-generator",
    description: "An AI-powered content generation tool that helps create blog posts, social media content, and more.",
    content: `
# AI Content Generator

An AI-powered content generation tool that helps creators and marketers produce high-quality content quickly.

## Features

- Blog post generation with customizable tone and style
- Social media post creation for multiple platforms
- Email newsletter content generation
- SEO optimization suggestions
- Content editing and refinement tools
- Content calendar and scheduling
- Analytics to track content performance

## Technologies Used

- **Frontend**: Next.js, Chakra UI
- **Backend**: Python, FastAPI
- **AI**: OpenAI GPT-4, Hugging Face Transformers
- **Database**: PostgreSQL
- **Deployment**: Vercel (frontend), Google Cloud Run (backend)

## Challenges and Solutions

The main challenge was ensuring the AI-generated content was high-quality and matched the user's brand voice. I implemented a fine-tuning system that learns from user edits and preferences to improve future content generation.

Another challenge was handling the API costs and rate limits of the AI services. I created an efficient caching system and implemented a queue for processing requests during high traffic periods.

## Results

The tool has helped content creators reduce their content production time by up to 70%. Users report that the quality of AI-generated content has exceeded their expectations, with minimal editing required.
    `,
    image: "/placeholder.svg?height=600&width=800",
    demoUrl: "https://example.com/ai-content",
    githubUrl: "https://github.com/username/ai-content-generator",
    technologies: ["Next.js", "Python", "FastAPI", "OpenAI", "PostgreSQL"],
    featured: true,
    publishedAt: new Date("2023-03-10"),
    createdAt: new Date("2022-12-05"),
    updatedAt: new Date("2023-03-10"),
  },
  {
    _id: "project4",
    title: "Finance Dashboard",
    slug: "finance-dashboard",
    description: "A comprehensive financial dashboard for tracking investments, expenses, and financial goals.",
    content: `
# Finance Dashboard

A comprehensive financial dashboard that helps users track their investments, expenses, and financial goals in one place.

## Features

- Account aggregation from multiple financial institutions
- Investment portfolio tracking and analysis
- Expense categorization and budgeting
- Financial goal setting and progress tracking
- Interactive charts and visualizations
- Monthly and yearly financial reports
- Secure data encryption and privacy controls

## Technologies Used

- **Frontend**: React, D3.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, OAuth
- **Financial Data**: Plaid API, Yahoo Finance API
- **Deployment**: Digital Ocean

## Challenges and Solutions

Securely connecting to multiple financial institutions was a significant challenge. I used the Plaid API and implemented robust error handling to ensure reliable connections and data synchronization.

Creating meaningful visualizations for complex financial data was another challenge. I used D3.js to build custom interactive charts that help users understand their financial situation at a glance.

## Results

Users report that the dashboard has helped them save an average of 15% more money by providing clear visibility into their spending habits and investment performance. The application now has over 5,000 active users.
    `,
    image: "/placeholder.svg?height=600&width=800",
    demoUrl: "https://example.com/finance",
    githubUrl: "https://github.com/username/finance-dashboard",
    technologies: ["React", "Node.js", "D3.js", "MongoDB", "Plaid API"],
    featured: false,
    publishedAt: new Date("2023-04-05"),
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-04-05"),
  },
  {
    _id: "project5",
    title: "Health & Fitness Tracker",
    slug: "health-fitness-tracker",
    description: "A mobile-first application for tracking workouts, nutrition, and health metrics.",
    content: `
# Health & Fitness Tracker

A comprehensive health and fitness tracking application designed to help users achieve their wellness goals.

## Features

- Workout tracking with custom routines
- Nutrition logging and meal planning
- Weight and body measurement tracking
- Sleep and water intake monitoring
- Integration with fitness wearables
- Progress visualization and reports
- Community challenges and social sharing
- Personalized recommendations

## Technologies Used

- **Frontend**: React Native
- **Backend**: Firebase
- **Database**: Firestore
- **Authentication**: Firebase Auth
- **Analytics**: Firebase Analytics
- **Wearable Integration**: Google Fit API, Apple HealthKit
- **Deployment**: App Store, Google Play Store

## Challenges and Solutions

Creating a seamless experience across different devices and wearables was challenging. I implemented a flexible data synchronization system that works with various APIs and handles offline usage.

Designing an intuitive interface for logging complex data like workouts and nutrition was another challenge. I conducted extensive user testing to refine the UX and create a frictionless logging experience.

## Results

The app has been downloaded over 10,000 times with a 4.7-star average rating. Users report an average of 30% better adherence to their fitness routines when using the app consistently.
    `,
    image: "/placeholder.svg?height=600&width=800",
    demoUrl: "https://example.com/fitness",
    githubUrl: "https://github.com/username/fitness-tracker",
    technologies: ["React Native", "Firebase", "Firestore", "Google Fit API", "Apple HealthKit"],
    featured: false,
    publishedAt: new Date("2023-05-15"),
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-05-15"),
  },
]

export const fallbackTestimonials = [
  {
    _id: "testimonial1",
    name: "Sarah Johnson",
    position: "CTO at TechStart",
    company: "TechStart",
    content:
      "Working with Abhishek was a game-changer for our company. His expertise in React and Next.js helped us rebuild our platform in record time. The performance improvements were significant, and our users have noticed the difference. I highly recommend Abhishek for any web development project.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
    featured: true,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    _id: "testimonial2",
    name: "Michael Chen",
    position: "Founder",
    company: "DataViz Solutions",
    content:
      "Abhishek delivered an exceptional dashboard for our analytics platform. His attention to detail and ability to translate complex requirements into an intuitive interface exceeded our expectations. The project was delivered on time and within budget. We're already planning our next project with him.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
    featured: true,
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15"),
  },
  {
    _id: "testimonial3",
    name: "Emily Rodriguez",
    position: "Marketing Director",
    company: "GrowthHub",
    content:
      "Our website redesign project with Abhishek was a fantastic experience. He took the time to understand our brand and created a modern, responsive design that perfectly represents our company. The site loads incredibly fast and has significantly improved our conversion rates. Abhishek is a true professional.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
    featured: true,
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-03-20"),
  },
  {
    _id: "testimonial4",
    name: "David Park",
    position: "Product Manager",
    company: "InnovateTech",
    content:
      "Abhishek helped us implement a complex authentication system for our SaaS platform. His knowledge of security best practices and attention to detail ensured that our user data remains protected. The documentation he provided was thorough and made it easy for our team to maintain the system.",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
    featured: false,
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-04-05"),
  },
  {
    _id: "testimonial5",
    name: "Olivia Thompson",
    position: "E-commerce Manager",
    company: "StyleShop",
    content:
      "Our e-commerce platform needed a complete overhaul, and Abhishek delivered beyond our expectations. The new site is not only visually stunning but also performs exceptionally well. Our page load times decreased by 60%, and our mobile conversion rate has doubled. Abhishek was communicative throughout the project and a pleasure to work with.",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
    featured: false,
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-05-12"),
  },
]

export const fallbackWorkExperience = [
  {
    _id: "exp1",
    title: "Senior Frontend Developer",
    company: "TechInnovate Solutions",
    location: "San Francisco, CA",
    startDate: new Date("2021-06-01"),
    endDate: null,
    current: true,
    description: `
- Led the development of a React-based dashboard that improved client data visualization, resulting in a 40% increase in user engagement
- Implemented performance optimizations that reduced page load times by 60%
- Mentored junior developers and conducted code reviews to ensure high-quality standards
- Collaborated with design and product teams to create intuitive user interfaces
- Introduced TypeScript to the codebase, reducing bugs by 25%
    `,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    type: "work",
    order: 1,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    _id: "exp2",
    title: "Frontend Developer",
    company: "WebSphere Digital",
    location: "New York, NY",
    startDate: new Date("2019-03-15"),
    endDate: new Date("2021-05-30"),
    current: false,
    description: `
- Developed responsive web applications using React and Redux
- Built and maintained reusable component libraries that improved development efficiency by 30%
- Implemented automated testing with Jest and React Testing Library, achieving 80% code coverage
- Collaborated with backend developers to integrate RESTful APIs
- Participated in agile development processes, including daily stand-ups and sprint planning
    `,
    technologies: ["React", "Redux", "JavaScript", "SASS", "Jest"],
    type: "work",
    order: 2,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    _id: "exp3",
    title: "Web Developer",
    company: "CreativeTech Agency",
    location: "Chicago, IL",
    startDate: new Date("2017-07-01"),
    endDate: new Date("2019-02-28"),
    current: false,
    description: `
- Developed and maintained client websites using HTML, CSS, and JavaScript
- Created responsive designs that worked across desktop, tablet, and mobile devices
- Implemented WordPress themes and plugins for content management
- Optimized website performance and SEO
- Collaborated with designers to implement pixel-perfect interfaces
    `,
    technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
    type: "work",
    order: 3,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
]

export const fallbackEducation = [
  {
    _id: "edu1",
    institution: "Stanford University",
    degree: "Master of Science",
    field: "Computer Science",
    location: "Stanford, CA",
    startDate: new Date("2015-09-01"),
    endDate: new Date("2017-06-30"),
    current: false,
    description: `
- Specialized in Human-Computer Interaction and Web Technologies
- Thesis: "Improving User Experience in Progressive Web Applications"
- GPA: 3.8/4.0
- Teaching Assistant for Web Development and User Interface Design courses
- Member of the Computer Science Graduate Student Association
    `,
    type: "education",
    order: 1,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    _id: "edu2",
    institution: "University of Illinois at Urbana-Champaign",
    degree: "Bachelor of Science",
    field: "Computer Engineering",
    location: "Urbana, IL",
    startDate: new Date("2011-08-15"),
    endDate: new Date("2015-05-30"),
    current: false,
    description: `
- Minor in Mathematics
- Dean's List: 7 semesters
- Senior Project: Developed a real-time collaborative coding platform
- Member of the Association for Computing Machinery (ACM)
- Participated in multiple hackathons, winning 2nd place in the 2014 HackIllinois
    `,
    type: "education",
    order: 2,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
]

export const fallbackExperiences = {
  work: fallbackWorkExperience,
  education: fallbackEducation,
}

export const fallbackFiles = [
  {
    _id: "file1",
    name: "resume.pdf",
    url: "/placeholder.svg?height=800&width=600",
    type: "application/pdf",
    size: 1024000,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    _id: "file2",
    name: "profile-photo.jpg",
    url: "/placeholder.svg?height=400&width=400",
    type: "image/jpeg",
    size: 512000,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
  {
    _id: "file3",
    name: "portfolio-presentation.pptx",
    url: "/placeholder.svg?height=600&width=800",
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    size: 2048000,
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-10"),
  },
]
