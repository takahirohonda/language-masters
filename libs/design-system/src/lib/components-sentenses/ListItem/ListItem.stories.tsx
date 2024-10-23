import { Meta, ComponentStory } from '@storybook/react'
import { ListItem, ListItemProps } from './ListItem'

export default {
  title: 'Components/ListItem',
  component: ListItem,
  argTypes: {
    listenOnclick: { action: 'listen clicked' },
    testOnClick: { action: 'test clicked' },
  },
} as Meta

const Template: ComponentStory<ListItemProps> = (args) => <ListItem {...args} />

export const Default = Template.bind({})
Default.args = {
  targetSentence: 'This is a sentence in English.',
  translatedSentence: 'Ceci est une phrase en français.',
  listenButtonText: 'Listen',
  testButtonText: 'Test',
  listenOnclick: () => console.log('Listen button clicked'),
  testOnClick: () => console.log('Test button clicked'),
}

export const WithLongSentences = Template.bind({})
WithLongSentences.args = {
  targetSentence: 'The quick brown fox jumps over the lazy dog.',
  translatedSentence:
    'Le renard brun rapide saute par-dessus le chien paresseux.',
  listenButtonText: 'Listen',
  testButtonText: 'Test',
  listenOnclick: () => console.log('Listen button clicked'),
  testOnClick: () => console.log('Test button clicked'),
}
