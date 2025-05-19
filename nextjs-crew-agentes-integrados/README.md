Este é um projeto [Next.js](https://nextjs.org) criado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Primeiros Passos

### Configuração de Ambiente

Antes de iniciar, você precisa configurar as variáveis de ambiente:

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-28
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
```

2. Substitua `seu-project-id` pelo ID do seu projeto Sanity.

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando o arquivo `app/page.tsx`. A página é atualizada automaticamente conforme você edita o arquivo.

Este projeto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar automaticamente a [Geist](https://vercel.com/font), uma nova família de fontes da Vercel.

## Saiba Mais

Para saber mais sobre Next.js, confira os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - saiba mais sobre os recursos e a API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo de Next.js.

Você também pode conferir [o repositório do Next.js no GitHub](https://github.com/vercel/next.js) - seu feedback e contribuições são bem-vindos!

## Deploy na Vercel

A maneira mais fácil de publicar seu app Next.js é usando a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), dos criadores do Next.js.

Confira nossa [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.