import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../App";
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
    console.log("Form submitted: ", data);
  };

//   console.log(watch("example"));

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={loggedInUser.displayName}
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
      {errors.phone && <span className="error">Phone Number is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
