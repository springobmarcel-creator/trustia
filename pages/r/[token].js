import { createClient } from '@supabase/supabase-js'

export async function getServerSideProps(context) {
  const { token } = context.params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data } = await supabase
    .from('review_tokens')
    .select('salon_id')
    .eq('token', token)
    .single()

  if (!data) {
    return { notFound: true }
  }

  const { data: salon } = await supabase
    .from('salons')
    .select('google_place_id')
    .eq('id', data.salon_id)
    .single()

  if (!salon) {
    return { notFound: true }
  }

  return {
    redirect: {
      destination: `https://search.google.com/local/writereview?placeid=${salon.google_place_id}`,
      permanent: false
    }
  }
}

export default function RedirectPage() {
  return null
}
