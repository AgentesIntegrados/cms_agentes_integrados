# Documentação: Usando Agent Actions do Sanity no CMS Agentes Integrados

## Introdução

Agent Actions são interfaces dedicadas para processar seu conteúdo com IA e LLMs no Sanity. Elas permitem executar instruções de IA conscientes do schema para criar e modificar documentos do Sanity de forma programática.

Este guia mostra como usar Agent Actions no seu projeto CMS Agentes Integrados, que já está configurado com Sanity CMS e Next.js.

## Requisitos Básicos

- Cliente Sanity (`@sanity/client`) versão 7.1.0 ou superior
- Schema atualizado e implantado no Sanity
- API Token do Sanity com permissões de escrita

## Configuração Inicial

Primeiro, certifique-se de ter as credenciais do Sanity no seu arquivo `.env.local`:

```env
SANITY_API_TOKEN=seu-token-aqui
```

## Tipos de Agent Actions

### 1. Generate - Criar Novo Conteúdo

Crie novos posts sobre imóveis ou notícias do setor:

```javascript
import { client } from "@/sanity/lib/client";

// Criar um novo post sobre imóveis
const criarPostImovel = async () => {
  const resultado = await client.agent.action.generate({
    schemaId: 'sanity.workspace.schema.default',
    targetDocument: {
      operation: 'createOrReplace',
      _type: 'post',
      _id: `post-imovel-${Date.now()}`,
      initialValues: {
        person: {
          _type: 'reference',
          _ref: 'id-do-autor' // substitua com o ID real
        }
      }
    },
    instruction: `
      Crie um post sobre tendências do mercado imobiliário em 2025.
      Inclua:
      - Título atraente
      - Introdução sobre o mercado atual
      - 3 tendências principais
      - Conclusão com perspectivas futuras
      Use tom profissional mas acessível.
    `
  });
  
  return resultado;
};
```

### 2. Transform - Modificar Conteúdo Existente

Modifique posts existentes para melhorar seu conteúdo:

```javascript
// Melhorar SEO de um post existente
const melhorarSEOPost = async (postId) => {
  const resultado = await client.agent.action.transform({
    schemaId: 'sanity.workspace.schema.default',
    documentId: postId,
    instruction: `
      Melhore este post para SEO:
      - Adicione palavras-chave sobre imóveis e mercado imobiliário
      - Torne o título mais atraente para buscas
      - Adicione meta descrição otimizada
      - Mantenha o tom original mas torne mais engajador
    `
  });
  
  return resultado;
};
```

### 3. Translate - Traduzir Conteúdo

Traduza posts para alcançar um público mais amplo:

```javascript
// Traduzir post para inglês
const traduzirPostParaIngles = async (postId) => {
  const resultado = await client.agent.action.translate({
    schemaId: 'sanity.workspace.schema.default',
    documentId: postId,
    targetDocument: {
      operation: 'createOrReplace',
      _id: `${postId}-en`
    },
    sourceLanguage: 'pt',
    targetLanguage: 'en',
    instruction: 'Traduza mantendo o tom profissional e adaptando termos imobiliários para o mercado internacional'
  });
  
  return resultado;
};
```

## Integração com Next.js

### 1. Criar Endpoint API

Crie um novo arquivo em `/app/api/agent-actions/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    let resultado;

    switch (action) {
      case 'generate':
        resultado = await client.agent.action.generate(params);
        break;
      case 'transform':
        resultado = await client.agent.action.transform(params);
        break;
      case 'translate':
        resultado = await client.agent.action.translate(params);
        break;
      default:
        throw new Error(`Ação não suportada: ${action}`);
    }

    return NextResponse.json({ success: true, resultado });
  } catch (error: any) {
    console.error('Erro no Agent Action:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

### 2. Criar Componente React

Crie um componente para interface de usuário em `/app/components/AgentActions.tsx`:

```typescript
'use client'

import { useState } from 'react'

