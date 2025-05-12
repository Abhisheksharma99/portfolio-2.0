"use client"

import { create } from "zustand"

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content?: string
  image: string
  date: string
  readTime: string
  category: string
  slug: string
}

interface BlogStore {
  blogs: BlogPost[]
  addBlog: (blog: BlogPost) => void
  updateBlog: (id: number, updatedBlog: BlogPost) => void
  deleteBlog: (id: number) => void
  initializeBlogs: () => void
}

// Initial blog data
const initialBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Building Performant Next.js Applications",
    excerpt: "Learn how to optimize your Next.js applications for maximum performance and SEO.",
    content: `
      <p>Next.js has become one of the most popular React frameworks for building modern web applications. Its server-side rendering capabilities, static site generation, and built-in routing make it an excellent choice for developers looking to build fast, SEO-friendly websites.</p>
      
      <h2>Why Performance Matters</h2>
      <p>Website performance directly impacts user experience, conversion rates, and even SEO rankings. Studies have shown that users are likely to abandon sites that take more than a few seconds to load, and search engines like Google consider page speed as a ranking factor.</p>
      
      <h2>Key Optimization Techniques</h2>
      
      <h3>1. Image Optimization</h3>
      <p>Next.js provides built-in image optimization through the Image component. This component automatically optimizes images, serves them in modern formats like WebP, and implements lazy loading.</p>
      
      <pre><code>
import Image from 'next/image';

function MyComponent() {
  return (
    &lt;Image
      src="/my-image.jpg"
      alt="Description"
      width={800}
      height={600}
      priority={false}
    /&gt;
  );
}
      </code></pre>
      
      <h3>2. Code Splitting</h3>
      <p>Next.js automatically splits your code into smaller chunks, loading only what's necessary for each page. You can further optimize this with dynamic imports:</p>
      
      <pre><code>
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/heavy-component'), {
  loading: () => &lt;p&gt;Loading...&lt;/p&gt;,
  ssr: false,
});
      </code></pre>
      
      <h3>3. Implement Incremental Static Regeneration (ISR)</h3>
      <p>ISR allows you to update static pages after you've built your site, combining the benefits of static generation with dynamic data.</p>
      
      <pre><code>
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: { data },
    revalidate: 60, // Regenerate page every 60 seconds
  };
}
      </code></pre>
      
      <h2>Measuring Performance</h2>
      <p>Use tools like Lighthouse, WebPageTest, and Next.js Analytics to measure and monitor your application's performance. These tools provide insights into metrics like First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Time to Interactive (TTI).</p>
      
      <h2>Conclusion</h2>
      <p>Optimizing your Next.js application is an ongoing process. By implementing these techniques and regularly measuring performance, you can ensure your application provides the best possible experience for your users.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Development",
    slug: "building-performant-nextjs-applications",
  },
  {
    id: 2,
    title: "The Future of Web Development with AI",
    excerpt: "Exploring how artificial intelligence is transforming the landscape of web development.",
    content: `
      <p>Artificial intelligence is rapidly changing how we build web applications, automating repetitive tasks, enhancing user experiences, and enabling developers to focus on more creative aspects of their work.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>From code completion to bug detection, AI tools are becoming essential for modern developers. GitHub Copilot, powered by OpenAI's Codex, can suggest entire functions based on comments or context. Similarly, tools like Tabnine and Kite provide intelligent code completions that learn from your coding patterns.</p>
      
      <h2>Automated Testing and Quality Assurance</h2>
      <p>AI is revolutionizing testing by automatically generating test cases, identifying potential bugs before they reach production, and even self-healing code. Tools like Applitools use visual AI to detect UI bugs that traditional testing might miss.</p>
      
      <h2>Personalized User Experiences</h2>
      <p>AI enables websites to adapt to individual users in real-time. From content recommendations to dynamic UI adjustments based on user behavior, AI can help create more engaging and personalized experiences.</p>
      
      <h2>Challenges and Ethical Considerations</h2>
      <p>As we integrate AI into web development, we must address challenges like data privacy, algorithmic bias, and the potential impact on developer jobs. Responsible AI implementation requires careful consideration of these factors.</p>
      
      <h2>The Future Landscape</h2>
      <p>Looking ahead, we can expect AI to become even more integrated into the development workflow. Low-code and no-code platforms enhanced by AI will make web development more accessible, while AI-driven design tools will bridge the gap between designers and developers.</p>
      
      <h2>Conclusion</h2>
      <p>AI is not replacing web developers but rather augmenting their capabilities. By embracing these technologies, developers can enhance their productivity, create better user experiences, and focus on solving more complex and creative problems.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "April 22, 2023",
    readTime: "6 min read",
    category: "Technology",
    slug: "future-web-development-ai",
  },
  {
    id: 3,
    title: "Designing Accessible User Interfaces",
    excerpt: "Best practices for creating inclusive and accessible user interfaces for all users.",
    content: `
      <p>Accessibility is a crucial aspect of modern web development that ensures digital products are usable by people of all abilities. Beyond being a legal requirement in many jurisdictions, accessible design is simply good design that benefits all users.</p>
      
      <h2>Understanding Web Accessibility</h2>
      <p>Web accessibility means designing and developing websites that people with disabilities can perceive, understand, navigate, and interact with. This includes visual, auditory, physical, speech, cognitive, and neurological disabilities.</p>
      
      <h2>Key Accessibility Guidelines</h2>
      
      <h3>1. Semantic HTML</h3>
      <p>Using proper HTML elements for their intended purpose provides built-in accessibility benefits:</p>
      
      <pre><code>
&lt;!-- Instead of this --&gt;
&lt;div class="button" onclick="submitForm()"&gt;Submit&lt;/div&gt;

&lt;!-- Use this --&gt;
&lt;button type="submit"&gt;Submit&lt;/button&gt;
      </code></pre>
      
      <h3>2. Keyboard Navigation</h3>
      <p>Ensure all interactive elements are accessible via keyboard, with visible focus states:</p>
      
      <pre><code>
/* CSS */
:focus {
  outline: 2px solid #4299e1;
  outline-offset: 2px;
}
      </code></pre>
      
      <h3>3. Alternative Text for Images</h3>
      <p>Provide descriptive alt text for images to help screen reader users understand the content:</p>
      
      <pre><code>
&lt;img src="chart.png" alt="Bar chart showing sales growth of 25% in Q1 2023" /&gt;
      </code></pre>
      
      <h3>4. Color Contrast</h3>
      <p>Ensure sufficient contrast between text and background colors. WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.</p>
      
      <h3>5. ARIA Attributes</h3>
      <p>Use ARIA (Accessible Rich Internet Applications) attributes when necessary to enhance accessibility:</p>
      
      <pre><code>
&lt;div role="alert" aria-live="assertive"&gt;
  Form submitted successfully!
&lt;/div&gt;
      </code></pre>
      
      <h2>Testing for Accessibility</h2>
      <p>Regular testing is essential for ensuring accessibility. Use a combination of automated tools (like Lighthouse, axe, or WAVE) and manual testing with screen readers and keyboard navigation.</p>
      
      <h2>Conclusion</h2>
      <p>Designing for accessibility is not just about compliance—it's about creating better user experiences for everyone. By incorporating these practices into your development workflow, you can build more inclusive and usable interfaces that reach a wider audience.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "March 10, 2023",
    readTime: "10 min read",
    category: "Design",
    slug: "designing-accessible-user-interfaces",
  },
  {
    id: 4,
    title: "Test Blog Post",
    excerpt: "This is a test blog post for debugging purposes.",
    content: `
      <p>This is a test blog post that's specifically created to test the blog functionality.</p>
      
      <h2>Testing Headers</h2>
      <p>This paragraph tests the styling of content within the blog post system.</p>
      
      <h3>Testing Subheaders</h3>
      <p>We're making sure that all elements render correctly and that the routing system works properly.</p>
      
      <ul>
        <li>Testing list items</li>
        <li>Making sure formatting works</li>
        <li>Checking overall layout</li>
      </ul>
      
      <p>If you can see this content, it means the blog system is working correctly!</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "January 1, 2023",
    readTime: "2 min read",
    category: "Testing",
    slug: "test",
  },
]

export const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],

  addBlog: (blog) =>
    set((state) => {
      const newBlogs = [...state.blogs, blog]
      localStorage.setItem("portfolioBlogs", JSON.stringify(newBlogs))
      return { blogs: newBlogs }
    }),

  updateBlog: (id, updatedBlog) =>
    set((state) => {
      const newBlogs = state.blogs.map((blog) => (blog.id === id ? updatedBlog : blog))
      localStorage.setItem("portfolioBlogs", JSON.stringify(newBlogs))
      return { blogs: newBlogs }
    }),

  deleteBlog: (id) =>
    set((state) => {
      const newBlogs = state.blogs.filter((blog) => blog.id !== id)
      localStorage.setItem("portfolioBlogs", JSON.stringify(newBlogs))
      return { blogs: newBlogs }
    }),

  initializeBlogs: () =>
    set(() => {
      // Try to get blogs from localStorage
      const storedBlogs = localStorage.getItem("portfolioBlogs")
      if (storedBlogs) {
        return { blogs: JSON.parse(storedBlogs) }
      }

      // If no blogs in localStorage, use initial data and store it
      localStorage.setItem("portfolioBlogs", JSON.stringify(initialBlogs))
      return { blogs: initialBlogs }
    }),
}))
