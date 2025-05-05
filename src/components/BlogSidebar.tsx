
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface Archive {
  id: number;
  month: string;
  count: number;
}

const categories: Category[] = [
  { id: 1, name: 'Gestão Interna', slug: 'gestao-interna', count: 12 },
  { id: 2, name: 'Tecnologia', slug: 'tecnologia', count: 8 },
  { id: 3, name: 'Foodservice', slug: 'foodservice', count: 10 },
  { id: 4, name: 'Inteligência Artificial', slug: 'inteligencia-artificial', count: 5 },
  { id: 5, name: 'Empresas Alimentícias', slug: 'empresas-alimenticias', count: 7 },
];

const archives: Archive[] = [
  { id: 1, month: 'Maio 2025', count: 4 },
  { id: 2, month: 'Abril 2025', count: 6 },
  { id: 3, month: 'Março 2025', count: 8 },
  { id: 4, month: 'Fevereiro 2025', count: 5 },
  { id: 5, month: 'Janeiro 2025', count: 7 },
];

const BlogSidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // In a real application, this would trigger a search query
  };
  
  return (
    <div className="space-y-8">
      {/* Search Box */}
      <div className="bg-card rounded-md p-5 shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Procurar</h3>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-muted rounded-l-md border-y border-l border-border p-2 text-foreground"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="bg-primary hover:bg-primary/90 rounded-r-md px-3 animate-hover">
            <Search className="h-5 w-5 text-white" />
          </button>
        </form>
      </div>
      
      {/* Categories */}
      <div className="bg-card rounded-md p-5 shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Categorias</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id} className="flex items-center justify-between">
              <Link 
                to={`/blog/${category.slug}`} 
                className="text-foreground hover:text-primary animate-hover"
              >
                {category.name}
              </Link>
              <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                {category.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Archives */}
      <div className="bg-card rounded-md p-5 shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Arquivos</h3>
        <ul className="space-y-2">
          {archives.map(archive => (
            <li key={archive.id} className="flex items-center justify-between">
              <Link 
                to={`/archive/${archive.id}`}
                className="text-foreground hover:text-primary animate-hover"
              >
                {archive.month}
              </Link>
              <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                {archive.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
