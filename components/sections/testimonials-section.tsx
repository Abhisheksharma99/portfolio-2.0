"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { CardIllumination } from "@/components/card-illumination"
import { useTestimonialStore } from "@/lib/stores/testimonial-store"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { testimonials, initializeTestimonials } = useTestimonialStore()

  useEffect(() => {
    // Initialize testimonials from localStorage if available
    initializeTestimonials()
  }, [initializeTestimonials])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (carouselRef.current) {
      const scrollPosition = currentIndex * (carouselRef.current.offsetWidth / 1)
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

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
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <CardIllumination className="h-full">
                    <Card className="h-full glass-card border-0">
                      <CardContent className="p-8">
                        <Quote className="h-10 w-10 text-primary/40 mb-4" />

                        <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>

                        <div className="flex items-center">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 gradient-border p-0">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
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
