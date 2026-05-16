-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  author TEXT,
  category TEXT NOT NULL CHECK (category IN ('books','courses','apparel')),
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  description TEXT NOT NULL DEFAULT '',
  long_description TEXT NOT NULL DEFAULT '',
  digital BOOLEAN NOT NULL DEFAULT false,
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Admins insert products" ON public.products
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update products" ON public.products
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete products" ON public.products
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed
INSERT INTO public.products (slug, title, author, category, price, description, long_description, digital, images) VALUES
('the-pause','The Pause','Pavulum Press','books',19.99,'A small book about the space between reaction and response.','The Pause is a meditation on the moments we usually miss — the breath before the answer, the silence before the apology. Written for parents, partners, and anyone learning to slow down.',false,ARRAY['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80']),
('radical-softness','Radical Softness','Pavulum Press','books',19.99,'Essays on tenderness as a form of strength.','A collection of essays exploring softness as an act of resistance in a world that rewards hardness.',false,ARRAY['https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80']),
('notes-on-listening','Notes on Listening','Pavulum Press','books',19.99,'Field notes on the lost art of paying attention.','Notes on Listening gathers fragments, journal entries, and short essays about the practice of being heard and hearing others.',false,ARRAY['https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80']),
('parenting-with-presence','Parenting with Presence',NULL,'courses',97,'4 modules · self-paced · worksheets included','A self-paced course for parents who want to show up more fully. Includes downloadable worksheets, journaling prompts, and lifetime access.',true,ARRAY['https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1200&q=80']),
('self-awareness-for-couples','Self-Awareness for Couples',NULL,'courses',127,'6 weeks · guided reflections · community access','A guided 6-week journey for couples — reflections, conversations, and prompts to build self-awareness together.',true,ARRAY['https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1200&q=80']),
('the-pause-hoodie','The Pause Hoodie',NULL,'apparel',68,'Heavyweight cream hoodie with embroidered wordmark.','Made from organic cotton fleece. Garment-dyed for a soft, lived-in feel. Embroidered Pavulum wordmark on the chest.',false,ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80']),
('the-journal-tee','The Journal Tee',NULL,'apparel',34,'Soft cotton tee in warm sand.','A wear-everywhere tee in heavyweight organic cotton. Cut a touch boxy. Garment dyed.',false,ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80']),
('conversation-sweatpants','Conversation Sweatpants',NULL,'apparel',78,'Relaxed fit sweatpants in deep brown.','Heavyweight fleece sweatpants. Tapered leg, drawstring waist, side pockets.',false,ARRAY['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1200&q=80']);