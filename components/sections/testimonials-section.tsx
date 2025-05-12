"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { CardIllumination } from "@/components/card-illumination"
import { getTestimonials } from "@/lib/actions/testimonial-actions"
import { fallbackTestimonials } from "@/lib/fallback-data"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials()
        if (data && data.length > 0) {
          setTestimonials(data)
        } else {
          // Use fallback data if no testimonials are returned
          setTestimonials(fallbackTestimonials)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        // Use fallback data on error
        setTestimonials(fallbackTestimonials)
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const nextSlide = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }
  }

  const prevSlide = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }
  }

  useEffect(() => {
    if (carouselRef.current && testimonials.length > 0) {
      const scrollPosition = currentIndex * (carouselRef.current.offsetWidth / 1)
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }, [currentIndex, testimonials.length])

  // Auto-scroll
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [currentIndex, testimonials.length])

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take my word for it. Here's what my clients have to say about working with me.
            </p>
          </div>
          <div className="text-center py-8">Loading testimonials...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="w-full flex-shrink-0 px-4">
                  <CardIllumination className="h-full">
                    <Card className="h-full glass-card border-0">
                      <CardContent className="p-8">
                        <Quote className="h-10 w-10 text-primary/40 mb-4" />

                        <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>

                        <div className="flex items-center">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 gradient-border p-0">
                            <Image
                              src={testimonial.image || "/placeholder.svg?height=100&width=100"}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardIllumination>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm border-purple-400/30 dark:border-purple-700/30 shadow-md z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background/80 backdrop-blur-sm border-purple-400/30 dark:border-purple-700/30 shadow-md z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next testimonial</span>
          </Button>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-primary/20"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