export function AgentActions() {
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState<any>(null)

  const gerarNovoPost = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/agent-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          targetDocument: {
            operation: 'createOrReplace',
            _type: 'post',
            _id: `post-${Date.now()}`
          },
          instruction: 'Crie um post sobre como escolher o imóvel ideal'
        })
      })

      const data = await response.json()
      setResultado(data)
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Agent Actions</h2>
      
      <button
        onClick={gerarNovoPost}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Gerando...' : 'Gerar Novo Post'}
      </button>

      {resultado && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre>{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
```

## Exemplos Práticos para o CMS Agentes Integrados

### 1. Gerar Notícia sobre Mercado Imobiliário

```javascript
const gerarNoticiaImoveis = async () => {
  return await client.agent.action.generate({
    schemaId: 'sanity.workspace.schema.default',
    targetDocument: {
      operation: 'createOrReplace',
      _type: 'post',
      _id: `noticia-${Date.now()}`,
      initialValues: {
        category: 'noticias',
        featured: true
      }
    },
    instruction: `
      Crie uma notícia sobre o mercado imobiliário brasileiro.
      Foque em:
      - Dados recentes sobre vendas e locações
      - Tendências de preços nas principais capitais
      - Impacto de mudanças econômicas no setor
      - Oportunidades para investidores
      
      Use dados fictícios mas realistas e mantenha tom jornalístico.
    `
  });
};
```

### 2. Criar Guia para Compradores

```javascript
const criarGuiaCompradores = async () => {
  return await client.agent.action.generate({
    schemaId: 'sanity.workspace.schema.default',
    targetDocument: {
      operation: 'createOrReplace',
      _type: 'page',
      _id: 'guia-compradores',
      initialValues: {
        title: 'Guia Completo para Compradores'
      }
    },
    instruction: `
      Crie um guia completo para compradores de primeira viagem.
      Inclua seções sobre:
      - Como calcular o orçamento
      - Documentação necessária
      - Processo de financiamento
      - Dicas para negociação
      - Checklist de inspeção do imóvel
      
      Use linguagem clara e adicione exemplos práticos.
    `
  });
};
```

### 3. Otimizar Post para SEO Local

```javascript
const otimizarParaSEOLocal = async (postId, cidade) => {
  return await client.agent.action.transform({
    schemaId: 'sanity.workspace.schema.default',
    documentId: postId,
    instruction: `
      Otimize este post para SEO local em ${cidade}.
      Adicione:
      - Menções à cidade e bairros populares
      - Palavras-chave como "imóveis em ${cidade}"
      - Informações sobre o mercado local
      - Referências a marcos e características da cidade
      
      Mantenha o conteúdo original mas adicione contexto local.
    `
  });
};
```

## Melhores Práticas

1. **Instruções Detalhadas**: Seja específico sobre o que deseja gerar
2. **Valores Iniciais**: Use `initialValues` para definir metadados importantes
3. **Controle de IDs**: Use IDs únicos baseados em timestamp para evitar conflitos
4. **Tratamento de Erros**: Sempre implemente try/catch para lidar com falhas
5. **Validação**: Valide os resultados antes de publicar ao vivo

## Segurança

1. **Proteja suas credenciais**: Nunca exponha o `SANITY_API_TOKEN` no frontend
2. **Valide entradas**: Sempre valide as instruções antes de enviar para a API
3. **Limite acessos**: Use tokens com permissões mínimas necessárias
4. **Monitore uso**: Acompanhe o uso da API para evitar custos excessivos

## Limitações e Considerações

- Campos do tipo `Number` e `File` não são suportados diretamente
- Para imagens, configure o schema para suportar geração por IA
- Referências requerem configuração adicional no schema
- O tempo de resposta pode variar dependendo da complexidade da instrução

## Próximos Passos

1. Configure as credenciais do Sanity
2. Teste os exemplos acima no seu ambiente
3. Crie uma interface administrativa para gerenciar Agent Actions
4. Implemente logs e monitoramento do uso

Para mais informações, consulte a [documentação oficial do Sanity](https://www.sanity.io/docs/agent-actions).