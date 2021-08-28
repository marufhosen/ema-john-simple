import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
import { getDatabaseCart } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: data,
      orderTime: new Date(),
    };
    fetch("http://localhost:5000/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log(orderDetails);
  };

  console.log(watch("example"));

  return (
    <div>
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={loggedInUser.name}
          {...register("name", { required: true })}
          placeholder="Name"
        />
        {errors.name && <span className="error">Name is required</span>}
        <input
          defaultValue={loggedInUser.email}
          {...register("email", { required: true })}
          placeholder="Email"
        />
        {errors.email && <span className="error">Email is required</span>}
        <input
          {...register("address", { required: true })}
          placeholder="Address"
        />
        {errors.address && (
          <span className="error">Address is field is required</span>
        )}
        <input
          {...register("phone", { required: true })}
          placeholder="Phone number"
        />
        {errors.phone && (
          <span className="error">Phone Number is required</span>
        )}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Shipment;
