


# Wst Finances

Gerencie suas finanças pessoais com clareza e disciplina usando o método **50/30/20**.
Dashboard em tempo real, gráficos elegantes e uma UX pensada para web e mobile.

> Logo: versões para tema claro e escuro estão em `/public` (ex.: `logo-light.png` e `logo-dark.png`).
> Dica: use `next-themes` para alternar automaticamente o logo de acordo com o tema.

---

<img width="1108" height="929" alt="image" src="https://github.com/user-attachments/assets/3cff440d-5a88-4b4e-8354-1f62b6f1417a" />

## ✨ Funcionalidades

* Autenticação (Supabase Auth – email/senha ou provedores do template)
* **Dashboard do mês** com:

  * Cards de saldo, entradas e despesas
  * Gráfico de barras (receitas/despesas por dia)
  * Gráfico de rosca 50/30/20 (Essenciais, Não essenciais, Investimentos)
  * **Realtime**: atualiza automaticamente ao inserir uma transação
* **Nova transação** via modal (Server Action + validação)
* Categorias flexíveis (mantém presets 50/30/20, mas dá para expandir)
* Layout responsivo (mobile-first) com **shadcn/ui**
* Dark/Light theme

---

## 🧱 Stack

* **Next.js 14** (App Router) + **React** + **TypeScript**
* **Tailwind CSS** + **shadcn/ui**
* **Supabase** (Postgres, Auth, RLS, Realtime)
* **Chart.js** + **react-chartjs-2**

---

## 🚀 Como rodar localmente

### 1) Pré-requisitos

* Node 18+
* NPM ou PNPM

### 2) Clone & Instale

```bash
git clone https://github.com/gabwestside/wst-money
cd wst-money
npm install
```

### 3) Variáveis de ambiente

Crie `.env.local` na raiz com:

```env
NEXT_PUBLIC_SUPABASE_URL=https://wst-money.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ANON-KEY
```

> Se atualizar esse arquivo, reinicie o `npm run dev`.

### 4) Banco de dados (Supabase)

Rode no SQL Editor do Supabase:

```sql
-- Tabela de transações (flexível e escalável)
create table if not exists public.transactions (
  id uuid primary key default uuid_generate_v4(),
  type text check (type in ('income', 'expense')) not null,
  category text not null,
  title text not null,
  amount numeric not null,
  created_at timestamp with time zone default now(),
  user_id uuid references auth.users not null
);

-- RLS
alter table public.transactions enable row level security;

create policy if not exists "Users can view their own transactions"
on public.transactions for select
using (auth.uid() = user_id);

create policy if not exists "Users can insert their own transactions"
on public.transactions for insert
with check (auth.uid() = user_id);

create policy if not exists "Users can update their own transactions"
on public.transactions for update
using (auth.uid() = user_id);

create policy if not exists "Users can delete their own transactions"
on public.transactions for delete
using (auth.uid() = user_id);

-- Índices úteis
create index if not exists idx_transactions_user_created_at
on public.transactions (user_id, created_at desc);
create index if not exists idx_transactions_type on public.transactions (type);
create index if not exists idx_transactions_category on public.transactions (category);
```

**Realtime (opcional, recomendado):**

```sql
alter table public.transactions replica identity full;

do $$
begin
  if not exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    create publication supabase_realtime for table public.transactions;
  else
    alter publication supabase_realtime add table public.transactions;
  end if;
end $$;
```

### 5) Rodar

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🗃️ Estrutura principal

```
app/
  dashboard/
    page.tsx                 # Server Component: auth + fetch de dados
    DashboardClient.tsx      # Client Component: UI, charts e realtime
  actions/
    transactions.ts          # Server Action: inserir transação
components/
  transactions/
    NewTransactionDialog.tsx # Modal + formulário
  ui/                        # shadcn/ui
lib/
  dashboard.ts               # getDashboardData(): totais, séries e buckets
  supabase/
    server.ts                # createClient() no servidor
    client.ts                # getBrowserSupabase() no client (realtime)
public/
  logo-light.png
  logo-dark.png
```

---

## 🔍 Como funciona (visão técnica)

* `app/dashboard/page.tsx` (Server Component)

  * Verifica sessão com `@supabase/ssr`
  * Chama `getDashboardData()` (mês atual) e passa para o cliente
* `lib/dashboard.ts`

  * Consulta `transactions` filtrando por `created_at` dentro do mês
  * Calcula totais, buckets 50/30/20 e séries por dia
* `DashboardClient.tsx` (Client Component)

  * Renderiza cards, **Bar** (diário) e **Doughnut** (50/30/20)
  * **Realtime:** cria canal `postgres_changes` na tabela `transactions` e chama `router.refresh()` ao receber eventos
* `NewTransactionDialog.tsx` + `app/actions/transactions.ts`

  * Form com validação (`zod`)
  * Server Action insere no Supabase e revalida a rota `/dashboard`

> Convenção: `amount` é **positivo** sempre. O campo `type` define receita/ despesa.

---

## 💡 Método 50/30/20

Por padrão, os buckets consideram **apenas despesas**:

* **Essenciais (50%)** → `category = essential` (ou “essencial”)
* **Não essenciais (30%)** → `category = non-essential` (ou “não-essencial”/“nao-essencial”)
* **Investimentos (20%)** → `category = investment` (ou “investimento”)

Você pode usar outras categorias — o app continua funcionando — e ainda assim manter esses três buckets para a visão macro.

---

## 📦 Deploy (Vercel + Supabase)

1. **Vercel → Importar repositório**
2. **Environment Variables (em Production e Preview)**:

   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Supabase → Auth → URL Configuration**

   * Site URL: `https://seu-projeto.vercel.app` (e o domínio próprio, se houver)
   * Additional Redirect URLs: `http://localhost:3000` e `https://*.vercel.app`
4. **Realtime**: certifique-se de ter adicionado `public.transactions` à publicação `supabase_realtime`.

---

## 🧪 Scripts úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Lint
npm run lint
```

---

## 🖼️ Screenshots

Coloque suas imagens em `/public` e referencie aqui:

* Dashboard (claro): `![Dashboard Light](/public/screenshot-dashboard-light.png)`
* Dashboard (escuro): `![Dashboard Dark](/public/screenshot-dashboard-dark.png)`

---

## 🗺️ Roadmap

* [ ] Página de histórico com filtros por período/categoria
* [ ] Exportar CSV
* [ ] Metas e orçamentos por categoria
* [ ] Transações recorrentes
* [ ] Multi-contas (ex.: conta principal, VA/VR, gasolina)
* [ ] PWA (instalável no celular)
* [ ] Notificações (ex.: ao ultrapassar orçamento)

---

## 🤝 Contribuindo

1. Faça um fork
2. Crie uma branch: `feat/minha-feature`
3. Commit: `feat: descreva sua mudança`
4. Pull request 🙌

---

## 📝 Licença

MIT — use à vontade. Dê um ⭐ no repositório se curtir!

## 🙏 Agradecimento
- Um projeto criado com a inspiração de [Sujeito Programador](https://www.youtube.com/@Sujeitoprogramador/playlists) e [Rocketseat]([https://www.youtube.com/@Sujeitoprogramador/playlists](https://www.youtube.com/@rocketseat/playlists))
