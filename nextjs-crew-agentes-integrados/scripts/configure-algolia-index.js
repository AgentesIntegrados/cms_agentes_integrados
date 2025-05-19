import { algoliasearch } from 'algoliasearch';

// Use a chave de Admin para configurar o índice
const client = algoliasearch('JV3WUFKTAI', '4a1c7b7d52925015ef347b857e62a70b');

async function configureIndex() {
  try {
    const indexName = 'algolia_movie_sample_dataset';
    
    // Configurar settings do índice
    const indexSettings = {
      searchableAttributes: [
        'title',           // Título tem maior prioridade
        'overview',        // Descrição tem prioridade secundária
      ],
      
      // Configurar ranking personalizado
      customRanking: [
        'desc(popularity)',  // Filmes mais populares primeiro
        'desc(vote_average)' // Filmes com melhor avaliação
      ],
      
      // Atributos para highlighting
      attributesToHighlight: [
        'title',
        'overview'
      ],
      
      // Configurar relevância
      ranking: [
        'typo',     // Erros de digitação
        'geo',      // Proximidade geográfica
        'words',    // Número de palavras encontradas
        'filters',  // Filtros aplicados
        'proximity', // Proximidade das palavras
        'attribute', // Importância do atributo
        'exact',    // Correspondência exata
        'custom'    // Ranking customizado
      ],
      
      // Configurar typo tolerance
      typoTolerance: {
        enabled: true,
        minWordSizeForTypos: {
          oneTypo: 4,
          twoTypos: 8
        }
      }
    };
    
    await client.setSettings({
      indexName,
      indexSettings
    });
    
    console.log('Configurações do índice atualizadas com sucesso!');
    
  } catch (error) {
    console.error('Erro ao configurar índice:', error);
  }
}

configureIndex();