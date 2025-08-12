"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(100, "Subject must be less than 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
  // Honeypot field for spam prevention
  website: z.string().max(0, "Invalid field"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Mail className="h-6 w-6 text-primary" />
          Send a Message
        </CardTitle>
        <CardDescription>
          Ready to collaborate? Fill out the form below and I'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Success Message */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200 font-medium">
                Message sent successfully! I'll get back to you soon.
              </span>
            </motion.div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-red-800 dark:text-red-200 font-medium">
                {errorMessage || 'Failed to send message. Please try again.'}
              </span>
            </motion.div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              className={errors.name ? 'border-red-500 focus:border-red-500' : ''}
              {...register('name')}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="name-error"
                className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.name.message}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
              {...register('email')}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="email-error"
                className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              type="text"
              placeholder="What's this about?"
              className={errors.subject ? 'border-red-500 focus:border-red-500' : ''}
              {...register('subject')}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            />
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="subject-error"
                className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.subject.message}
              </motion.p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Tell me about your project, opportunity, or just say hello!"
              rows={6}
              className={errors.message ? 'border-red-500 focus:border-red-500' : ''}
              {...register('message')}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                id="message-error"
                className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.message.message}
              </motion.p>
            )}
          </div>

          {/* Honeypot Field (Hidden) */}
          <div className="sr-only">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('website')}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          {/* Accessibility Note */}
          <p className="text-xs text-muted-foreground text-center">
            All fields marked with <span className="text-red-500">*</span> are required.
            This form includes spam protection and accessibility features.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
