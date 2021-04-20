import { GetStaticProps } from 'next';
import Head from 'next/head';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | PodCastr</title>
      </Head>
      <div>
        <h1>Index</h1>
        <p />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
