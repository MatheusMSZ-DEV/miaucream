import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.25.76';

const DESTINO = 'atendimento@natwell.com.br';
const REMETENTE = 'MiauCream <leads@miaucream.com.br>';

const LeadSchema = z.object({
  nome: z.string().trim().min(1, 'Nome obrigatório').max(100),
  whatsapp: z.string().trim().min(1, 'WhatsApp obrigatório').max(20),
  email: z.string().trim().email('E-mail inválido').max(255),
  perfil: z.enum(['tutor', 'creator', 'loja', 'distribuidor']),
  instagram: z.string().trim().max(50).optional().or(z.literal('')),
  empresa: z.string().trim().max(120).optional().or(z.literal('')),
  cidade: z.string().trim().max(80).optional().or(z.literal('')),
  estado: z.string().trim().max(2).optional().or(z.literal('')),
});

const perfilLabel: Record<string, string> = {
  tutor: 'Tutor de gato',
  creator: 'Creator / Embaixador',
  loja: 'Loja / Pet Shop',
  distribuidor: 'Distribuidor',
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const parsed = LeadSchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const lead = parsed.data;

    // 1. Salvar no banco
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    const { error: dbError } = await supabase.from('leads').insert({
      nome: lead.nome,
      whatsapp: lead.whatsapp,
      email: lead.email,
      perfil: lead.perfil,
      instagram: lead.instagram || null,
      empresa: lead.empresa || null,
      cidade: lead.cidade || null,
      estado: lead.estado || null,
    });
    if (dbError) {
      console.error('Erro ao salvar lead:', dbError.message);
    }

    // 2. Enviar e-mail via Resend
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY não configurada');
    }

    const linhas: string[] = [
      `<strong>Nome:</strong> ${escapeHtml(lead.nome)}`,
      `<strong>WhatsApp:</strong> ${escapeHtml(lead.whatsapp)}`,
      `<strong>E-mail:</strong> ${escapeHtml(lead.email)}`,
      `<strong>Perfil:</strong> ${escapeHtml(perfilLabel[lead.perfil] ?? lead.perfil)}`,
    ];
    if (lead.instagram) linhas.push(`<strong>Instagram:</strong> ${escapeHtml(lead.instagram)}`);
    if (lead.empresa) linhas.push(`<strong>Empresa:</strong> ${escapeHtml(lead.empresa)}`);
    if (lead.cidade) linhas.push(`<strong>Cidade:</strong> ${escapeHtml(lead.cidade)}`);
    if (lead.estado) linhas.push(`<strong>Estado:</strong> ${escapeHtml(lead.estado)}`);

    const html = `
      <div style="font-family: Arial, sans-serif; color:#333; max-width:560px;">
        <h2 style="color:#e8843f;">🐱 Novo lead — Movimento MiauCream</h2>
        <p>${linhas.join('<br/>')}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
        <p style="font-size:12px;color:#999;">Enviado automaticamente pela landing page MiauCream.</p>
      </div>`;

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: REMETENTE,
        to: [DESTINO],
        reply_to: lead.email,
        subject: `Novo lead MiauCream — ${lead.nome} (${perfilLabel[lead.perfil] ?? lead.perfil})`,
        html,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      console.error('Erro Resend:', emailRes.status, errBody);
      return new Response(
        JSON.stringify({ error: 'Falha ao enviar e-mail', details: errBody }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Erro inesperado:', e instanceof Error ? e.message : String(e));
    return new Response(JSON.stringify({ error: 'Erro interno' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
