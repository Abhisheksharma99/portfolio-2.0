export const fallbackBlogs = [
  {
    _id: "blog1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    excerpt: "Learn how to build modern web applications with Next.js, the React framework for production.",
    content: `
      <h2>Introduction to Next.js</h2>
      <p>Next.js is a React framework that enables functionality such as server-side rendering, static site generation, and API routes. It's designed to make building React applications easier and more efficient.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Server-side rendering</li>
        <li>Static site generation</li>
        <li>API routes</li>
        <li>File-based routing</li>
        <li>Built-in CSS and Sass support</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To create a new Next.js app, run the following command:</p>
      <pre><code>npx create-next-app@latest my-next-app</code></pre>
      
      <p>This will set up a new Next.js project with all the necessary configurations.</p>
      
      <h2>Conclusion</h2>
      <p>Next.js provides an excellent developer experience with all the features you need for production. It's a great choice for building modern web applications.</p>
    `,
    author: "Abhishek Sharma",
    publishedAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
    isPublished: true,
    tags: ["Next.js", "React", "Web Development"],
    category: "Web Development",
    image: "/placeholder.svg?height=400&width=600",
    readTime: "5 min read",
  },
  {
    _id: "blog2",
    title: "Mastering TypeScript for React Development",
    slug: "mastering-typescript-for-react-development",
    excerpt:
      "Discover how TypeScript can improve your React development workflow and help catch errors before they happen.",
    content: `
      <h2>Why TypeScript with React?</h2>
      <p>TypeScript adds static type checking to JavaScript, which can help catch errors during development rather than at runtime. This is especially valuable in React applications where props and state management can get complex.</p>
      
      <h2>Setting Up TypeScript with React</h2>
      <p>You can create a new React project with TypeScript using:</p>
      <pre><code>npx create-react-app my-app --template typescript</code></pre>
      
      <p>Or with Next.js:</p>
      <pre><code>npx create-next-app@latest --ts my-next-app</code></pre>
      
      <h2>Type Checking Props</h2>
      <p>One of the biggest benefits of TypeScript is type checking for component props:</p>
      <pre><code>
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary'
}) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
      </code></pre>
      
      <h2>Conclusion</h2>
      <p>TypeScript can significantly improve your React development experience byy catching errors early and providing better tooling support.</p>
    `,
    author: "Abhishek Sharma",
    publishedAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-02-20"),
    isPublished: true,
    tags: ["TypeScript", "React", "JavaScript"],
    category: "Web Development",
    image: "/placeholder.svg?height=400&width=600",
    readTime: "7 min read",
  },
  {
    _id: "blog3",
    title: "Building Responsive UIs with Tailwind CSS",
    slug: "building-responsive-uis-with-tailwind-css",
    excerpt: "Learn how to create beautiful, responsive user interfaces quickly using Tailwind CSS utility classes.",
    content: `
      <h2>Introduction to Tailwind CSS</h2>
      <p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. Unlike other CSS frameworks that provide pre-designed components, Tailwind gives you low-level utility classes that let you build completely custom designs.</p>
      
      <h2>Getting Started with Tailwind</h2>
      <p>To add Tailwind CSS to your project:</p>
      <pre><code>npm install -D tailwindcss
npx tailwindcss init</code></pre>
      
      <h2>Responsive Design with Tailwind</h2>
      <p>Tailwind makes responsive design simple with built-in breakpoint prefixes:</p>
      <pre><code>&lt;div class="w-full md:w-1/2 lg:w-1/3"&gt;
  This div is full width on mobile, half width on medium screens,
  and one-third width on large screens.
&lt;/div&gt;</code></pre>
      
      <h2>Dark Mode</h2>
      <p>Implementing dark mode is straightforward with Tailwind:</p>
      <pre><code>&lt;div class="bg-white dark:bg-gray-800 text-black dark:text-white"&gt;
  This content adapts to light and dark modes.
&lt;/div&gt;</code></pre>
      
      <h2>Conclusion</h2>
      <p>Tailwind CSS provides a powerful approach to styling that can speed up your development workflow while giving you complete control over your designs.</p>
    `,
    author: "Abhishek Sharma",
    publishedAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-03-10"),
    isPublished: true,
    tags: ["CSS", "Tailwind CSS", "Responsive Design"],
    category: "Web Design",
    image: "/placeholder.svg?height=400&width=600",
    readTime: "6 min read",
  },
  {
    _id: "blog4",
    title: "Introduction to Server Components in React",
    slug: "introduction-to-server-components-in-react",
    excerpt:
      "Explore the new Server Components feature in React and how it can improve your application's performance.",
    content: `
      <h2>What Are React Server Components?</h2>
      <p>React Server Components are a new feature that allows components to render on the server, reducing the JavaScript sent to the client and improving performance.</p>
      
      <h2>Benefits of Server Components</h2>
      <ul>
        <li>Reduced bundle size</li>
        <li>Improved initial page load</li>
        <li>Better SEO</li>
        <li>Direct access to server-only resources</li>
      </ul>
      
      <h2>Using Server Components in Next.js</h2>
      <p>Next.js 13+ has built-in support for React Server Components. By default, all components in the app directory are Server Components unless specified otherwise:</p>
      
      <pre><code>// This is a Server Component by default
export default function ProductPage({ params }) {
  // This code runs on the server
  const product = await getProduct(params.id);
  
  return (
    &lt;div&gt;
      &lt;h1&gt;{product.name}&lt;/h1&gt;
      &lt;p&gt;{product.description}&lt;/p&gt;
      &lt;ClientComponent product={product} /&gt;
    &lt;/div&gt;
  );
}

// This is explicitly a Client Component
'use client';

import { useState } from "react"

function ClientComponent({ product }) {
  // This code runs on the client
  const [quantity, setQuantity] = useState(1);
  
  return (
    &lt;div&gt;
      &lt;button onClick={() => setQuantity(q => q + 1)}&gt;
        Add to Cart ({quantity})
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>Server Components represent a significant evolution in React's architecture, allowing developers to build applications that better leverage both server and client capabilities.</p>
    `,
    author: "Abhishek Sharma",
    publishedAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-04-05"),
    isPublished: true,
    tags: ["React", "Server Components", "Next.js"],
    category: "Web Development",
    image: "/placeholder.svg?height=400&width=600",
    readTime: "8 min read",
  },
  {
    _id: "blog5",
    title: "Creating Animations with Framer Motion",
    slug: "creating-animations-with-framer-motion",
    excerpt: "Learn how to add beautiful animations to your React applications using Framer Motion.",
    content: `
      <h2>Introduction to Framer Motion</h2>
      <p>Framer Motion is a production-ready motion library for React that makes it easy to create animations and interactive UIs.</p>
      
      <h2>Getting Started</h2>
      <p>Install Framer Motion in your React project:</p>
      <pre><code>npm install framer-motion</code></pre>
      
      <h2>Basic Animations</h2>
      <p>Creating a simple animation with Framer Motion is straightforward:</p>
      <pre><code>import { motion } from 'framer-motion';

function AnimatedBox() {
  return (
    &lt;motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="box"
    /&gt;
  );
}</code></pre>
      
      <h2>Page Transitions</h2>
      <p>You can create smooth page transitions using Framer Motion's AnimatePresence:</p>
      <pre><code>import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

function Layout({ children }) {
  const router = useRouter();
  
  return (
    &lt;AnimatePresence mode="wait"&gt;
      &lt;motion.div
        key={router.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      &gt;
        {children}
      &lt;/motion.div&gt;
    &lt;/AnimatePresence&gt;
  );
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>Framer Motion provides a powerful yet simple API for creating animations in React applications, helping you build more engaging user experiences.</p>
    `,
    author: "Abhishek Sharma",
    publishedAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-05-12"),
    isPublished: true,
    tags: ["React", "Animation", "Framer Motion"],
    category: "Web Design",
    image: "/placeholder.svg?height=400&width=600",
    readTime: "6 min read",
  },
]

