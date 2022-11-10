import { useRouter } from "next/router";

const TVShow = ({ data }) => {
  return (
    <div>
      <h3>{data.name}</h3>
      <div>{data.summary.replace(/<\/?[^>]+(>|$)/g, "")}</div>
      <p>Language: {data.language}</p>
      <p>Status: {data.status}</p>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch("https://api.tvmaze.com/shows?page=1");
  const data = await res.json();

  //Get the available TV show IDs
  const paths = data.map((tvshow) => {
    return { params: { tvshow: tvshow.id.toString() } };
  });

  //Pass the paths to prerender their content at build time
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  //Params points to each TV show ID we retrieved in getStaticPaths

  //Retrieve data for the TV show with the given ID
  const res = await fetch(`https://api.tvmaze.com/shows/${params.tvshow}`);
  const data = await res.json();

  //Return the data as a prop to TVShow component
  return { props: { data } };
}

export default TVShow;
