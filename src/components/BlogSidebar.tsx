import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { getCategories, searchPosts, CategoryWithCount } from '@/services/postService';
import { useToast } from '@/hooks/use-toast';
interface Archive {
  id: number;
  month: string;
  count: number;
}

// Dados temporários para os arquivos
const archives: Archive[] = [{
  id: 1,
  month: 'Maio 2025',
  count: 4
}, {
  id: 2,
  month: 'Abril 2025',
  count: 6
}, {
  id: 3,
  month: 'Março 2025',
  count: 8
}, {
  id: 4,
  month: 'Fevereiro 2025',
  count: 5
}, {
  id: 5,
  month: 'Janeiro 2025',
  count: 7
}];
const BlogSidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar as categorias',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [toast]);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast({
        title: 'Atenção',
        description: 'Digite algo para pesquisar',
        variant: 'default'
      });
      return;
    }
    try {
      // Redirecionamos para uma rota específica de pesquisa
      navigate(`/blog/search?q=${encodeURIComponent(searchTerm)}`);
    } catch (error) {
      console.error('Error in search:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível realizar a pesquisa',
        variant: 'destructive'
      });
    }
  };
  return <div className="space-y-8">
      {/* Search Box */}
      <div className="bg-card rounded-md p-5 shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Procurar</h3>
        <form onSubmit={handleSearch} className="flex">
          <input type="text" placeholder="Pesquisar..." className="flex-1 bg-muted rounded-l-md border-y border-l border-border p-2 text-foreground" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <button type="submit" className="bg-primary hover:bg-primary/90 rounded-r-md px-3 animate-hover">
            <Search className="h-5 w-5 text-white" />
          </button>
        </form>
      </div>
      
      {/* Categories */}
      <div className="bg-card rounded-md p-5 shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Categorias</h3>
        {loading ? <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-6 bg-muted rounded animate-pulse"></div>)}
          </div> : <ul className="space-y-2">
            {categories.map((category, index) => <li key={index} className="flex items-center justify-between">
                <Link to={`/blog/${category.slug}`} className="text-foreground hover:text-primary animate-hover">
                  {category.name}
                </Link>
                <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </li>)}
          </ul>}
      </div>
      
      {/* Archives */}
      
    </div>;
};
export default BlogSidebar;