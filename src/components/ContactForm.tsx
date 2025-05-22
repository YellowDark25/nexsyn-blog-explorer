
import React, { useState } from 'react';
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const EMAILJS_SERVICE_ID = 'service_llv3af7'; // Replace with your actual service ID
const EMAILJS_TEMPLATE_ID = 'template_k70ezky'; // Replace with your actual template ID
const EMAILJS_PUBLIC_KEY = 'GnEuGY-_ys0D1UkXp'; // Replace with your actual public key


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
      const webhookUrl = 'https://n8n-wh.nexsyn.com.br/webhook-test/set/lead';
      const webhookPayload = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        empresa: formData.empresa,
        mensagem: formData.mensagem,
        data_envio: new Date().toISOString(),
        origem: 'Site Nexsyn - Blog'
      };

      // Prepare the email template parameters
      const templateParams = {
        to_email: 'kleversonsilva.kl@gmail.com',
        from_name: formData.nome,
        from_email: formData.email,
        phone: formData.telefone,
        company: formData.empresa,
        message: formData.mensagem,
        reply_to: formData.email
      };

      // Envia dados para o webhook
      // Usamos try/catch separado para não interromper o fluxo se o webhook falhar
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload),
        });
        
        // Log para depuração
        console.log('Resposta do webhook:', {
          status: webhookResponse.status,
          statusText: webhookResponse.statusText
        });
      } catch (error) {
        // Apenas loga o erro, mas não impede o fluxo
        console.error('Erro ao enviar para o webhook:', error);
      }

      // Send email using EmailJS
      const emailResult = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (emailResult.status === 200) {
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
      } else {
        throw new Error("Falha ao enviar o email");
      }
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
    <section id="contato" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 font-poppins">ENTRE EM CONTATO</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Information */}
          <div className="bg-card p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6 font-poppins">Você pode nos encontrar aqui</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="text-primary h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:nexsyn@unidadelrv.com.br" className="text-muted-foreground hover:text-primary transition-colors">
                    nexsyn@unidadelrv.com.br
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="text-primary h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">Telefone</h4>
                  <a href="tel:+556592934536" className="text-muted-foreground hover:text-primary transition-colors">
                    +55 65 9293-4536
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="text-primary h-5 w-5 mt-0.5" />
                <div>
                  <h4 className="font-medium">Endereço</h4>
                  <address className="text-muted-foreground not-italic">
                    Sala Comercial Espelhada, Av. Dep. Hitler Sansão – Centro, <br />
                    Barra do Bugres – MT, 78390-000
                  </address>
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium mb-3">Siga-nos</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/nexsyn.oficial/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-card text-foreground hover:text-primary p-2 rounded-full transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://www.youtube.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-card text-foreground hover:text-primary p-2 rounded-full transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6 font-poppins">Envie uma mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  name="telefone"
                  placeholder="Telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  name="empresa"
                  placeholder="Nome da empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Textarea
                  name="mensagem"
                  placeholder="Sua mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={submitting}
              >
                {submitting ? 'Enviando...' : 'Enviar'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
