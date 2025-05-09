
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAnalytics } from '@/hooks/use-analytics';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  avatarUrl?: string;
}

interface CommentSectionProps {
  postId: string;
  initialComments?: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  postId, 
  initialComments = [] 
}) => {
  const { toast } = useToast();
  const analytics = useAnalytics();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulates getting the current user
  const currentUser = {
    name: "Visitante",
    avatarUrl: ""
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this to your API
      // const response = await submitComment(postId, newComment);
      
      // For now, we'll just simulate adding a comment
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        author: currentUser.name,
        content: newComment,
        date: new Date().toISOString(),
        avatarUrl: currentUser.avatarUrl
      };
      
      // Add the new comment to the list
      setComments(prevComments => [newCommentObj, ...prevComments]);
      setNewComment('');
      
      // Track the comment submission
      analytics.trackEvent({
        type: 'engagement',
        label: 'comment_submitted',
        metadata: { 
          postId,
          commentLength: newComment.length
        }
      });
      
      toast({
        title: "Comentário enviado",
        description: "Seu comentário foi adicionado com sucesso!",
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar seu comentário. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        Comentários ({comments.length})
      </h3>

      <form onSubmit={handleCommentSubmit} className="mb-8">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Deixe seu comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="mb-3 w-full"
            />
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting || !newComment.trim()}
              >
                {isSubmitting ? "Enviando..." : "Publicar comentário"}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex gap-4 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="flex-1">
                <div className="h-4 w-1/4 bg-muted rounded mb-2"></div>
                <div className="h-3 w-1/6 bg-muted/50 rounded mb-2"></div>
                <div className="h-4 w-full bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{comment.author}</h4>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.date)}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <MessageSquare className="mx-auto h-12 w-12 opacity-20 mb-2" />
          <p>Ainda não há comentários.</p>
          <p className="text-sm">Seja o primeiro a comentar!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
