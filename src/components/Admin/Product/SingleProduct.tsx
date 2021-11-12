
import axios from "axios";
import { useEffect, useState } from "react";
import "./SingleProduct.scss";
import img from "./default-image.jpg";
import { useParams } from "react-router";
import AlertSuccess from "../../share/AlertSuccess";
const SingleProduct: React.FC = (props) => {
  const initProduct = {
    product_name: "",
    price: "",
    description: "",
    image: [] as any[],
    category_id: "1",
    tag_id: "1"
  }

  interface ParamsType {
    id: string
  }

  const [errors, setErrors] = useState([] as any[]);
  const [image, setImage] = useState([] as any[]);
  const { id } = useParams<ParamsType>();
  const [type, setType] = useState(1);
  const [categories, setCategories] = useState([] as any[]);
  const [product, setProduct] = useState(initProduct);

  function handleInputImageProductChange(event: React.FormEvent<HTMLInputElement>) {
    const a = event.currentTarget.files;
    let images = [] as any[];
    Array.prototype.forEach.call(event.currentTarget.files, function (file) {
      images.push(file);
    });
    setProduct({ ...product, "image": images });
    let Image1 = document.getElementById("image1") as HTMLImageElement;
    let Image2 = document.getElementById("image2") as HTMLImageElement;
    console.log(typeof product.image)
    if (images[0]) {
      Image1.src = URL.createObjectURL(images[0]);
    }
    if (images[1])
      Image2.src = URL.createObjectURL(images[1]);
  }

  function handleInputProductChange(event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setProduct({ ...product, [name]: value });
  }

  function handleSelectProductChange(event: React.FormEvent<HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    setProduct({ ...product, [name]: value });
  }

  function handleTextAreaProductChange(event: React.FormEvent<HTMLTextAreaElement>) {
    const { name, value } = event.currentTarget;
    setProduct({ ...product, [name]: value });
  }

  function handleProductSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(product);
    const requestUrl = "https://rubyclosetapi.herokuapp.com/api/v1/products"
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("price", product.price);
    let Image2 = document.getElementById("image1") as HTMLImageElement;
    if (type == 2 && product.image[0] !== null) {
      formData.append("image1", product.image[0]);
      formData.append("image2", product.image[1]);
    }

    formData.append("category_id", product.category_id);
    formData.append("description", product.description);
    formData.append("tag_id", product.tag_id);
    if (type == 2) {
      axios.post(requestUrl, formData)
        .then(res => {
          const resJSON = JSON.parse(JSON.stringify(res.data));
          if (resJSON.success) {
            console.log(res.data);
            window.location.href = "/admin/products";
          }
          else {
            let errors: any[] = resJSON.errors;
            let list: any[] = [];
            Object.entries(errors).forEach(
              ([key, value]) => {
                list.push(key + " " + value);
              }
            );
            setErrors(list);
          }
        })
    } else {
      axios.patch(requestUrl + "/" + id, formData)
        .then(res => {
          const resJSON = JSON.parse(JSON.stringify(res.data));
          if (resJSON.success) {
            console.log(res.data);
            window.location.href = "/admin/products";
          }
          else {
            let errors: any[] = resJSON.errors;
            let list: any[] = [];
            Object.entries(errors).forEach(
              ([key, value]) => {
                list.push(key + " " + value);
              }
            );
            setErrors(list);
          }
        })
    }
  }


  useEffect(() => {

    const url = "https://rubyclosetapi.herokuapp.com/api/v1/products/" + id;

    axios.get(url)
      .then(res => {
        const resJSON = JSON.parse(JSON.stringify(res.data));
        if ((typeof resJSON.product) !== "undefined") {
          console.log(resJSON);
          setProduct(resJSON.product);
          setCategories(resJSON.categories);
          setImage(resJSON.image)
        } else {
          axios.get("https://rubyclosetapi.herokuapp.com/api/v1/categories")
            .then(res => setCategories(res.data))
          setType(2);
        }
      })
    console.log(typeof product.image)
  }, [])
  return (
    <div >
      <form style={{ display: "flex", height: 800 }} onSubmit={handleProductSubmit} className="table-user bg-light">
        <div className="col-md-4 table-user product_detail">
          {
            image.length > 0 ?
              (
                <div className="col-md-12" style={{ display: "flex" }}>
                  <div className="col-md-5 image table-user" >
                    <img src={"https://rubyclosetapi.herokuapp.com/" + image[0]} id="image1" alt="" />
                  </div>
                  <div className="col-md-5 image table-user">
                    <img src={"https://rubyclosetapi.herokuapp.com/" + image[1]} id="image2" alt="" />
                  </div>
                </div>) :
              (
                <div className="col-md-12" style={{ display: "flex" }}>
                  <div className="col-md-5 image table-user" >
                    <img src={img} id="image1" alt="" />
                  </div>
                  <div className="col-md-5 image table-user">
                    <img src={img} id="image2" alt="" />
                  </div>
                </div>
              )
          }


          <input type="file" className="form-control" name="file" onChange={handleInputImageProductChange} id="file" multiple />
        </div>
        <div className="col-md-7 table-user product_detail">
          <div className="col-md-12">
            <AlertSuccess errors={errors} />
          </div>
          <label htmlFor="">Name</label>
          <input type="text" name="product_name" defaultValue={product.product_name} onChange={handleInputProductChange} className="form-control" />
          <label htmlFor="">Price</label>
          <input type="text" name="price" defaultValue={product.price} onChange={handleInputProductChange} className="form-control" />
          <label htmlFor="">Description</label>

          <textarea defaultValue={product.description} onChange={handleTextAreaProductChange} name="description" className="form-control" />
          <label htmlFor="">Categories</label>
          <select className="form-control" onChange={handleSelectProductChange} name="category_id" id="category_id">
            {categories.map(cate => (
              <option key={cate.id} value={cate.id}>{cate.category_name}</option>
            ))}
          </select>
          <div className="col-md-12 btn-submit" >
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>

        </div>

      </form >
    </div >
  );
}

export default SingleProduct;