export const fallbackProjects = [
  {
    _id: "project1",
    title: "E-commerce Platform",
    slug: "e-commerce-platform",
    description: "A full-featured e-commerce platform built with Next.js, MongoDB, and Stripe integration.",
    content:
      "This project is a complete e-commerce solution with product management, cart functionality, user authentication, and payment processing using Stripe.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/username/e-commerce-platform",
    demoUrl: "https://e-commerce-platform.vercel.app",
    featured: true,
    order: 1,
  },
  {
    _id: "project2",
    title: "Task Management App",
    slug: "task-management-app",
    description: "A collaborative task management application with real-time updates and team features.",
    content:
      "This task management app allows teams to collaborate on projects, assign tasks, track progress, and receive real-time updates when changes are made.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "Firebase", "Material UI", "Redux"],
    githubUrl: "https://github.com/username/task-management-app",
    demoUrl: "https://task-management-app.vercel.app",
    featured: true,
    order: 2,
  },
  {
    _id: "project3",
    title: "AI Image Generator",
    slug: "ai-image-generator",
    description: "An application that generates unique images based on text prompts using AI.",
    content:
      "This project uses OpenAI's DALL-E API to generate images from text descriptions. Users can create, save, and share their generated images.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "OpenAI API", "Cloudinary", "Tailwind CSS"],
    githubUrl: "https://github.com/username/ai-image-generator",
    demoUrl: "https://ai-image-generator.vercel.app",
    featured: true,
    order: 3,
  },
  {
    _id: "project4",
    title: "Personal Finance Dashboard",
    slug: "personal-finance-dashboard",
    description: "A dashboard for tracking personal finances, expenses, and investments.",
    content:
      "This application helps users track their income, expenses, investments, and financial goals with interactive charts and reports.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/username/finance-dashboard",
    demoUrl: "https://finance-dashboard.vercel.app",
    featured: false,
    order: 4,
  },
  {
    _id: "project5",
    title: "Weather Forecast App",
    slug: "weather-forecast-app",
    description: "A weather application that provides current conditions and forecasts for any location.",
    content:
      "This weather app uses the OpenWeatherMap API to display current weather conditions and 7-day forecasts for any location worldwide.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React Native", "Expo", "OpenWeatherMap API"],
    githubUrl: "https://github.com/username/weather-app",
    demoUrl: "https://weather-app.vercel.app",
    featured: false,
    order: 5,
  },
]

