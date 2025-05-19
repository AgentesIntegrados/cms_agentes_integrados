import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware para resolver o problema do headers() sendo usados de forma síncrona
export function middleware(request: NextRequest) {
  // Obtém os headers e os adiciona a uma resposta que o Next.js vai processar
  const response = NextResponse.next();

  // Adiciona um header personalizado para que o Next.js saiba que o middleware foi aplicado
  response.headers.set('x-middleware-cache', 'no-cache');
  
  // Obtém e repassa explicitamente os headers problemáticos
  if (request.headers.has('x-nonce')) {
    response.headers.set('x-nonce', request.headers.get('x-nonce') || '');
  }
  
  if (request.headers.has('x-forwarded-proto')) {
    response.headers.set('x-forwarded-proto', request.headers.get('x-forwarded-proto') || 'http');
  }
  
  if (request.headers.has('host')) {
    response.headers.set('host', request.headers.get('host') || '');
  }
  
  return response;
}

// Aplicar a todas as rotas
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 