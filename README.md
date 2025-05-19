# CMS Agentes Integrados

Um sistema completo de gerenciamento de conteúdo (CMS) moderno, construído com **Next.js**, **Sanity** e **Algolia**. Este projeto oferece uma solução completa para criação e gerenciamento de conteúdo, com busca avançada integrada e experiência de edição visual em tempo real.

## 🌟 Características Principais

- **🚀 Next.js 15 com App Router**: Framework React de última geração para aplicações web rápidas e otimizadas
- **📝 Sanity CMS**: Sistema de gerenciamento de conteúdo headless com editor visual
- **🔍 Algolia Search**: Busca instantânea e poderosa com indexação automática
- **👁️ Edição Visual em Tempo Real**: Visualize mudanças enquanto edita o conteúdo
- **🎨 Storybook Integrado**: Desenvolvimento e documentação de componentes isolados
- **📱 Design Responsivo**: Interface otimizada para todos os dispositivos
- **🤖 Inteligência Artificial**: Geração automática de textos alternativos para imagens
- **⚡ Deploy Rápido**: Configuração simplificada com Vercel

## 📋 Funcionalidades

### Sistema de Blog
- Posts organizados com categorias e tags
- Sistema de autores com perfis
- Notícias de última hora e destaques
- Visualização de rascunhos

### Busca Avançada
- Busca instantânea com Algolia
- Filtros por categoria e data
- Destaque de termos pesquisados
- Histórico de busca

### Construtor de Páginas
- Criação de páginas personalizadas
- Componentes modulares (CTA, Info Sections)
- Preview em tempo real
- Templates pré-configurados

### Gestão de Mídia
- Upload e gerenciamento de imagens
- Integração com Unsplash
- Geração automática de alt text com IA
- Otimização automática de imagens

## 🛠️ Stack Tecnológica

### Frontend (Next.js App)
- **Framework**: Next.js 15 com App Router
- **Estilização**: Tailwind CSS + Typography Plugin
- **UI Components**: Shadcn/ui + Lucide Icons
- **Busca**: React InstantSearch + Algolia
- **Gerenciamento de Estado**: React Context API
- **Testes**: Vitest + Playwright

### CMS (Sanity Studio)
- **Versão**: Sanity v3
- **Schemas**: Posts, Pages, Authors, Settings
- **Plugins**: Preview, AI Assist, Algolia Integration
- **Live Content API**: Atualizações em tempo real

### Integrações
- **Busca**: Algolia Search
- **Analytics**: Vercel Speed Insights
- **CI/CD**: Vercel + GitHub Actions
- **Monitoramento**: Sentry (opcional)

## 🚀 Início Rápido

### Deploy com Vercel (Recomendado)

1. **Clique para Deploy**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fsanity-next-algolia-example)

2. **Configure o Sanity Studio**
   ```bash
   cd studio
   npm install
   npx sanity init --env
   npx sanity deploy
   ```

3. **Configure as Variáveis de Ambiente**
   
   No painel da Vercel, adicione:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_STUDIO_URL`
   - `NEXT_PUBLIC_ALGOLIA_APP_ID`
   - `ALGOLIA_API_KEY`
   - `ALGOLIA_INDEX_NAME`

### Instalação Local

1. **Clone o Repositório**
   ```bash
   git clone <url-do-repositorio>
   cd cms_agentes_integrados
   ```

2. **Configure o Frontend (Next.js)**
   ```bash
   cd nextjs-app
   npm install
   cp .env.local.example .env.local
   # Edite .env.local com suas credenciais
   npm run dev
   ```

3. **Configure o CMS (Sanity Studio)**
   ```bash
   cd ../studio
   npm install
   npx sanity init --env
   # Configure SANITY_STUDIO_PREVIEW_URL no .env
   npm run dev
   ```

4. **Configure o Algolia**
   - Crie uma conta no [Algolia](https://algolia.com)
   - Obtenha as chaves de API
   - Configure as variáveis de ambiente

## 🎨 Storybook

O projeto inclui Storybook para desenvolvimento de componentes:

```bash
cd nextjs-app
npm run storybook
```

Acesse em [http://localhost:6006](http://localhost:6006)

### Componentes Disponíveis
- Header
- BreakingNews
- LatestNews
- Featured
- NewsSection

## 📂 Estrutura do Projeto

```
cms_agentes_integrados/
├── nextjs-app/          # Aplicação Next.js
│   ├── app/            # App Router (páginas e API)
│   ├── components/     # Componentes React
│   ├── stories/        # Stories do Storybook
│   ├── sanity/         # Configuração do cliente Sanity
│   └── public/         # Arquivos estáticos
│
├── studio/             # Sanity Studio
│   ├── schemas/        # Schemas de conteúdo
│   ├── structure/      # Estrutura do Studio
│   └── static/         # Assets do Studio
│
├── README.md           # Este arquivo
└── manual-installation.md  # Guia detalhado de instalação
```

## 🔧 Scripts Disponíveis

### Next.js App
```bash
npm run dev          # Desenvolvimento local
npm run build        # Build de produção
npm run start        # Iniciar servidor de produção
npm run lint         # Executar linter
npm run typecheck    # Verificar tipos TypeScript
npm run storybook    # Iniciar Storybook
```

### Sanity Studio
```bash
npm run dev          # Desenvolvimento local
npm run build        # Build de produção
npm run deploy       # Deploy do Studio
```

## 🐛 Resolução de Problemas

### Erro de CORS
Adicione sua URL como origem CORS no [Console Sanity](https://www.sanity.io/manage):
- Development: `http://localhost:3000`
- Production: `https://seu-dominio.com`

### Problemas com Algolia
- Verifique se as chaves de API estão corretas
- Confirme que o índice foi criado
- Teste a conexão no dashboard do Algolia

### Erros de Build
```bash
# Limpe o cache
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Documentação

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Algolia Documentation](https://www.algolia.com/doc/)
- [Storybook Documentation](https://storybook.js.org/docs)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 💬 Suporte

- [GitHub Issues](https://github.com/seu-usuario/cms_agentes_integrados/issues)
- [Comunidade Sanity](https://slack.sanity.io)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/sanity)

---

Desenvolvido com ❤️ usando [Next.js](https://nextjs.org), [Sanity](https://sanity.io) e [Algolia](https://algolia.com)