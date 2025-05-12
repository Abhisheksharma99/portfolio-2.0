"use client"

// Fallback data for when the database is not available

export const fallbackBlogs = [
  {
    _id: "fallback-blog-1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    excerpt: "Learn how to build modern web applications with Next.js, the React framework for production.",
    content:
      "<p>Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.</p><h2>Why Next.js?</h2><p>Next.js provides a solution to many common web development challenges, including:</p><ul><li>Server-side rendering</li><li>Static site generation</li><li>Automatic code splitting</li><li>Client-side routing</li><li>API routes</li><li>Built-in CSS and Sass support</li></ul><p>Getting started with Next.js is easy. Just run <code>npx create-next-app</code> and you're good to go!</p>",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript"],
    author: "Abhishek Sharma",
    date: "May 15, 2023",
    readTime: "5 min read",
    isPublished: true,
    featured: true,
    createdAt: "2023-05-15T10:00:00.000Z",
    updatedAt: "2023-05-15T10:00:00.000Z",
    seo: {
      metaTitle: "Getting Started with Next.js - A Comprehensive Guide",
      metaDescription: "Learn how to build modern web applications with Next.js, the React framework for production.",
      keywords: ["Next.js", "React", "JavaScript", "Web Development"],
      canonicalUrl: "",
    },
  },
  {
    _id: "fallback-blog-2",
    title: "Mastering TypeScript for React Development",
    slug: "mastering-typescript-for-react-development",
    excerpt:
      "Discover how TypeScript can improve your React development experience with static typing and better tooling.",
    content:
      "<p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. When used with React, it provides an excellent developer experience with features like type checking, autocompletion, and inline documentation.</p><h2>Benefits of TypeScript with React</h2><p>Using TypeScript with React offers several advantages:</p><ul><li>Catch errors during development instead of runtime</li><li>Better IDE support with autocompletion</li><li>Easier refactoring</li><li>Self-documenting code</li><li>Improved team collaboration</li></ul><p>To get started with TypeScript in your React project, you can use Create React App with the TypeScript template: <code>npx create-react-app my-app --template typescript</code></p>",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Development",
    tags: ["TypeScript", "React", "JavaScript"],
    author: "Abhishek Sharma",
    date: "June 10, 2023",
    readTime: "7 min read",
    isPublished: true,
    featured: true,
    createdAt: "2023-06-10T10:00:00.000Z",
    updatedAt: "2023-06-10T10:00:00.000Z",
    seo: {
      metaTitle: "Mastering TypeScript for React Development - A Complete Guide",
      metaDescription:
        "Discover how TypeScript can improve your React development experience with static typing and better tooling.",
      keywords: ["TypeScript", "React", "JavaScript", "Web Development"],
      canonicalUrl: "",
    },
  },
  {
    _id: "fallback-blog-3",
    title: "Building Responsive UIs with Tailwind CSS",
    slug: "building-responsive-uis-with-tailwind-css",
    excerpt:
      "Learn how to create beautiful, responsive user interfaces quickly with Tailwind CSS utility-first approach.",
    content:
      "<p>Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. It's designed to be highly customizable and provides low-level utility classes that let you build completely custom designs.</p><h2>Why Choose Tailwind CSS?</h2><p>Tailwind offers several advantages over traditional CSS frameworks:</p><ul><li>No pre-designed components, giving you complete design freedom</li><li>Responsive design utilities built-in</li><li>Dark mode support</li><li>Highly customizable through configuration</li><li>Optimized production builds with PurgeCSS</li></ul><p>To get started with Tailwind CSS, install it via npm: <code>npm install tailwindcss</code> and initialize it with <code>npx tailwindcss init</code></p>",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Design",
    tags: ["Tailwind CSS", "CSS", "Responsive Design"],
    author: "Abhishek Sharma",
    date: "July 5, 2023",
    readTime: "6 min read",
    isPublished: true,
    featured: false,
    createdAt: "2023-07-05T10:00:00.000Z",
    updatedAt: "2023-07-05T10:00:00.000Z",
    seo: {
      metaTitle: "Building Responsive UIs with Tailwind CSS - A Developer's Guide",
      metaDescription:
        "Learn how to create beautiful, responsive user interfaces quickly with Tailwind CSS utility-first approach.",
      keywords: ["Tailwind CSS", "CSS", "Responsive Design", "Web Development"],
      canonicalUrl: "",
    },
  },
  {
    _id: "fallback-blog-4",
    title: "Introduction to Server Components in React",
    slug: "introduction-to-server-components-in-react",
    excerpt: "Explore the new Server Components feature in React and how it can improve your application performance.",
    content:
      "<p>React Server Components represent a new paradigm for building React applications. They allow developers to build applications that span the server and client, combining the rich interactivity of client-side apps with the improved performance of traditional server rendering.</p><h2>Key Benefits of Server Components</h2><p>Server Components offer several advantages:</p><ul><li>Zero bundle size impact for server components</li><li>Access to the server ecosystem (databases, file systems, etc.)</li><li>Automatic code splitting</li><li>No client-server waterfalls</li><li>Improved loading performance</li></ul><p>Server Components are still in development, but you can try them out in Next.js 13+ by using the App Router and creating server components by default.</p>",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Development",
    tags: ["React", "Server Components", "Performance"],
    author: "Abhishek Sharma",
    date: "August 20, 2023",
    readTime: "8 min read",
    isPublished: true,
    featured: true,
    createdAt: "2023-08-20T10:00:00.000Z",
    updatedAt: "2023-08-20T10:00:00.000Z",
    seo: {
      metaTitle: "Introduction to Server Components in React - The Future of React",
      metaDescription:
        "Explore the new Server Components feature in React and how it can improve your application performance.",
      keywords: ["React", "Server Components", "Performance", "Web Development"],
      canonicalUrl: "",
    },
  },
  {
    _id: "fallback-blog-5",
    title: "Creating Animations with Framer Motion",
    slug: "creating-animations-with-framer-motion",
    excerpt: "Learn how to add beautiful animations to your React applications using Framer Motion.",
    content:
      "<p>Framer Motion is a production-ready motion library for React that makes it easy to create stunning animations and interactive user interfaces. It provides a simple declarative syntax that makes complex animations and gestures easy to implement.</p><h2>Getting Started with Framer Motion</h2><p>Here's how to get started with basic animations:</p><pre><code>import { motion } from 'framer-motion';\n\nfunction AnimatedBox() {\n  return (\n    &lt;motion.div\n      initial={{ opacity: 0 }}\n      animate={{ opacity: 1 }}\n      transition={{ duration: 1 }}\n    &gt;\n      Hello Framer Motion!\n    &lt;/motion.div&gt;\n  );\n}</code></pre><p>Framer Motion supports gestures, variants for orchestrating animations, and layout animations for smooth transitions when elements change position or size.</p>",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Design",
    tags: ["Animation", "React", "Framer Motion"],
    author: "Abhishek Sharma",
    date: "September 15, 2023",
    readTime: "6 min read",
    isPublished: true,
    featured: false,
    createdAt: "2023-09-15T10:00:00.000Z",
    updatedAt: "2023-09-15T10:00:00.000Z",
    seo: {
      metaTitle: "Creating Animations with Framer Motion - A Complete Guide",
      metaDescription: "Learn how to add beautiful animations to your React applications using Framer Motion.",
      keywords: ["Animation", "React", "Framer Motion", "Web Development"],
      canonicalUrl: "",
    },
  },
]

