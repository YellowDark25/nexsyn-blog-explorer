
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
    <div className="sticky top-6 sm:top-8 md:top-24 space-y-4 sm:space-y-5 lg:space-y-6">
      {/* Related Posts */}
      <Card className="border-border/30 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2 px-4 sm:px-5 pt-4 sm:pt-5">
          <CardTitle className="text-base sm:text-lg font-semibold text-foreground">Artigos Relacionados</CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Mais sobre {formattedCategory}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-5 py-2 sm:py-3">
          {relatedPosts.length > 0 ? (
            relatedPosts.map(post => (
              <Link 
                key={post.id} 
                to={`/posts/${post.slug}`} 
                className="block group hover:bg-muted/30 rounded-lg transition-colors -mx-2 px-2 py-1.5"
              >
                <div className="flex gap-3 items-start">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden border border-border/30">
                    <img 
                      src={post.imagem_destaque} 
                      alt={post.titulo}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-xs sm:text-sm line-clamp-2 group-hover:text-primary transition-colors text-foreground">
                      {post.titulo}
                    </h3>
                    <p className="text-[10px] xs:text-[11px] text-muted-foreground mt-1">
                      {format(parseISO(post.data_publicacao), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-muted-foreground text-sm py-2">Nenhum artigo relacionado encontrado.</p>
          )}
        </CardContent>
        <CardFooter className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className="w-full border-border/50 hover:border-primary/50 text-xs sm:text-sm h-9 sm:h-10"
          >
            <Link to={`/blog/${category}`} className="flex items-center justify-center gap-1.5">
              <span>Ver mais artigos</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-0.5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Advertisement */}
      <Card className="border-border/30 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <Link 
          to="https://api.whatsapp.com/send/?phone=556592934536&text=Venho%20através%20do%20blog%2C%20tenho%20interesse%20no%20sistema%20PDVLegal%21&type=phone_number&app_absent=0" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group"
          aria-label="Conheça o Sistema PDV Legal - Fale conosco pelo WhatsApp"
        >
          <div className="relative aspect-[4/5] sm:aspect-[4/5] overflow-hidden">
            <img 
              src="/lovable-uploads/45346a3d-16d1-4d5a-9158-3dfba5c3c19c.png"
              alt="Sistema NEXSYN PDV - Fale conosco pelo WhatsApp"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
              <h3 className="text-white font-bold text-base sm:text-lg mb-1.5 leading-tight">Sistema PDV Legal</h3>
              <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4 leading-snug">
                Simplifique sua operação. Fale com um especialista!
              </p>
              <Button 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 text-xs sm:text-sm h-9 sm:h-10 font-medium"
              >
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
