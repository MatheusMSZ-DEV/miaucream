import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Heart, Sparkles, Droplets, ShieldCheck, Leaf, Users, Store, Crown, Check, Instagram, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroCat from "@/assets/cat-hero.jpg";
import catBond from "@/assets/cat-bond-new.jpg";
import miauLogo from "@/assets/miau-logo.png";

const Index = () => {
  const [profile, setProfile] = useState("tutor");
  const [submitting, setSubmitting] = useState(false);

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);

    const data = new FormData(form);
    const payload = {
      nome: String(data.get("nome") ?? "").trim(),
      whatsapp: String(data.get("whatsapp") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      perfil: profile,
      instagram: String(data.get("insta") ?? "").trim(),
      empresa: String(data.get("empresa") ?? "").trim(),
      cidade: String(data.get("cidade") ?? "").trim(),
      estado: String(data.get("estado") ?? "").trim(),
    };

    try {
      const { error } = await supabase.functions.invoke("enviar-lead", { body: payload });
      if (error) throw error;
      toast.success("Você está no Movimento! 🐱", {
        description: "Em breve você receberá novidades exclusivas da MiauCream.",
      });
      form.reset();
      setProfile("tutor");
    } catch (err) {
      console.error(err);
      toast.error("Ops! Não conseguimos enviar seu cadastro.", {
        description: "Tente novamente em instantes.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <nav className="container flex items-center justify-between py-6">
          <a href="/" className="flex items-center" aria-label="MiauCream">
            <img src={miauLogo} alt="MiauCream — snack cremoso funcional" className="h-32 md:h-44 w-auto" />
          </a>
          <Button onClick={scrollToForm} variant="default" size="sm" className="rounded-full">
            Entre para o Movimento
          </Button>
        </nav>
      </header>

      {/* HERO — SESSÃO 1: MOVIMENTO MIAUCREAM */}
      <section className="relative overflow-hidden bg-gradient-warm pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 bg-gradient-soft pointer-events-none" />
        <div className="container relative grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur px-4 py-1.5 text-xs font-medium text-warm shadow-card">
              <Sparkles className="h-3.5 w-3.5" />
              Movimento MiauCream
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl text-balance">
              Uma nova forma de <span className="italic text-warm">cuidado felino</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              O Movimento MiauCream é uma comunidade formada por pessoas que acreditam em uma nova forma de cuidar dos gatos. Mais do que lançar uma marca, queremos construir uma <span className="text-foreground font-medium">nova cultura de cuidado felino no Brasil</span>.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                { icon: Droplets, t: "Hidratação e prevenção importam" },
                { icon: Leaf, t: "Ingredientes importam" },
                { icon: ShieldCheck, t: "Transparência e cuidado importam" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-peach text-warm">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{t}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-xl text-sm text-muted-foreground leading-relaxed italic">
              Porque nossos gatos confiam em nós e dependem das escolhas que fazemos por eles todos os dias.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={scrollToForm} size="lg" className="rounded-full px-7 shadow-glow">
                Entre para o Movimento
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Comunidade • Benefícios exclusivos • Acesso antecipado
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-glow ring-1 ring-card">
              <img
                src={heroCat}
                alt="Gato fofo saboreando o snack cremoso MiauCream"
                width={1536}
                height={1536}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-card px-5 py-4 shadow-card animate-float">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-peach">
                  <Droplets className="h-5 w-5 text-warm" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Funcional</div>
                  <div className="text-sm font-semibold">Hidratação + cuidado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SESSÃO 2 — MANIFESTO */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-warm">O que acreditamos</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight text-balance">
            Chega de petiscos ultraprocessados!
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            A grande maioria dos petiscos foi criada apenas para estimular consumo.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 max-w-xl mx-auto text-left">
            {[
              "Ingredientes artificiais",
              "Aromatizantes",
              "Espessantes",
              "Fórmulas sem propósito funcional",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-card">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
                  <X className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>

          <p className="mt-10 text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
            Nós acreditamos em uma nova geração de petiscos cremosos: <span className="font-medium">mais naturais, funcionais e pensados para respeitar a natureza felina</span>.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Porque os petiscos podem ser mais que um agrado que gera compulsão… podem fazer parte do <span className="italic text-warm">cuidado diário</span>.
          </p>
        </div>
      </section>

      {/* SESSÃO 3 — MAIS QUE UM PETISCO */}
      <section className="py-24 md:py-32 bg-gradient-warm">
        <div className="container grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-card">
              <img src={catBond} alt="Momento de cuidado e vínculo com o gato" loading="lazy" width={1024} height={1280} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -top-6 -right-6 rounded-2xl bg-warm text-primary-foreground px-5 py-4 shadow-glow max-w-[180px]">
              <div className="text-2xl font-display font-semibold leading-none">100%</div>
              <div className="text-xs mt-1 opacity-90">cuidado, em cada lambida</div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-warm">Mais que um petisco</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight text-balance">
              Mais que um petisco. <br />
              <span className="italic">Um cuidado.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              A MiauCream nasceu para transformar o momento do petisco em um <span className="text-foreground font-medium">ritual de cuidado</span>, unindo:
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { t: "Hidratação e funcionalidade", d: "Ingredientes que apoiam a saúde do dia a dia." },
                { t: "Transparência", d: "Você sabe exatamente o que oferece ao seu gato." },
                { t: "Vínculo através do bem-estar", d: "Um momento de conexão real entre tutor e gato." },
              ].map((b) => (
                <li key={b.t} className="flex gap-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-peach text-warm">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <div>
                    <div className="font-semibold">{b.t}</div>
                    <div className="text-sm text-muted-foreground">{b.d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-card/70 backdrop-blur px-6 py-5 shadow-card">
              <p className="font-display text-lg leading-relaxed">
                Naturalmente cremoso. <br />
                Funcionalmente pensado. <br />
                Feito para gatos. <br />
                Com transparência para tutores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SESSÃO 4 — ENTRE DESDE O COMEÇO */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-warm">Entre desde o começo</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight text-balance">
              Entre para o Movimento MiauCream
            </h2>
            <p className="mt-4 text-muted-foreground">Faça parte da comunidade e receba:</p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {[
              "Acesso antecipado a lançamentos",
              "Benefícios para membros",
              "Descontos especiais",
              "Conteúdos educativos e exclusivos",
              "Participação direta na construção da marca",
            ].map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-card">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-peach text-warm">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-20">
            <h3 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-balance">
              Escolha como participar
            </h3>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Crown, title: "Lista VIP", desc: "Para tutores que querem acompanhar o lançamento desde o início." },
              { icon: Users, title: "Creator / Embaixador", desc: "Para creators apaixonados pelo universo felino e pela missão da marca." },
              { icon: Store, title: "Distribuidores / Lojas", desc: "Para parceiros que querem construir essa nova categoria junto com a MiauCream." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative rounded-3xl bg-card p-8 shadow-card transition-all duration-500 hover:shadow-glow hover:-translate-y-1">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="formulario" className="py-24 md:py-32 bg-gradient-warm">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-warm">Cadastro</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight text-balance">
              Faça parte desde o começo
            </h2>
            <p className="mt-4 text-muted-foreground">Vagas limitadas. Cadastre-se em menos de 1 minuto.</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl bg-card p-8 md:p-10 shadow-card space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" required maxLength={100} placeholder="Como podemos te chamar?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" name="whatsapp" required type="tel" maxLength={20} placeholder="(11) 90000-0000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" required type="email" maxLength={255} placeholder="seuemail@exemplo.com" />
            </div>

            <div className="space-y-3">
              <Label>Como você quer participar?</Label>
              <RadioGroup value={profile} onValueChange={setProfile} className="grid gap-2 md:grid-cols-2">
                {[
                  { v: "tutor", l: "Tutor de gato" },
                  { v: "creator", l: "Creator / Embaixador" },
                  { v: "loja", l: "Loja / Pet Shop" },
                  { v: "distribuidor", l: "Distribuidor" },
                ].map(o => (
                  <label
                    key={o.v}
                    htmlFor={`p-${o.v}`}
                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 cursor-pointer transition-all ${profile === o.v ? "border-warm bg-peach/30" : "border-border hover:border-warm/50"}`}
                  >
                    <RadioGroupItem value={o.v} id={`p-${o.v}`} />
                    <span className="text-sm font-medium">{o.l}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {profile === "creator" && (
              <div className="space-y-2 animate-fade-up">
                <Label htmlFor="insta">Instagram</Label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="insta" name="insta" required maxLength={50} placeholder="@seuperfil" className="pl-10" />
                </div>
              </div>
            )}

            {(profile === "distribuidor" || profile === "loja") && (
              <div className="grid gap-5 md:grid-cols-3 animate-fade-up">
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input id="empresa" name="empresa" required maxLength={120} placeholder="Nome da empresa" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" name="cidade" required maxLength={80} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input id="estado" name="estado" required maxLength={2} placeholder="UF" />
                </div>
              </div>
            )}

            <Button type="submit" size="lg" disabled={submitting} className="w-full rounded-full shadow-glow">
              {submitting ? "Enviando..." : "Quero entrar para o Movimento 🐾"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Seus dados estão seguros. Sem spam, só carinho.
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-warm">FAQ</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight text-balance">
              Perguntas frequentes
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "O que é o Movimento MiauCream?", a: "É uma comunidade formada por pessoas que acreditam em uma nova forma de cuidado felino — onde hidratação, prevenção, ingredientes e transparência importam." },
              { q: "O que é a MiauCream?", a: "A MiauCream é um snack cremoso funcional para gatos, naturalmente cremoso e funcionalmente pensado, que transforma o momento do petisco em um ritual de cuidado." },
              { q: "Quando será o lançamento?", a: "Estamos finalizando os últimos detalhes. Quem entra para o Movimento recebe a data oficial em primeira mão, com condições exclusivas." },
              { q: "Como funciona a parceria creator?", a: "Selecionamos creators apaixonados pelo universo felino para co-criar conteúdo, receber kits e participar de campanhas oficiais da marca." },
              { q: "Como me tornar distribuidor?", a: "Preencha o formulário escolhendo “Distribuidor”. Nosso time comercial entrará em contato com as condições para sua região." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border bg-card px-6 shadow-card">
                <AccordionTrigger className="text-left font-display text-lg font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary px-8 py-16 md:px-16 md:py-20 text-center text-primary-foreground shadow-glow">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white, transparent 40%), radial-gradient(circle at 80% 80%, white, transparent 40%)" }} />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight text-balance">
                Faça parte desde o começo.
              </h2>
              <p className="mt-4 opacity-90 max-w-xl mx-auto">
                Vagas limitadas. Benefícios exclusivos só para quem chegou primeiro.
              </p>
              <Button onClick={scrollToForm} size="lg" variant="secondary" className="mt-8 rounded-full px-8">
                Quero entrar para o Movimento
              </Button>

              <p className="mt-12 font-display text-lg leading-relaxed opacity-90">
                Mais que um petisco. Um cuidado.
              </p>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                Naturalmente cremoso. Funcionalmente pensado. <br className="hidden sm:block" />
                Feito para gatos. Com transparência para tutores.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-warm fill-current" />
            <span>© {new Date().getFullYear()} MiauCream. Feito com carinho para gatos.</span>
          </div>
          <div>contato@miaucream.com</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
