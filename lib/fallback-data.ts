// Fallback data for when the database is not available

// Projects
export const fallbackProjects = [
  {
    _id: "1",
    title: "E-commerce Website",
    slug: "ecommerce-website",
    description: "A full-featured e-commerce platform built with Next.js and MongoDB",
    image: "/placeholder.svg?height=600&width=800",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/example/project",
    featured: true,
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2023-01-15T00:00:00.000Z",
  },
  // Add more fallback projects as needed
]

// Blogs
export const fallbackBlogs = [
  {
    _id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    excerpt: "Learn how to build modern web applications with Next.js",
    content: "<p>This is a sample blog post about Next.js.</p>",
    image: "/placeholder.svg?height=600&width=800",
    author: "Abhishek Sharma",
    date: "2023-01-15",
    readTime: "5 min read",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript"],
    featured: true,
    createdAt: "2023-01-15T00:00:00.000Z",
    updatedAt: "2023-01-15T00:00:00.000Z",
  },
  // Add more fallback blogs as needed
]

// Testimonials
export const fallbackTestimonials = [
  {
    _id: "1",
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    image: "/placeholder.svg?height=200&width=200",
    content:
      "Working with Abhishek was a game-changer for our company. He delivered a stunning website that perfectly captured our brand and vision. His attention to detail and technical expertise are unmatched.",
    rating: 5,
  },
  // Add more fallback testimonials as needed
]

// Work Experience
export const fallbackWorkExperience = [
  {
    _id: "1",
    title: "Senior Full Stack Developer",
    company: "TechInnovate Solutions",
    location: "Delhi, India",
    description:
      "Led development of enterprise web applications using React, Node.js, and MongoDB. Implemented CI/CD pipelines and mentored junior developers.",
    startDate: "2021-06-01",
    endDate: null,
    current: true,
    type: "work",
  },
  // Add more fallback work experience as needed
]

// Education
export const fallbackEducation = [
  {
    _id: "4",
    title: "Master of Computer Applications",
    company: "Delhi University",
    location: "Delhi, India",
    description: "Specialized in Web Technologies and Software Development. Graduated with distinction.",
    startDate: "2015-07-01",
    endDate: "2017-06-30",
    current: false,
    type: "education",
  },
  // Add more fallback education as needed
]

// Files
export const fallbackFiles = []
