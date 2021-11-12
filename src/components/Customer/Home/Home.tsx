import ListProduct from "../ListProduct";
import TopCategories from "../TopCategories";

function Home() {
  console.log(localStorage.getItem("user"))
  return (
    <div>
      <TopCategories />
      <ListProduct />
    </div>
  );
}

export default Home;