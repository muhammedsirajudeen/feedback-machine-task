"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

interface SuggestionProps {
  feedback: {
    description: string
  }
  suggestions: string[]
  admin: boolean
  loading: boolean
  handleSuggestion: (suggestion: string) => void
  getSuggestions: (description: string) => void
}

export function SuggestionComponent({
  feedback,
  suggestions,
  admin,
  loading,
  handleSuggestion,
  getSuggestions,
}: SuggestionProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null)

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion)
    handleSuggestion(suggestion)
  }

  return (
    <Card className="w-full shadow-md border-muted">
      {admin && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            AI Suggestions
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className="pb-2">
        {suggestions.length > 0 ? (
          <ScrollArea className="h-full max-h-[200px] pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Button
                    variant={selectedSuggestion === suggestion ? "default" : "outline"}
                    size="sm"
                    className="w-full text-left justify-start h-auto whitespace-normal py-2 px-3"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        ) : admin ? (
          <p className="text-sm text-muted-foreground italic">
            Click the button below to generate AI suggestions based on the feedback.
          </p>
        ) : null}
      </CardContent>

      {admin && (
        <CardFooter className="pt-2">
          <Button
            disabled={loading}
            className="w-full"
            variant="secondary"
            onClick={() => getSuggestions(feedback.description)}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating suggestions...
              </>
            ) : (
              <>Get AI Suggestions</>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
