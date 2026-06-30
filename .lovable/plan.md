## Objetivo
1. Trocar o favicon pela carinha do gatinho enviada.
2. Fazer o formulário enviar os leads para **atendimento@natwell.com.br** (via Resend, domínio `miaucream.com.br`), além de salvar cada lead num banco de dados para nada se perder.

---

## Parte 1 — Favicon
- Copiar a imagem enviada para `public/favicon.png`.
- Remover o `public/favicon.ico` antigo (o navegador o prioriza por padrão).
- Atualizar o `index.html` para referenciar `/favicon.png`.

## Parte 2 — Envio dos leads por e-mail + banco

### Backend (Lovable Cloud)
- Ativar o **Lovable Cloud** (necessário para rodar a função de envio com a chave do Resend protegida no servidor — a chave nunca fica exposta no navegador).
- Criar a tabela `leads` para guardar todos os cadastros: nome, whatsapp, email, perfil (tutor/creator/loja/distribuidor), instagram, empresa, cidade, estado, data. Com as permissões corretas (insert público para o formulário; leitura restrita).
- Criar uma **edge function** `enviar-lead` que:
  - Valida os dados recebidos (com zod) — nome, e-mail, whatsapp obrigatórios.
  - Salva o lead na tabela `leads`.
  - Envia um e-mail via Resend para **atendimento@natwell.com.br**, com remetente `MiauCream <leads@miaucream.com.br>` e um resumo formatado do lead (todos os campos preenchidos).
  - Usa a chave `RESEND_API_KEY` já configurada.

### Frontend
- Atualizar o `handleSubmit` em `src/pages/Index.tsx` para coletar os campos do formulário e chamar a função `enviar-lead` em vez do `setTimeout` simulado.
- Manter o toast de sucesso e o reset do formulário; mostrar toast de erro caso o envio falhe.

---

## Detalhes técnicos
- Remetente: `leads@miaucream.com.br` (domínio verificado por você no Resend). Destinatário fixo: `atendimento@natwell.com.br`.
- A edge function chama a API do Resend (`https://api.resend.com/emails`) com `Authorization: Bearer RESEND_API_KEY`.
- Validação client-side e server-side; nada de dados sensíveis logados.
- Caso o Resend recuse o remetente, ajusto para um subdomínio verificado (ex.: `send.miaucream.com.br`).

## Observação
- O e-mail de contato no rodapé hoje é `contato@miaucream.com.br` — os leads vão para `atendimento@natwell.com.br` conforme pedido; me avise se quiser também copiar (CC) outro endereço.