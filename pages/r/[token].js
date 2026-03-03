import { createClient } from '@supabase/supabase-js'

export async function getServerSideProps(context) {
  const { token } = context.params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data } = await supabase
    .from('review_tokens')
    .select('google_review_link')
    .eq('token', token)
    .single()

  if (!data) {
    return { notFound: true }
  }

  return {
    redirect: {
      destination: data.google_review_link,
      permanent: false,
    },
  }
}

export default function RedirectPage() {
  return null
}
