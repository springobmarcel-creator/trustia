export async function getServerSideProps(context) {
  const { token } = context.params

  return {
    props: { token }
  }
}

export default function Page({ token }) {
  return <div>Token: {token}</div>
}
