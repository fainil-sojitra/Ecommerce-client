import React, { useEffect, useState } from "react";
import "../../styles/editAddress.css";
import Header from "../Header/Header";
import SideBar from "../Settings/Sidebar/SideBar";
import Footer from "../Footer/Footer";
import Tablet from "./Tablet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditAddress = () => {
  const [width] = useWindowSize();
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState([]);
  const [data, setData] = useState({
    pincode: "",
    state: "",
    address: "",
    locality: "",
    city: "",
    address_type: "",
  });

  const navigate = useNavigate();

  function useWindowSize() {
    const [size, setSize] = useState([window.innerWidth]);

    useEffect(() => {
      getUser();
      const handleResize = () => setSize([window.innerWidth]);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    return size;
  }

  const getUser = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("client_img"));
      const response = await axios.get(
        `${process.env.REACT_APP_API}/get-user/${userData.register._id}`
      );
      setUser(response.data[0]);
      setAddress(response.data[0].registration[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (_id) => {
    // if (validateForm()) {

    const token = JSON.parse(localStorage.getItem("client_login_token"));
    const config1 = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/update-shipping-address/${_id}`,
        data,
        config1
      );
      setData(response.data);
      navigate("/setting");
    } catch (error) {
      console.error("Error updating data:", error);
    }
    // }
  };

  return (
    <>
      <Header />
      {width <= 899 ? (
        <div className="tablet_main_container">
          <Tablet />
          <div className="container mt-5">
            <div className="row pb-3">
              <div className="col-12">
                <h1 className="fw-light">Edit Address</h1>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 contact_div">
                <h4 className="fw-light text-muted">Contact</h4>
                <p className="border-top"></p>
                <div>
                  <label className="small text-muted fw-light">Name*</label>
                  <p className="border-bottom fw-bold">
                    {user.first_name}&nbsp;
                    {user.last_name}
                  </p>
                  <label className="small text-muted fw-light">Mobile</label>
                  <p className="border-bottom fw-bold">{user.mobileNo}</p>
                </div>
              </div>
              <div className="col-6 address_div">
                <h4 className="fw-light text-muted">Addresses</h4>
                <p className="border-top"></p>
                <form className="form-horizontal">
                  <div>
                    <div className="row">
                      <div className="col-6">
                        <label
                          for="exampleInputEmail1"
                          className="small fw-light"
                        >
                          Pincode*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Pincode"
                          className="form-control mb-4"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="pincode"
                          value={data.pincode}
                          onChange={(e) =>
                            setData({
                              ...data,
                              pincode: e.target.value.trim(),
                            })
                          }
                        />
                      </div>
                      <div className="col-6">
                        <label
                          for="exampleInputEmail1"
                          className="small fw-light"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          placeholder="Enter State"
                          className="form-control mb-4"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="state"
                          value={data.state}
                          onChange={(e) =>
                            setData({
                              ...data,
                              state: e.target.value.trim(),
                            })
                          }
                        />
                      </div>
                    </div>
                    <label for="exampleInputEmail1" className="small fw-light">
                      Address(House No, Building, Street, Area)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Address"
                      className="form-control mb-4"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="address"
                      value={data.address}
                      onChange={(e) =>
                        setData({
                          ...data,
                          address: e.target.value.trim(),
                        })
                      }
                    />
                    <label for="exampleInputEmail1" className="small fw-light">
                      Locality/Town
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Locality/Town"
                      className="form-control mb-4"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="locality"
                      value={data.locality}
                      onChange={(e) =>
                        setData({
                          ...data,
                          locality: e.target.value.trim(),
                        })
                      }
                    />
                    <label for="exampleInputEmail1" className="small fw-light">
                      City/District*
                    </label>
                    <input
                      type="text"
                      placeholder="Enter City/District"
                      className="form-control mb-4"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="city"
                      value={data.city}
                      onChange={(e) =>
                        setData({
                          ...data,
                          city: e.target.value.trim(),
                        })
                      }
                    />
                    <div className="form-check form-check-inline mb-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio1"
                        // name="inlineRadioOptions"
                        // value="option1"
                        name={data.address_type}
                        value="Home"
                        onChange={(e) =>
                          setData({
                            ...data,
                            address_type: e.target.value.trim(),
                          })
                        }
                      />
                      <label className="form-check-label" for="inlineRadio1">
                        Home
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio2"
                        // value="option2"
                        // name="address_type"
                        name={data.address_type}
                        value="Office"
                        onChange={(e) =>
                          setData({
                            ...data,
                            address_type: e.target.value.trim(),
                          })
                        }
                      />
                      <label className="form-check-label" for="inlineRadio2">
                        Office
                      </label>
                    </div>
                    <div className="d-grid gap-2 mb-4">
                      <button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit(address._id);
                        }}
                        className="btn btn-outline-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="main_container">
          <div className="row">
            <div className="col-2 list_item_div">
              <SideBar />
            </div>
            <div className="col-10">
              <div className="container">
                <div className="row pb-3">
                  <div className="col-12">
                    <h1 className="fw-light">Edit Address</h1>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <h4 className="fw-light text-muted">Contact</h4>
                    <p className="border-top"></p>
                    <div>
                      <label className="small text-muted fw-light">Name</label>
                      <p className="border-bottom fw-bold">
                        {user.first_name}&nbsp;
                        {user.last_name}
                      </p>
                      <label className="small text-muted fw-light">
                        Mobile
                      </label>
                      <p className="border-bottom fw-bold">{user.mobileNo}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <h4 className="fw-light text-muted">Addresses</h4>
                    <p className="border-top"></p>
                    <form className="form-horizontal">
                      <div>
                        <div className="row">
                          <div className="col-6">
                            <label
                              for="exampleInputEmail1"
                              className="small fw-light"
                            >
                              Pincode*
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Pincode"
                              className="form-control mb-4"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              name="pincode"
                              value={data.pincode}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  pincode: e.target.value.trim(),
                                })
                              }
                            />
                          </div>
                          <div className="col-6">
                            <label
                              for="exampleInputEmail1"
                              className="small fw-light"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              placeholder="Enter State"
                              className="form-control mb-4"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              name="state"
                              value={data.state}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  state: e.target.value.trim(),
                                })
                              }
                            />
                          </div>
                        </div>
                        <label
                          for="exampleInputEmail1"
                          className="small fw-light"
                        >
                          Address(House No, Building, Street, Area)
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Address"
                          className="form-control mb-4"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="address"
                          value={data.address}
                          onChange={(e) =>
                            setData({
                              ...data,
                              address: e.target.value.trim(),
                            })
                          }
                        />
                        <label
                          for="exampleInputEmail1"
                          className="small fw-light"
                        >
                          Locality/Town
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Locality/Town"
                          className="form-control mb-4"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="locality"
                          value={data.locality}
                          onChange={(e) =>
                            setData({
                              ...data,
                              locality: e.target.value.trim(),
                            })
                          }
                        />
                        <label
                          for="exampleInputEmail1"
                          className="small fw-light"
                        >
                          City/District*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter City/District"
                          className="form-control mb-4"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="city"
                          value={data.city}
                          onChange={(e) =>
                            setData({
                              ...data,
                              city: e.target.value.trim(),
                            })
                          }
                        />
                        <div className="form-check form-check-inline mb-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="inlineRadio1"
                            // name="inlineRadioOptions"
                            // value="option1"
                            name={data.address_type}
                            value="Home"
                            onChange={(e) =>
                              setData({
                                ...data,
                                address_type: e.target.value.trim(),
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            for="inlineRadio1"
                          >
                            Home
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="inlineRadio2"
                            // value="option2"
                            // name="address_type"
                            name={data.address_type}
                            value="Office"
                            onChange={(e) =>
                              setData({
                                ...data,
                                address_type: e.target.value.trim(),
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            for="inlineRadio2"
                          >
                            Office
                          </label>
                        </div>
                        <div className="d-grid gap-2 mb-4">
                          <button
                            type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSubmit(address._id);
                            }}
                            className="btn btn-outline-primary"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default EditAddress;