export const fallbackProjects = [
  {
    _id: "fallback-project-1",
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js, TypeScript, and Tailwind CSS. Includes product catalog, shopping cart, user authentication, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Development",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    demoUrl: "https://example.com/demo",
    sourceUrl: "https://github.com/username/e-commerce-platform",
    featured: true,
    createdAt: "2023-01-15T10:00:00.000Z",
    updatedAt: "2023-01-15T10:00:00.000Z",
  },
  {
    _id: "fallback-project-2",
    title: "Task Management App",
    description:
      "A productivity application for managing tasks and projects. Features include drag-and-drop task organization, priority levels, due dates, and team collaboration.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Application",
    tags: ["React", "Redux", "Firebase", "Material UI"],
    demoUrl: "https://example.com/demo",
    sourceUrl: "https://github.com/username/task-management-app",
    featured: true,
    createdAt: "2023-02-20T10:00:00.000Z",
    updatedAt: "2023-02-20T10:00:00.000Z",
  },
  {
    _id: "fallback-project-3",
    title: "Portfolio Website",
    description:
      "A modern portfolio website with dark mode, animations, and responsive design. Built with Next.js and Tailwind CSS.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Design",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://example.com/demo",
    sourceUrl: "https://github.com/username/portfolio-website",
    featured: true,
    createdAt: "2023-03-10T10:00:00.000Z",
    updatedAt: "2023-03-10T10:00:00.000Z",
  },
  {
    _id: "fallback-project-4",
    title: "Weather Dashboard",
    description:
      "A weather application that displays current conditions and forecasts for any location. Features include interactive maps, hourly forecasts, and severe weather alerts.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Application",
    tags: ["React", "OpenWeather API", "Leaflet Maps"],
    demoUrl: "https://example.com/demo",
    sourceUrl: "https://github.com/username/weather-dashboard",
    featured: false,
    createdAt: "2023-04-05T10:00:00.000Z",
    updatedAt: "2023-04-05T10:00:00.000Z",
  },
  {
    _id: "fallback-project-5",
    title: "Blog Platform",
    description:
      "A full-featured blog platform with markdown support, categories, tags, and a commenting system. Built with Next.js and MongoDB.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Development",
    tags: ["Next.js", "MongoDB", "Markdown"],
    demoUrl: "https://example.com/demo",
    sourceUrl: "https://github.com/username/blog-platform",
    featured: true,
    createdAt: "2023-05-15T10:00:00.000Z",
    updatedAt: "2023-05-15T10:00:00.000Z",
  },
  {
    _id: "fallback-project-6",
    title: "Recipe Finder",
    description:
      "A recipe search application that allows users to find recipes based on ingredients, dietary restrictions, and cuisine types.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Web Application",
    tags: ["React", "Spoonacular API", "Styled Components"],
    demoUrl: "https://example.com/demo",
    sourceUrl: "https://github.com/username/recipe-finder",
    featured: false,
    createdAt: "2023-06-20T10:00:00.000Z",
    updatedAt: "2023-06-20T10:00:00.000Z",
  },
]

