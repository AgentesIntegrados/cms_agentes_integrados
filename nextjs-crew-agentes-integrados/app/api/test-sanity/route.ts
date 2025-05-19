import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { token } from '@/sanity/lib/token';

export async function GET() {
  try {
    // Teste simples de consulta ao Sanity
    const query = `*[_type == "post"][0..2]{title, _id}`;
    
    const result = await client.fetch(query, {}, {
      cache: 'no-store',
      token: token,
    });
    
    return NextResponse.json({
      status: 'success',
      message: 'Conexão com Sanity funcionando',
      tokenExists: !!token,
      tokenLength: token?.length || 0,
      data: result,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      tokenExists: !!token,
      tokenLength: token?.length || 0,
    }, { status: 500 });
  }
}