export const fallbackTestimonials = [
  {
    _id: "testimonial1",
    name: "John Smith",
    position: "CTO at TechCorp",
    content:
      "Working with Abhishek was a fantastic experience. His technical skills and attention to detail resulted in a product that exceeded our expectations.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
    featured: true,
    order: 1,
  },
  {
    _id: "testimonial2",
    name: "Sarah Johnson",
    position: "Founder of StartupX",
    content:
      "Abhishek delivered our project on time and on budget. His communication was excellent throughout the process, and he was always willing to go the extra mile.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
    featured: true,
    order: 2,
  },
  {
    _id: "testimonial3",
    name: "Michael Chen",
    position: "Product Manager at InnovateCo",
    content:
      "I was impressed by Abhishek's ability to understand our business needs and translate them into technical solutions. He's not just a developer but a true problem solver.",
    rating: 4,
    image: "/placeholder.svg?height=100&width=100",
    featured: true,
    order: 3,
  },
]

export const fallbackWorkExperience = [
  {
    _id: "exp1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    startDate: new Date("2021-03-01"),
    endDate: null,
    current: true,
    description:
      "Leading the frontend development team in building modern web applications using React, Next.js, and TypeScript. Implemented CI/CD pipelines and improved performance by 40%.",
    type: "work",
    order: 1,
  },
  {
    _id: "exp2",
    title: "Full Stack Developer",
    company: "InnovateCo",
    location: "New York, NY",
    startDate: new Date("2019-06-01"),
    endDate: new Date("2021-02-28"),
    current: false,
    description:
      "Developed and maintained full-stack applications using React, Node.js, and MongoDB. Collaborated with UX designers to implement responsive designs and improve user experience.",
    type: "work",
    order: 2,
  },
  {
    _id: "exp3",
    title: "Junior Web Developer",
    company: "StartupX",
    location: "Remote",
    startDate: new Date("2018-01-15"),
    endDate: new Date("2019-05-30"),
    current: false,
    description:
      "Built and maintained client websites using HTML, CSS, JavaScript, and WordPress. Worked directly with clients to gather requirements and implement requested features.",
    type: "work",
    order: 3,
  },
]

