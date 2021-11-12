

function Index() {
  if (localStorage.getItem("user") != null)
    console.log(localStorage.getItem("user"));
  else
    console.log("null")
  return (
    <div>
      Hello
      <label id="u"></label>
    </div>
  );
}

export default Index;