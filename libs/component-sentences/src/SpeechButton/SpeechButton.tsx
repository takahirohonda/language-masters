'use client'

import clsx from 'clsx'

export interface SpeechButtonProps {
  variant: 'listen' | 'test'
  text: string
  onClick: () => void
}

export const SpeechButton = ({ variant, text, onClick }: SpeechButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(`
    min-w-[100px],
    max-h-[32px],
    p-[4px],
    border-1,
    rounded,
    ${
      variant === 'listen'
        ? 'border-red-800 hover:bg-red-900 bg-red-600'
        : 'bg-emerald-600 border-emerald-700 hover:bg-cyan-800'
    },
    
    `)}
    >
      {text}
    </button>
  )
}
