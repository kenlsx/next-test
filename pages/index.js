import Link from "next/link";

const Home = ({ data }) => (
  <div>
    <h1>Hello World!</h1>
    <p>Popular TV Shows</p>
    <ul>
      {data.map((tvshow) => {
        return (
          <li key={tvshow.name}>
            <Link href={`/shows/${tvshow.id}`}>{tvshow.name}</Link>
          </li>
        );
      })}
    </ul>
    <Link href="/about">Learn more about us</Link>
  </div>
);

export async function getStaticProps() {
  const res = await fetch("https://api.tvmaze.com/shows?page=1");
  const data = await res.json();
  return { props: { data } };
}

export default Home;
