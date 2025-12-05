export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
       
        {/* Header */}
        <h1 className="text-4xl md:text-5xl mb-8 mt-8 font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Página Inicial
        </h1>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          <span className="mx-4 text-2xl text-blue-400 animate-pulse">✨</span>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Project Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 
                          hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out 
                          transform cursor-pointer">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg mx-auto">
                <span className="text-2xl text-white">📚</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Sobre o Projeto
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-center md:text-left">
              Este é um projeto de back-end desenvolvido como parte do curso de Análise e Desenvolvimento de Sistemas.
              A aplicação implementa um CRUD (Create, Read, Update, Delete) completo para gerenciar uma lista de
              clientes, utilizando tecnologias modernas do ecossistema JavaScript/TypeScript.
            </p>

            <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full mt-4"></div>
          </div>

          {/* Warning Card */}
          <div className="bg-gradient-to-br from-red-50/50 via-orange-50/50 to-red-50/50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-red-900/20 
                          p-6 rounded-2xl shadow-lg border border-red-200 dark:border-red-800/50 
                          hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out 
                          transform cursor-pointer relative overflow-hidden">
            <div className="text-center mb-4 relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-4 shadow-lg mx-auto">
                <span className="text-2xl text-white">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">
                Atenção
              </h2>
            </div>

            <div className="relative z-10">
              <p className="text-red-600 dark:text-red-300 mb-4 text-center leading-relaxed">
                Esta aplicação é uma demonstração.{' '}
                <span className="font-bold underline underline-offset-4 decoration-2 decoration-red-500 dark:decoration-red-400 
                                hover:scale-105 transition-transform duration-200 inline-block">
                  Não insira dados sensíveis
                </span>{' '}
                em nenhum momento.
              </p>

              <p className="text-red-600 dark:text-red-300 mb-4 text-center leading-relaxed">
                Essa aplicação não verifica dados, é puramente uma prova de conceito para fins de estudo, os dados aqui registrados não são utilizados para{' '}
                <span className="font-bold underline underline-offset-4 decoration-2 decoration-red-500 dark:decoration-red-400 
                                hover:scale-105 transition-transform duration-200 inline-block">
                  nada
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Equipe de Desenvolvimento
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Membro 1 */}
            <div 
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 
                        hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out 
                        transform cursor-pointer text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full mb-4 shadow-lg mx-auto">
                <span className="text-2xl text-white">👤</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Jean Caetano
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                0173503
              </p>
            </div>

            {/* Membro 2 */}
            <div 
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 
                        hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out 
                        transform cursor-pointer text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full mb-4 shadow-lg mx-auto">
                <span className="text-2xl text-white">👤</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Alison de Oliveira
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                01735081
              </p>
            </div>

            {/* Membro 3 */}
            <div 
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 
                        hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out 
                        transform cursor-pointer text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full mb-4 shadow-lg mx-auto">
                <span className="text-2xl text-white">👤</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                Pedro Rafael
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                01756899
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Divider */}
        <div className="flex items-center justify-center mt-16 mb-8">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
          <span className="mx-4 text-3xl text-slate-400 dark:text-slate-500 animate-spin" style={{ animationDuration: '20s' }}>
            ★
          </span>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
        </div>
      </div>
    </main>
  );
}

