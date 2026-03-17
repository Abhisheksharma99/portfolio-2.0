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
    _id: "proj1",
    title: "HRM Platform",
    description:
      "Next-generation HRM platform with AI features — automated candidate screening, smart matching, workflow optimization, and real-time insights to accelerate hiring.",
    image: "/placeholder.svg?height=600&width=800",
    category: "fullstack",
    tags: ["Next.js", "Python", "PostgreSQL", "LangChain", "Node.js"],
    demoUrl: "#",
    sourceUrl: "#",
    featured: true,
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
  },
  {
    _id: "proj2",
    title: "Twitter Data Aggregation Tool",
    description:
      "Real-time Twitter analytics tool with sorting, filtering, CSV export, JWT-based auth, and dynamic visualizations to track Twitter metrics efficiently.",
    image: "/placeholder.svg?height=600&width=800",
    category: "fullstack",
    tags: ["React.js", "Node.js", "MongoDB", "JWT"],
    demoUrl: "#",
    sourceUrl: "#",
    featured: true,
    createdAt: "2023-06-20T10:00:00.000Z",
    updatedAt: "2023-06-20T10:00:00.000Z",
  },
  {
    _id: "proj3",
    title: "YouTube Stats App",
    description:
      "YouTube channel insights app providing likes, dislikes, views, and watch hours with Google OAuth integration for secure API access.",
    image: "/placeholder.svg?height=600&width=800",
    category: "fullstack",
    tags: ["React.js", "Google OAuth", "YouTube API", "Node.js"],
    demoUrl: "#",
    sourceUrl: "#",
    featured: true,
    createdAt: "2023-04-10T10:00:00.000Z",
    updatedAt: "2023-04-10T10:00:00.000Z",
  },
  {
    _id: "proj4",
    title: "SaaS HR & Finance Management Tool",
    description:
      "Full-featured HR and finance SaaS platform with multi-tenancy support, isolated databases, email API service, and seamless company onboarding.",
    image: "/placeholder.svg?height=600&width=800",
    category: "fullstack",
    tags: ["React.js", "Node.js", "MongoDB", "Redis", "GCP"],
    demoUrl: "#",
    sourceUrl: "#",
    featured: true,
    createdAt: "2023-02-20T10:00:00.000Z",
    updatedAt: "2023-02-20T10:00:00.000Z",
  },
  {
    _id: "proj5",
    title: "Conference Platform",
    description:
      "Full-stack conference management platform with OTP authentication, user registration tracking, Excel exports, multi-tenancy, and analytics dashboard.",
    image: "/placeholder.svg?height=600&width=800",
    category: "fullstack",
    tags: ["Next.js", "PostgreSQL", "Node.js", "TanStack Query"],
    demoUrl: "#",
    sourceUrl: "#",
    featured: false,
    createdAt: "2024-06-15T10:00:00.000Z",
    updatedAt: "2024-06-15T10:00:00.000Z",
  },
  {
    _id: "proj6",
    title: "Competitive Intelligence App",
    description:
      "Large-scale CI application migrated from Pug/Express to React + NestJS with 85% improved load speeds, Cerbos RBAC, and CI/CD pipelines.",
    image: "/placeholder.svg?height=600&width=800",
    category: "fullstack",
    tags: ["React.js", "NestJS", "Cerbos", "Docker", "CI/CD"],
    demoUrl: "#",
    sourceUrl: "#",
    featured: false,
    createdAt: "2024-03-10T10:00:00.000Z",
    updatedAt: "2024-03-10T10:00:00.000Z",
  },
]

