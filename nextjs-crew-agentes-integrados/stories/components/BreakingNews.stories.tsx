import type { Meta, StoryObj } from '@storybook/react'
import BreakingNews from '../../app/components/BreakingNews'

const meta: Meta<typeof BreakingNews> = {
  title: 'Components/BreakingNews',
  component: BreakingNews,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BreakingNews>

export const Default: Story = {}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}