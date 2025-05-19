# Stories

Este diretório contém as histórias do Storybook para os componentes da aplicação.

## Estrutura

- `/components` - Stories para componentes comuns
- `/ui` - Stories para componentes do shadcn/ui
- `/features` - Stories para componentes específicos de funcionalidades

## Como criar uma story

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from '../app/components/ComponentName'

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // props do componente
  },
}
```