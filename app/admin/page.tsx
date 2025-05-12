import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, FolderOpen, Briefcase, FileUp } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Blog Posts",
      value: "8",
      description: "Total published articles",
      icon: <FileText className="h-8 w-8 text-primary" />,
      link: "/admin/blogs",
    },
    {
      title: "Projects",
      value: "9",
      description: "Showcased projects",
      icon: <FolderOpen className="h-8 w-8 text-primary" />,
      link: "/admin/projects",
    },
    {
      title: "Experience",
      value: "3",
      description: "Work experiences",
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      link: "/admin/experience",
    },
    {
      title: "Files",
      value: "1",
      description: "Uploaded documents",
      icon: <FileUp className="h-8 w-8 text-primary" />,
      link: "/admin/files",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
                <CardDescription>{stat.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions in the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Blog post updated</p>
                  <p className="text-sm text-muted-foreground">Building Performant Next.js Applications</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Project added</p>
                  <p className="text-sm text-muted-foreground">E-Commerce Platform</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Resume uploaded</p>
                  <p className="text-sm text-muted-foreground">resume.pdf</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/blogs/new">
                <Card className="hover:bg-muted cursor-pointer transition-colors h-full">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <FileText className="h-8 w-8 text-primary mb-2" />
                    <p className="font-medium">New Blog Post</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/admin/projects/new">
                <Card className="hover:bg-muted cursor-pointer transition-colors h-full">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <FolderOpen className="h-8 w-8 text-primary mb-2" />
                    <p className="font-medium">New Project</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/admin/experience">
                <Card className="hover:bg-muted cursor-pointer transition-colors h-full">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Briefcase className="h-8 w-8 text-primary mb-2" />
                    <p className="font-medium">Update Experience</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/admin/files">
                <Card className="hover:bg-muted cursor-pointer transition-colors h-full">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <FileUp className="h-8 w-8 text-primary mb-2" />
                    <p className="font-medium">Upload Resume</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