export const fallbackTestimonials = [
  {
    _id: "fallback-testimonial-1",
    name: "John Smith",
    position: "CTO at TechCorp",
    company: "TechCorp",
    content:
      "Abhishek is an exceptional developer who delivered our project on time and exceeded our expectations. His attention to detail and problem-solving skills are impressive.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
    featured: true,
    createdAt: "2023-01-10T10:00:00.000Z",
    updatedAt: "2023-01-10T10:00:00.000Z",
  },
  {
    _id: "fallback-testimonial-2",
    name: "Sarah Johnson",
    position: "Product Manager",
    company: "InnovateX",
    content:
      "Working with Abhishek was a pleasure. He understood our requirements quickly and suggested improvements that made our product even better. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
    featured: true,
    createdAt: "2023-02-15T10:00:00.000Z",
    updatedAt: "2023-02-15T10:00:00.000Z",
  },
  {
    _id: "fallback-testimonial-3",
    name: "Michael Chen",
    position: "Founder",
    company: "StartupHub",
    content:
      "Abhishek helped us build our MVP in record time. His technical expertise and communication skills made the development process smooth and efficient.",
    rating: 4,
    image: "/placeholder.svg?height=100&width=100",
    featured: true,
    createdAt: "2023-03-20T10:00:00.000Z",
    updatedAt: "2023-03-20T10:00:00.000Z",
  },
]

// Export work experience and education separately as required
export const fallbackWorkExperience = [
  {
    _id: "fallback-work-1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    period: "2021 - Present",
    description:
      "Leading the frontend development team in building modern web applications using React, Next.js, and TypeScript. Implementing responsive designs, optimizing performance, and ensuring accessibility compliance.",
    type: "work",
    createdAt: "2023-01-01T10:00:00.000Z",
    updatedAt: "2023-01-01T10:00:00.000Z",
  },
  {
    _id: "fallback-work-2",
    title: "Frontend Developer",
    company: "InnovateX",
    location: "New York, NY",
    period: "2019 - 2021",
    description:
      "Developed and maintained multiple client-facing web applications. Collaborated with designers and backend developers to implement new features and improve user experience.",
    type: "work",
    createdAt: "2023-01-01T10:00:00.000Z",
    updatedAt: "2023-01-01T10:00:00.000Z",
  },
  {
    _id: "fallback-work-3",
    title: "Web Developer",
    company: "DigitalSolutions",
    location: "Boston, MA",
    period: "2017 - 2019",
    description:
      "Built responsive websites and web applications for various clients. Implemented frontend designs using HTML, CSS, and JavaScript. Worked with PHP and MySQL for backend functionality.",
    type: "work",
    createdAt: "2023-01-01T10:00:00.000Z",
    updatedAt: "2023-01-01T10:00:00.000Z",
  },
]

export const fallbackEducation = [
  {
    _id: "fallback-education-1",
    institution: "Massachusetts Institute of Technology",
    degree: "Master of Science in Computer Science",
    field: "Computer Science",
    location: "Cambridge, MA",
    period: "2015 - 2017",
    description:
      "Specialized in Human-Computer Interaction and Web Technologies. Completed thesis on improving web accessibility for users with disabilities.",
    type: "education",
    createdAt: "2023-01-01T10:00:00.000Z",
    updatedAt: "2023-01-01T10:00:00.000Z",
  },
  {
    _id: "fallback-education-2",
    institution: "University of California, Berkeley",
    degree: "Bachelor of Science in Computer Science",
    field: "Computer Science",
    location: "Berkeley, CA",
    period: "2011 - 2015",
    description:
      "Focused on software engineering and web development. Participated in multiple hackathons and coding competitions.",
    type: "education",
    createdAt: "2023-01-01T10:00:00.000Z",
    updatedAt: "2023-01-01T10:00:00.000Z",
  },
]

export const fallbackFiles = [
  {
    _id: "fallback-file-1",
    name: "resume.pdf",
    url: "/placeholder.svg?height=800&width=600",
    type: "application/pdf",
    size: 1024000,
    createdAt: "2023-01-01T10:00:00.000Z",
    updatedAt: "2023-01-01T10:00:00.000Z",
  },
  {
    _id: "fallback-file-2",
    name: "profile-picture.jpg",
    url: "/placeholder.svg?height=400&width=400",
    type: "image/jpeg",
    size: 512000,
    createdAt: "2023-01-01T10:00:00.000Z",
    updatedAt: "2023-01-01T10:00:00.000Z",
  },
]

// For backward compatibility
export const fallbackExperiences = {
  work: fallbackWorkExperience,
  education: fallbackEducation,
}
