// components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-800 text-white p-4 fixed left-0 top-0">
      <h2 className="text-2xl font-bold mb-6">DB Manager</h2>
      
      <nav className="flex flex-col gap-4">
        <Link href="/" className="hover:text-cyan-400 transition-colors">
          Home
        </Link>
        <Link href="/pages/funcionarios" className="hover:text-cyan-400 transition-colors">
          Funcionarios
        </Link>
        <Link href="/pages/projetos" className="hover:text-cyan-400 transition-colors">
          Projetos
        </Link>
        <Link href="/pages/alocacoes" className="hover:text-cyan-400 transition-colors">
          Alocações
        </Link>
      </nav>
    </aside>
  );
}