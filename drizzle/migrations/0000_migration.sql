CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  guests integer NOT NULL DEFAULT 1,
  rooms integer NOT NULL DEFAULT 1,
  check_in date NOT NULL,
  check_out date NOT NULL,
  nights integer NOT NULL,
  estimated_total integer NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.booked_nights (
  night date PRIMARY KEY,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.booked_nights TO anon, authenticated;
GRANT ALL ON public.booked_nights TO service_role;
ALTER TABLE public.booked_nights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can see which nights are fully booked"
  ON public.booked_nights FOR SELECT TO anon, authenticated USING (true);

CREATE INDEX booking_requests_phone_created_idx ON public.booking_requests (phone, created_at DESC);