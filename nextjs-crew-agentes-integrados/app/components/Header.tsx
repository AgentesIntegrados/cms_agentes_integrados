"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed z-50 w-full bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Botão de Busca (canto esquerdo) */}
            <div className="flex items-center gap-4">
              <button 
                className="text-gray-700 hover:text-red-500"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 1200 1200"
                     width="24"
                     height="24"
                     className="w-6 h-6"
                     aria-hidden="true"
                     role="img">
                  <path d="M958.484 910.161l-134.564-134.502c63.099-76.595 94.781-170.455 94.72-264.141
                           0.061-106.414-40.755-213.228-121.917-294.431-81.244-81.183-187.976-121.958-294.359-121.938
                           -106.435-0.020-213.187 40.796-294.369 121.938-81.234 81.203-122.010 188.017-121.989 294.369
                           -0.020 106.445 40.755 213.166 121.989 294.287 81.193 81.285 187.945 122.020 294.369 121.979
                           93.716 0.041 187.597-31.642 264.11-94.659l134.554 134.564 57.457-57.467z
                           M265.431 748.348c-65.546-65.495-98.13-150.999-98.171-236.882 0.041-85.832 32.625-171.346
                           98.171-236.913 65.567-65.536 151.081-98.099 236.933-98.14 85.821 0.041 171.336 32.604
                           236.902 98.14 65.495 65.516 98.12 151.122 98.12 236.913 0 85.924-32.625 171.387-98.12
                           236.882-65.556 65.495-151.009 98.099-236.902 98.099-85.852 0-171.366-32.604-236.933-98.099z
                           M505.385 272.864c-61.901 0.020-123.566 23.501-170.824 70.799-47.288 47.258-70.769 108.923
                           -70.799 170.834-0.041 26.624 4.383 53.105 13.046 78.428-0.031-0.522-0.092-1.024-0.031-1.556
                           13.199-91.341 48.241-159.775 96.963-208.497v-0.020h0.031c48.712-48.722 117.135-83.763
                           208.486-96.963 0.522-0.061 1.024 0 1.536 0.041-25.313-8.684-51.794-13.087-78.408-13.066z"
                        fill="currentColor"/>
                </svg>
              </button>
            </div>

            {/* Logo (centro) */}
            <Link className="absolute left-1/2 transform -translate-x-1/2" href="/">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold whitespace-nowrap">The Crypto Frontier</div>
            </Link>

            {/* Botões do lado direito */}
            <div className="flex items-center gap-4">
              {/* Botão Grade (Menu) */}
              <button 
                className="text-gray-700 hover:text-red-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 900 900"
                     width="24"
                     height="24"
                     className="w-6 h-6"
                     aria-hidden="true"
                     role="img">
                  <path d="M136.509 145.673h171.039v170.998h-171.039v-170.998z
                           M426.455 145.673h171.069v170.998h-171.069v-170.998z
                           M716.452 145.673h171.039v170.998h-171.039v-170.998z
                           M136.509 435.598h171.039v171.059h-171.039v-171.059z
                           M136.509 725.574h171.039v171.039h-171.039v-171.039z
                           M426.455 435.598h171.069v171.059h-171.069v-171.059z
                           M426.455 725.574h171.069v171.039h-171.069v-171.039z
                           M716.452 435.598h171.039v171.059h-171.039v-171.059z
                           M716.452 725.574h171.039v171.039h-171.039v-171.039z"
                        fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* Painel de Busca Expansível */}
      {searchOpen && (
        <div className="fixed top-24 left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg z-40">
          <div className="container mx-auto px-4">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector('input');
                if (input?.value) {
                  window.location.href = `/search?q=${encodeURIComponent(input.value)}`;
                }
              }}
            >
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="w-full p-3 border rounded focus:outline-none focus:border-blue-500" 
              />
              <button 
                type="submit" 
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="fixed top-24 left-0 right-0 lg:hidden z-40">
          <nav className="bg-white border-b border-gray-100 shadow-lg">
            <div className="py-8 text-center text-gray-500">
              <p>Menu disponível em breve</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}