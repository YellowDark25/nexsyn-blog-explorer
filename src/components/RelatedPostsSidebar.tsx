
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types/Post';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { slugToReadable } from '@/utils/formatUtils';

interface RelatedPostsSidebarProps {
  category: string;
  relatedPosts: Post[];
}

const RelatedPostsSidebar: React.FC<RelatedPostsSidebarProps> = ({
  category,
  relatedPosts
}) => {
  const formattedCategory = slugToReadable(category);
  
  return (
    <div className="sticky top-24 space-y-4">
      {/* Related Posts */}
      <Card className="border-border/40 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-primary">Artigos Relacionados</CardTitle>
          <CardDescription className="text-xs">
            Mais sobre {formattedCategory}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {relatedPosts.length > 0 ? (
            relatedPosts.map(post => (
              <Link key={post.id} to={`/posts/${post.slug}`} className="block group">
                <div className="flex gap-3 items-start">
                  <div className="h-14 w-14 flex-shrink-0 rounded-md overflow-hidden">
                    <img 
                      src={post.imagem_destaque} 
                      alt={post.titulo}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {post.titulo}
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {format(parseISO(post.data_publicacao), 'dd MMM yyyy', { locale: ptBR })}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">Nenhum artigo relacionado encontrado.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild variant="ghost" size="sm" className="w-full">
            <Link to={`/blog/${category}`} className="flex justify-between w-full">
              <span>Ver mais artigos</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Advertisement */}
      <Card className="border-border/40 shadow-md overflow-hidden">
        <Link 
          to="https://api.whatsapp.com/send/?phone=556592934536&text=Eu+tenho+interesse+no+Sistema+da+NEXSYN%21&type=phone_number&app_absent=0" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <div className="relative h-64 overflow-hidden group">
            <img 
              src="/lovable-uploads/45346a3d-16d1-4d5a-9158-3dfba5c3c19c.png"
              alt="Sistema NEXSYN PDV - Fale conosco pelo WhatsApp"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-lg mb-1">Sistema PDV Legal</h3>
              <p className="text-white/90 text-sm mb-3">Simplifique sua operação. Fale com um especialista!</p>
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-sm">
                Falar via WhatsApp
              </Button>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default RelatedPostsSidebar;
