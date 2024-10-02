import { SpeechButton } from '../SpeechButton'

interface ListItemProps {
  targetSentence: string
  translatedSentence: string
  listenButtonText: string
  testButtonText: string
  listenOnclick: () => void
  testOnClick: () => void
}

export const ListItem = ({
  targetSentence,
  translatedSentence,
  listenButtonText,
  testButtonText,
  listenOnclick,
  testOnClick,
}: ListItemProps) => {
  return (
    <div className="flex justify-between">
      <p>{targetSentence}</p>
      <div className="flex flex-column">
        <SpeechButton
          variant="listen"
          text={listenButtonText}
          onClick={listenOnclick}
        />
        <SpeechButton
          variant="test"
          text={testButtonText}
          onClick={testOnClick}
        />
      </div>
    </div>
  )
}
