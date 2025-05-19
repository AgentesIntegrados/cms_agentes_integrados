# CLAUDE.md

## Comandos de Build

### Comandos principais:
- `npm run build` - Faz o build de produção (executa `typegen` antes automaticamente)
- `npm run dev` - Inicia servidor de desenvolvimento (executa `typegen` antes automaticamente)
- `npm run lint` - Executa o linter
- `npm run typecheck` - Executa verificação de tipos TypeScript

### Comandos auxiliares:
- `npm run typegen` - Gera tipos do Sanity
- `npm run start` - Inicia servidor de produção
- `npm run storybook` - Inicia o Storybook
- `npm run build-storybook` - Faz build do Storybook

## Processo de Build

O projeto utiliza Next.js e tem verificações automáticas:
1. Antes do dev/build, executa automaticamente `typegen` para gerar tipos do Sanity
2. Para verificação completa execute:
   - `npm run lint` - para verificar estilo de código
   - `npm run typecheck` - para verificar tipos TypeScript