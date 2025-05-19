# Instalação Manual

## O que é o Sanity Studio?

O Sanity Studio é uma aplicação React open-source que conecta ao dataset hospedado do seu projeto. O Studio é configurado localmente e depois implantado para colaboradores de conteúdo. Conteúdo e recursos do dataset hospedado podem ser consultados através das APIs do Sanity.

## Configure seu Sanity Studio

### Passo 1. Crie um novo Studio com Sanity CLI

Execute o comando no seu Terminal para inicializar seu projeto no computador local:

```bash
npm create sanity@latest -- --project qj4a8id6 --dataset production --template clean --typescript --output-path studio-agentesintegrados
cd studio-agentesintegrados
```

Veja a [documentação](https://www.sanity.io/docs/getting-started-with-sanity) se estiver tendo problemas com o CLI.

### Passo 2. Instale as dependências

```bash
npm install
```

### Passo 3. Configure as variáveis de ambiente

```bash
cp -i .env.local.example .env.local
```

Agora, preencha o arquivo `.env.local` com o ID do projeto e o nome do dataset. Seu arquivo deve ficar assim:

```
SANITY_STUDIO_PROJECT_id="qj4a8id6"
SANITY_STUDIO_DATASET="production"
```

Seu `project ID` não é informação sensível.

### Passo 4. Rode o Sanity Studio localmente

Dentro do diretório do Studio, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

### Passo 5. Faça login no Studio

Abra o Studio rodando localmente no seu navegador em http://localhost:3333.

Você verá uma tela solicitando login no Studio. Use o mesmo serviço (Google, GitHub, ou email) que você usou quando fez login no CLI.

> [!DICA]
> Os schemaTypes já estão definidos neste projeto em `src/schemaTypes/index.ts` e incluem:
> - Documentos: page, post, person
> - Objetos: blockContent, infoSection, callToAction, link
> - Singletons: settings

### Passo 6. (Opcional) Importe um dataset de exemplo

Se quiser começar com um conteúdo de exemplo, você pode importar o dataset fornecido (`demoData.tar.gz`) no seu projeto Sanity:

```bash
npx sanity dataset import demoData.tar.gz production
```

Isso assume que seu dataset se chama `production`. Se o nome for diferente, substitua `production` pelo nome do seu dataset.

### Passo 7. Extração de tipos TypeScript

Neste starter demo, usamos TypeScript. Após alterar seu schema, você precisa extrair o schema do Sanity Studio para gerar o arquivo de tipos TypeScript para o app Next.js:

```bash
npm run extract-types
```

Esse comando executa `sanity schema extract --enforce-required-fields` internamente. Saiba mais sobre [extração de tipos](https://www.sanity.io/docs/sanity-typegen#b79c963e4cf4).

## Configure seu app Next.js

### Passo 1. Acesse o diretório do seu app Next.js

```bash
cd nextjs-app # a partir da raiz do repositório
```

### Passo 2. Instale as dependências

```bash
npm install
```

### Passo 3. Configure as variáveis de ambiente

```bash
cp -i .env.local.example .env.local
```

Agora você pode preencher `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` rodando o comando abaixo. Selecione seu projeto e dataset quando solicitado e escolha NÃO quando perguntado "Would you like to add configuration files for a Sanity project":

```bash
npm create sanity@latest -- --env=.env.local
```

#### Criando um token de leitura

Antes de rodar o projeto, você precisa configurar um token de leitura (`SANITY_API_READ_TOKEN`), usado para autenticação pela Presentation do Sanity e para buscar conteúdo em modo rascunho.

1. Acesse [manage.sanity.io](https://manage.sanity.io/) e selecione seu projeto no menu "Project".
2. Clique na aba `🔌 API`.
3. Clique em `+ Add API token`.
4. Dê o nome "NextJS / Presentation READ Token" e defina as `Permissions` como `Viewer`, depois clique em `Save`.
5. Copie o token e adicione ao seu arquivo `.env.local`:

```bash
SANITY_API_READ_TOKEN="<cole seu token aqui>"
```

### Passo 4. Rode seu app Next.js localmente

```bash
npm run dev
```

> [!Nota]
> Neste ponto, ao rodar o Sanity Studio, você verá uma mensagem indicando que a Presentation precisa ser configurada. Isso será resolvido após configurar e rodar o app Next.js.

### Passo 5. Geração de tipos TypeScript

Os tipos são gerados automaticamente rodando o script `"predev": "npm run typegen"` no arquivo package.json. Isso é opcional, mas irá construir seu arquivo `sanity.types.ts` automaticamente. Saiba mais sobre [Sanity TypeGen](https://www.sanity.io/docs/sanity-typegen).

```bash
npm run extract-types
```

Esse comando executa `sanity typegen generate` internamente. Saiba mais sobre [geração de tipos](https://www.sanity.io/docs/sanity-typegen).

## Deploy do Sanity Studio e do app Next.js em produção

### Deploy do seu Sanity Studio

Para publicar seu Sanity Studio, siga os passos:

1. Provavelmente você vai precisar de um arquivo .env diferente para produção, para definir um `SANITY_STUDIO_PREVIEW_URL` que corresponda ao domínio onde seu app Next.js será publicado. Copie o .env.local para .env.production e ajuste as variáveis:

   ```bash
   cp -i .env.local .env.production
   ```

2. No terminal, use o comando abaixo para publicar o Studio nos servidores da Sanity. [Saiba mais sobre deploy na Sanity](https://www.sanity.io/docs/deployment).

   ```bash
   npx sanity deploy
   ```

3. Quando solicitado, escolha um hostname único para seu Studio. Esse será o endereço onde seu Studio ficará acessível.

4. Após o deploy, você receberá uma URL do seu Sanity Studio publicado, algo como:

   ```
   https://seu-projeto.sanity.studio
   ```

5. Agora você pode acessar e usar seu Sanity Studio de qualquer dispositivo com internet.

   Lembre-se de publicar novamente sempre que fizer alterações na configuração ou schema do Studio.

> [!NOTA]
> Certifique-se de ter as permissões necessárias para publicar. Se estiver em equipe, confirme com o responsável pelo projeto.

> [!DICA]
> Você pode configurar deploy contínuo do seu Studio usando Netlify ou Vercel. Assim, o Studio será publicado automaticamente sempre que você fizer push no repositório.

### Deploy do seu app Next.js na Vercel

[!NOTA]

> Você pode publicar seu app Next.js onde quiser, mas neste demo usamos a Vercel.

#### Para publicar manualmente seu app Next.js na Vercel, siga:

1. Faça push do seu código para um repositório Git (GitHub, GitLab ou Bitbucket).

2. Acesse o [dashboard da Vercel](https://vercel.com/dashboard) e clique em "New Project".

3. Importe seu repositório Git:

   - Selecione o provedor (GitHub, GitLab ou Bitbucket)
   - Escolha o repositório com seu app Next.js

4. Configure seu projeto:

   - **Defina o diretório raiz como o diretório do seu app NextJS**
   - A Vercel detecta automaticamente que é um app Next.js
   - Ajuste as configurações de build se necessário (geralmente não precisa)

5. Configure as variáveis de ambiente:

   - Clique em "Environment Variables"
   - Adicione todas as variáveis do seu arquivo `.env`. Não esqueça de definir `NEXT_PUBLIC_SANITY_STUDIO_URL` com a URL do seu Studio publicado.
   - Adicione as variáveis do Algolia: `NEXT_PUBLIC_ALGOLIA_APP_ID`, `ALGOLIA_API_KEY` e `ALGOLIA_INDEX_NAME`. Você encontra esses valores no painel da Algolia.

> **Dica:** A Algolia fornece um conjunto de chaves de API pré-definidas. A Search API Key funciona em todos os índices da sua aplicação Algolia e é segura para uso no frontend de produção. A Write API Key é usada para criar, atualizar e DELETAR índices.

6. Clique em "Deploy" para iniciar o processo de publicação.

7. Após o deploy, a Vercel fornecerá uma URL para seu app publicado.

8. (Opcional) Configure um domínio personalizado no painel da Vercel.

9. Agora você pode adicionar o domínio do seu app à lista de origens CORS no console do Sanity, na aba `🔌 API`.

Para próximos deploys, basta fazer push no seu repositório Git. A Vercel irá rebuildar e publicar automaticamente.

> [!DICA]
> Você também pode usar o Vercel CLI para publicar. Instale globalmente com `npm i -g vercel`, depois rode `vercel` no diretório nextjs-app e siga as instruções.
> [!NOTA]
> Talvez seja necessário desabilitar ou configurar "Protection Bypass for Automation" nas configurações da Vercel para que a Presentation funcione no seu Studio Sanity.

## Desenvolvimento Local do Studio

### Executando o Studio com Live Preview

Se você quer testar a funcionalidade de Live Preview enquanto desenvolve:

1. Certifique-se de que ambos os serviços estão rodando:
   - Studio: `npm run dev` no diretório `studio-agentesintegrados`
   - Next.js: `npm run dev` no diretório `nextjs-app`

2. Acesse o Studio em http://localhost:3333 e você verá o botão de Preview funcionando.

## Deploy Final do Sanity Studio

Depois de configurar tudo localmente, é hora de fazer o deploy final do Studio para produção.

### Comando de Deploy

No diretório do seu Studio (`studio-agentesintegrados`), execute:

```bash
npm run deploy
```

Este comando publicará seu Studio nos servidores da Sanity.

### Convidar Colaboradores

Após o deploy, você pode convidar colaboradores para o projeto:

1. Acesse o [Console de Gerenciamento do Sanity](https://manage.sanity.io/)
2. Selecione seu projeto
3. Vá para a aba "Members"
4. Clique em "Invite members"
5. Adicione o email dos colaboradores e defina suas permissões

Os colaboradores poderão acessar o Studio publicado e colaborar na criação de conteúdo.

## Próximos passos

- [Sanity Learn: Next.js para produção](https://www.sanity.io/learn/track/work-ready-next-js)
- [Incorporando o Sanity Studio](https://www.sanity.io/docs/embedding-sanity-studio)
- [Participe da comunidade Sanity](https://slack.sanity.io/)

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fsanity-template-nextjs-clean%2Ftree%2Ffeature%2Ftemplate-upgrade&env=NEXT_PUBLIC_SANITY_STUDIO_URL&project-name=nextjs-sanity-app&repository-name=nextjs-sanity-app&demo-title=NextJS%20Sanity%20Clean%20Starter%20Demo&demo-url=https%3A%2F%2Fsanity-template-nextjs-clean-preview.sanity.dev%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fsanity-io%2Fsanity-template-nextjs-clean%2Ffeature%2Ftemplate-upgrade%2Fsanity-nextjs-preview.webp&demo-description=A%20starter%20template%20for%20using%20NextJS%20with%20Sanity&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&root-directory=nextjs-app
[integration]: https://www.sanity.io/docs/vercel-integration
[`.env.local.example`]: .env.local.example
[unsplash]: https://unsplash.com
[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[presentation]: https://www.sanity.io/docs/presentation
[enable-ai-assist]: https://www.sanity.io/plugins/ai-assist#enabling-the-ai-assist-api