import { NextResponse } from "next/server";
import { algoliasearch } from "algoliasearch";
import { client } from "@/sanity/lib/client";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

// Configurações do Algolia e Sanity
const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const algoliaApiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;
const webhookSecret = process.env.SANITY_WEBHOOK_SECRET!;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'posts';

// Cliente Algolia
const algoliaClient = algoliasearch(algoliaAppId, algoliaApiKey);

/**
 * Função para importar filmes do dataset de exemplo do Algolia
 */
async function importMoviesFromAlgolia() {
  console.log("Importando filmes do dataset do Algolia...");

  try {
    // Busca o dataset de filmes de exemplo do Algolia
    const datasetRequest = await fetch('https://dashboard.algolia.com/api/1/sample_datasets?type=movie');
    const movies = await datasetRequest.json();
    
    // Salva os filmes no índice do Algolia
    const result = await algoliaClient.saveObjects({ 
      indexName, 
      objects: movies 
    });
    
    console.log("Importação de filmes concluída com sucesso!");
    return {
      success: true,
      message: "Filmes importados com sucesso!",
      taskIDs: result.taskIDs,
      count: movies.length
    };
  } catch (error: any) {
    console.error("Erro ao importar filmes:", error.message);
    return {
      success: false,
      error: "Erro ao importar filmes",
      details: error.message,
    };
  }
}

/**
 * Função para realizar a indexação inicial
 * Busca todos os documentos do Sanity e os salva no Algolia
 */
async function performInitialIndexing() {
  console.log("Iniciando indexação inicial...");

  try {
    // Busca todos os documentos do tipo "post" do Sanity
    const sanityData = await client.fetch(`*[_type == "post"]{
      _id,
      title,
      slug,
      "body": pt::text(content),
      _type,
      "coverImage": coverImage.asset->url,
      date,
      _createdAt,
      _updatedAt
    }`);

    // Prepara os registros para o Algolia
    const records = sanityData.map((doc: any) => ({
      objectID: doc._id,
      title: doc.title,
      slug: doc.slug.current,
      // Limitamos o corpo do texto para evitar problemas com o tamanho máximo do Algolia
      body: doc.body?.slice(0, 9500),
      coverImage: doc.coverImage,
      date: doc.date,
      _createdAt: doc._createdAt,
      _updatedAt: doc._updatedAt,
    }));

    // Salva todos os registros no Algolia
    await algoliaClient.saveObjects({
      indexName,
      objects: records,
    });

    console.log("Indexação inicial concluída com sucesso.");
    return {
      success: true,
      message: "Indexação inicial concluída com sucesso!",
      count: records.length
    };
  } catch (error: any) {
    console.error("Erro na indexação inicial:", error.message);
    return {
      success: false,
      error: "Erro na indexação inicial",
      details: error.message,
    };
  }
}

/**
 * Manipulador da rota POST
 * Processa webhooks do Sanity e atualiza o índice do Algolia
 */
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const initialIndex = searchParams.get("initialIndex") === "true";

    // Realiza a indexação inicial se solicitado
    if (initialIndex) {
      const response = await performInitialIndexing();
      return NextResponse.json(response);
    }
    
    // Importa filmes do dataset do Algolia se solicitado
    const importMovies = searchParams.get("importMovies") === "true";
    if (importMovies) {
      const response = await importMoviesFromAlgolia();
      return NextResponse.json(response);
    }

    // Valida a assinatura do webhook
    const signature = request.headers.get(SIGNATURE_HEADER_NAME);
    if (!signature) {
      return NextResponse.json(
        { success: false, message: "Assinatura ausente no cabeçalho" },
        { status: 401 }
      );
    }

    // Obtém o corpo da requisição para validação da assinatura
    const body = await request.text();
    const isValid = await isValidSignature(body, signature, webhookSecret);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Assinatura inválida" },
        { status: 401 }
      );
    }

    // Processa as atualizações incrementais com base no payload do webhook
    let payload;
    try {
      payload = JSON.parse(body);
      console.log("Payload recebido:", JSON.stringify(payload));
    } catch (jsonError) {
      console.warn("Payload JSON inválido ou não fornecido");
      return NextResponse.json(
        { success: false, error: "Payload inválido ou não fornecido" },
        { status: 400 }
      );
    }

    const { _id, operation, value } = payload;

    if (!operation || !_id || !value) {
      return NextResponse.json(
        { success: false, error: "Payload inválido: campos obrigatórios ausentes" },
        { status: 400 }
      );
    }

    // Processa operação de exclusão
    if (operation === "delete") {
      await algoliaClient.deleteObject({
        indexName,
        objectID: _id,
      });
      console.log(`Objeto excluído com sucesso. ID: ${_id}`);
      return NextResponse.json({
        success: true,
        message: `Objeto com ID: ${_id} excluído com sucesso`,
      });
    } 
    // Processa operação de adição/atualização
    else {
      await algoliaClient.saveObject({
        indexName,
        body: {
          ...value,
          objectID: _id,
        },
      });

      console.log(`Objeto indexado/atualizado com sucesso. ID: ${_id}`);
      return NextResponse.json({
        success: true,
        message: `Documento com ID: ${_id} processado com sucesso`,
      });
    }
  } catch (error: any) {
    console.error("Erro ao processar requisição:", error.message);
    return NextResponse.json(
      { success: false, error: "Erro ao processar requisição", details: error.message },
      { status: 500 }
    );
  }
}