export const fallbackTestimonials = [
  {
    _id: "test1",
    name: "Rahul Verma",
    position: "Product Manager",
    company: "PharmaEdge.ai",
    content:
      "Abhishek delivered a complete conference platform from scratch in record time. His ability to handle everything from architecture to deployment is remarkable. The multi-tenancy implementation was flawless.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
    featured: true,
    createdAt: "2025-01-10T10:00:00.000Z",
    updatedAt: "2025-01-10T10:00:00.000Z",
  },
  {
    _id: "test2",
    name: "Sneha Kapoor",
    position: "Tech Lead",
    company: "Tech Mahindra",
    content:
      "Working with Abhishek on the AT&T projects was a great experience. He reduced ticket resolution time from 3 days to 1 day and consistently delivered high-quality code. A true problem solver.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
    featured: true,
    createdAt: "2023-06-15T10:00:00.000Z",
    updatedAt: "2023-06-15T10:00:00.000Z",
  },
  {
    _id: "test3",
    name: "Vikram Desai",
    position: "CTO",
    company: "Group Bayport",
    content:
      "Abhishek made an immediate impact during his internship. His React components drove a 35% increase in user engagement on our e-commerce platforms. Highly recommend him for any development role.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
    featured: true,
    createdAt: "2021-10-20T10:00:00.000Z",
    updatedAt: "2021-10-20T10:00:00.000Z",
  },
]

// Export work experience and education separately as required
export const fallbackWorkExperience = [
  {
    _id: "exp1",
    title: "Software Engineer",
    company: "PharmaEdge.ai",
    location: "Remote",
    period: "Dec 2024 - Present",
    description:
      "Designed and developed a full-stack conference platform from scratch using Next.js and PostgreSQL, with an admin panel to monitor user registrations, track exports, and verify users via OTP-based authentication. Implemented multi-tenancy support and built a dashboard with analytics. Migrated a large-scale competitive intelligence app from Pug/Express.js to React + NestJS, improving page load speeds by 85%. Integrated Cerbos for fine-grained access control. Built fully isolated Dev, Staging, and Testing environments with CI/CD pipelines. Engineered RESTful APIs, built multi-agent automation workflows for PDF-to-PPT generation, and developed advanced Python-based AI deep-searching tools with fuzzy matching and semantic extraction.",
    type: "Full-time",
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z",
  },
  {
    _id: "exp2",
    title: "Software Developer",
    company: "Tech Mahindra Ltd.",
    location: "Noida, India",
    period: "Nov 2021 - Aug 2024",
    description:
      "Spearheaded enhancements for AT&T projects including Orca (Warehouse Management) and Atlas (SRN Ticketing, WiFi Extenders EasyMesh, MultiCPE). Leveraged Angular, Node.js, Express.js, and MongoDB achieving 20% performance optimization. Designed full-stack applications driving 5% increase in user engagement. Implemented features reducing ticket resolution time from 3 days to 1 day. Oversaw both back-end and front-end development, increasing site performance by 25%. Implemented unit tests using Karma and Jasmine.",
    type: "Full-time",
    createdAt: "2021-11-01T10:00:00.000Z",
    updatedAt: "2021-11-01T10:00:00.000Z",
  },
  {
    _id: "exp3",
    title: "Software Developer Intern",
    company: "Group Bayport",
    location: "Remote",
    period: "Apr 2021 - Oct 2021",
    description:
      "Developed front-end components for BannerBuzz.com and coversandall.com, driving 35% increase in user engagement. Engineered and integrated React components into an existing design tool with Node.js, achieving 25% improvement in conversion rates. Enhanced existing software resulting in twofold enhancement of user experience. Produced efficient, modular code achieving 20% increase in efficiency.",
    type: "Internship",
    createdAt: "2021-04-01T10:00:00.000Z",
    updatedAt: "2021-04-01T10:00:00.000Z",
  },
]

export const fallbackEducation = [
  {
    _id: "edu1",
    institution: "Rawal Institute of Engineering and Technology",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    field: "Computer Science and Engineering",
    location: "Faridabad, India",
    period: "2016 - 2020",
    description:
      "Affiliated by Maharishi Dayanand University. Grade: 55%.",
    type: "education",
    createdAt: "2016-08-01T10:00:00.000Z",
    updatedAt: "2016-08-01T10:00:00.000Z",
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
