
import React, { useState } from 'react';
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    mensagem: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare the webhook payload
      const webhookUrl = 'https://n8n-wh.nexsyn.com.br/webhook/set/lead';
      const webhookPayload = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        empresa: formData.empresa,
        mensagem: formData.mensagem,
        data_envio: new Date().toISOString(),
        origem: 'Site Nexsyn - Blog'
      };

      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });
      
      if (!webhookResponse.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      toast({
        title: "Mensagem enviada",
        description: "Agradecemos seu contato! Retornaremos em breve.",
      });

      // Reset form
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        mensagem: "",
      });
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 font-poppins text-foreground">Entre em Contato</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* Contact Information */}
          <div className="bg-card p-6 sm:p-7 md:p-8 rounded-xl shadow-sm border border-border/30 w-full h-full">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 font-poppins text-foreground">Você pode nos encontrar aqui</h3>
            
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                  <Mail className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="break-words overflow-hidden">
                  <h4 className="font-medium text-sm sm:text-base text-muted-foreground mb-0.5">Email</h4>
                  <a 
                    href="mailto:nexsyn@unidadelrv.com.br" 
                    className="text-foreground hover:text-primary transition-colors text-sm sm:text-base font-medium break-all"
                  >
                    nexsyn@unidadelrv.com.br
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                  <Phone className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base text-muted-foreground mb-0.5">Telefone</h4>
                  <a 
                    href="tel:+556592934536" 
                    className="text-foreground hover:text-primary transition-colors text-sm sm:text-base font-medium"
                  >
                    +55 65 9293-4536
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0 mt-0.5">
                  <MapPin className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base text-muted-foreground mb-0.5">Endereço</h4>
                  <address className="text-foreground not-italic text-sm sm:text-base leading-snug">
                    <p className="mb-0.5">Sala Comercial Espelhada,</p>
                    <p className="mb-0.5">Av. Dep. Hitler Sansão – Centro,</p>
                    <p>Barra do Bugres – MT, 78390-000</p>
                  </address>
                </div>
              </div>
              
              <div className="pt-3 sm:pt-4">
                <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base text-muted-foreground">Siga-nos</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/nexsyn.oficial/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-muted text-foreground hover:bg-muted/80 hover:text-primary p-2.5 rounded-full transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                  <a 
                    href="https://www.youtube.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-muted text-foreground hover:bg-muted/80 hover:text-primary p-2.5 rounded-full transition-all"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card p-6 sm:p-7 md:p-8 rounded-xl shadow-sm border border-border/30 w-full">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 font-poppins text-foreground">Envie uma mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <Input
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="h-11 sm:h-12 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-11 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <Input
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    className="h-11 sm:h-12 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <Input
                    name="empresa"
                    placeholder="Nome da empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                    className="h-11 sm:h-12 text-sm sm:text-base"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Textarea
                  name="mensagem"
                  placeholder="Sua mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={5}
                  className="text-sm sm:text-base min-h-[120px]"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 transition-all h-12 sm:h-14 text-sm sm:text-base font-medium mt-2 sm:mt-4"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar mensagem'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
