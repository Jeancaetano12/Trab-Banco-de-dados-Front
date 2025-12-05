// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white p-6 fixed left-0 top-0  shadow-2xl border-r border-slate-700">

      <div className="mb-10">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          DB Manager
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-1"></div>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        <Link 
          href="/" 
          className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-700/30 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 hover:text-cyan-300 border border-transparent hover:border-cyan-500/30 transition-all duration-300 ease-out transform hover:-translate-x-1">
          <span className="text-xl">🏠</span>
          <span className="font-medium">Home</span>
        </Link>
        
        <Link 
          href="/pages/funcionarios" 
          className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-700/30 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 
                    hover:text-cyan-300 border border-transparent hover:border-cyan-500/30 transition-all duration-300 
                    ease-out transform hover:-translate-x-1"
        >
          <span className="text-xl">👥</span>
          <span className="font-medium">Funcionários</span>
        </Link>
        
        <Link 
          href="/pages/projetos" 
          className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-700/30 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 
                    hover:text-cyan-300 border border-transparent hover:border-cyan-500/30 transition-all duration-300 
                    ease-out transform hover:-translate-x-1"
        >
          <span className="text-xl">📋</span>
          <span className="font-medium">Projetos</span>
        </Link>
      </nav>
    </aside>
  );
}