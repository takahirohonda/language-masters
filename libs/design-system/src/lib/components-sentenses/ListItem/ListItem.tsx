import { SpeechButton } from '../SpeechButton'
import TranslateIcon from '@mui/icons-material/Translate'
import Tooltip from '@mui/material/Tooltip'

export interface ListItemProps {
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
      <div className="flex">
        <p>{targetSentence}</p>
        <Tooltip title={translatedSentence} placement="left-start">
          <TranslateIcon />
        </Tooltip>
        <TranslateIcon />
      </div>
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
