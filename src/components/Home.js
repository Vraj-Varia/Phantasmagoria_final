import Portfolio from "./Portfolio";
import Stories from "./Stories";


function Home({ scrollY }) {



  return (
    <>
      <Portfolio scrollY={scrollY} />
      {/* <Stories /> */}
    </>
  );

}

export default Home;