export const fallbackEducation = [
  {
    _id: "edu1",
    institution: "University of Technology",
    degree: "Master of Science in Computer Science",
    field: "Computer Science",
    location: "San Francisco, CA",
    startDate: new Date("2016-09-01"),
    endDate: new Date("2018-05-30"),
    current: false,
    description:
      "Specialized in web technologies and artificial intelligence. Completed thesis on 'Optimizing React Applications for Performance'.",
    type: "education",
    order: 1,
  },
  {
    _id: "edu2",
    institution: "State University",
    degree: "Bachelor of Science in Software Engineering",
    field: "Software Engineering",
    location: "Chicago, IL",
    startDate: new Date("2012-09-01"),
    endDate: new Date("2016-05-30"),
    current: false,
    description: "Graduated with honors. Participated in multiple hackathons and coding competitions.",
    type: "education",
    order: 2,
  },
]

export const fallbackServices = [
  {
    _id: "service1",
    title: "Web Development",
    description:
      "Custom website and web application development using modern technologies like React, Next.js, and Node.js.",
    icon: "Code",
    order: 1,
  },
  {
    _id: "service2",
    title: "UI/UX Design",
    description:
      "Creating intuitive and visually appealing user interfaces with a focus on user experience and accessibility.",
    icon: "Palette",
    order: 2,
  },
  {
    _id: "service3",
    title: "Mobile App Development",
    description:
      "Building cross-platform mobile applications using React Native and Flutter for iOS and Android devices.",
    icon: "Smartphone",
    order: 3,
  },
  {
    _id: "service4",
    title: "E-commerce Solutions",
    description:
      "Developing online stores with payment integration, inventory management, and customer relationship features.",
    icon: "ShoppingCart",
    order: 4,
  },
]

export const fallbackFiles = [
  {
    _id: "file1",
    name: "resume.pdf",
    url: "/placeholder.svg?height=800&width=600",
    type: "application/pdf",
    size: 1024000,
    uploadedAt: new Date("2023-01-15"),
  },
  {
    _id: "file2",
    name: "portfolio-screenshot.png",
    url: "/placeholder.svg?height=600&width=800",
    type: "image/png",
    size: 2048000,
    uploadedAt: new Date("2023-02-20"),
  },
]

export const fallbackSettings = {
  _id: "settings1",
  siteTitle: "Abhishek Sharma - Portfolio",
  siteDescription: "Personal portfolio and blog of Abhishek Sharma, a full-stack web developer.",
  siteKeywords: "web development, react, next.js, javascript, typescript",
  siteUrl: "https://abhishek-sharma.com",
  siteLogo: "/placeholder.svg?height=200&width=200",
  siteAuthor: "Abhishek Sharma",
  email: "contact@abhishek-sharma.com",
  phone: "+1 (123) 456-7890",
  address: "San Francisco, CA",
  socialLinks: {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://twitter.com/username",
  },
  updatedAt: new Date("2023-05-01"),
}
