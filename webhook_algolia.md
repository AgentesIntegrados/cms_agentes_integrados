# Abordagem de Otimização da Busca

## Problema Identificado

Ao buscar por "gabriel", o filme com título "Gabriel" aparecia em terceiro lugar, não em primeiro como seria esperado em uma busca por correspondência exata.

### Causa do Problema
O índice `algolia_movie_sample_dataset` é um índice de demonstração do Algolia com configurações pré-definidas que não podemos alterar. O algoritmo de relevância padrão considera múltiplos fatores além da correspondência exata do título.

---

## Solução Implementada

### Abordagem Híbrida: Algolia + Ordenação Local

1. **Busca no Algolia**: Mantém a busca poderosa do Algolia
2. **Reordenação Local**: Prioriza correspondências exatas no título

### Componente CustomHits

Criado um componente customizado que:

```typescript
// app/components/CustomHits.tsx
const sortedHits = [...hits].sort((a, b) => {
  const titleA = a.title?.toLowerCase() || '';
  const titleB = b.title?.toLowerCase() || '';
  
  // 1. Correspondências exatas primeiro
  if (titleA === query && titleB !== query) return -1;
  
  // 2. Títulos que começam com a query
  if (titleA.startsWith(query) && !titleB.startsWith(query)) return -1;
  
  // 3. Títulos que contêm a query
  if (titleA.includes(query) && !titleB.includes(query)) return -1;
  
  // 4. Manter ordem original do Algolia
  return 0;
});
```

---

## Comparação: Antes vs Depois

### ANTES (Busca Algolia Pura)

Busca por "gabriel" retornava:
1. **Sweethearts** - (contém "gabriel" no texto)
2. **Late Bloomers** - (contém "gabriel" no texto)
3. **Gabriel** - (título exato)

**Problema**: Correspondência exata do título aparecia em terceiro

### DEPOIS (Abordagem Híbrida)

Busca por "gabriel" retorna:
1. **Gabriel** - (título exato) ✅
2. **Sweethearts** - (contém "gabriel")
3. **Late Bloomers** - (contém "gabriel")

**Solução**: Correspondência exata agora aparece primeiro

---

## Hierarquia de Relevância Implementada

1. **Prioridade Máxima**: Título idêntico à busca
2. **Alta Prioridade**: Título começa com a busca
3. **Média Prioridade**: Título contém a busca
4. **Prioridade Padrão**: Relevância original do Algolia

---

## Vantagens da Abordagem

1. **Mantém poder do Algolia**: Busca fuzzy, correção de erros, etc.
2. **Melhora experiência**: Resultados mais intuitivos
3. **Performance**: Ordenação apenas dos resultados visíveis
4. **Flexibilidade**: Fácil ajustar critérios de ordenação

---

## Limitações e Considerações

1. **Índice de demonstração**: Não podemos alterar configurações do servidor
2. **Ordenação local**: Acontece apenas na página atual de resultados
3. **Case sensitive**: Busca normalizada para lowercase

---

## Código Implementado

### 1. Componente CustomHits
- Local: `/app/components/CustomHits.tsx`
- Função: Reordena resultados priorizando títulos exatos

### 2. Integração na Página
- Local: `/app/search/page.tsx`
- Mudança: `<Hits>` → `<CustomHits>`

---

## Alternativas Consideradas

1. **Configurar índice Algolia**: Não possível em índice de demo
2. **Filtros de busca**: Limitaria resultados
3. **Boost de relevância**: Requer acesso admin ao índice

---

## Conclusão

A abordagem híbrida oferece o melhor dos dois mundos:
- Poder de busca do Algolia
- Relevância intuitiva para o usuário

Resultado: Buscas por títulos exatos agora aparecem primeiro, melhorando significativamente a experiência do usuário.
