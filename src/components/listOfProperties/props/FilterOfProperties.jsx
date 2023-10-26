import { useNavigate } from "react-router-dom";
import Button from "../../../common/Button";
import Label from "../../../common/Label";
import Layout from "../../../common/Layout";
import "../../../../styles/listofprops.scss";
import Properties from "./Property/Properties";
import { useEffect, useState } from "react";
import axios from "../../../axios.config";
import baseUrl from "../../../constants/config";
import { useDispatch } from "react-redux";
import { storeProperties } from "../../../redux/search.slice";
import { Loader } from "../../../common/Loader";

export const FilterOfProperties = () => {
  const [filterState, setFilterState] = useState({
    dld_fee: "",
    exchange_rate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add", { replace: true });
  };

  const handleChangeFilters = (e) => {
    setFilterState({ ...filterState, [e.target.name]: e.target.value });
  };

  const onSaveFilters = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${baseUrl}/admin/config/update`, filterState);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getAllProperties = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/property/getAll`);
        setProperties(response.data.data.property);
        const { dld_fee, exchange_rate } = response.data.data.config;
        setFilterState({ dld_fee, exchange_rate });
      } catch (error) {
        setIsLoading(false);
      }
    };
    getAllProperties();
  }, []);

  useEffect(() => {
    dispatch(storeProperties(properties));
  }, [dispatch, properties]);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Layout>
        <div className="frame-18">
          <h1 className="h1-list-of-props">List Of Properties</h1>
          <div className="button-container-list-of-props">
            <Button className={"btn-list-of-props"} clickHandler={handleClick}>
              <Label className={"label-for-btn-list-of-props"}>Add New</Label>
            </Button>
          </div>
        </div>
        <div className="global-fee-exchange">
          <div className="fee-exchange-container">
            <div className="dld-container">
              <Label className="dld-fee-label">DLD Fee</Label>
              <div>
                <input
                  className="dld-fee-input"
                  type="text"
                  name="dld_fee"
                  value={filterState.dld_fee || ""}
                  onChange={handleChangeFilters}
                />
                <span className="dld-icon">%</span>
              </div>
            </div>
            <div className="exchange-container">
              <Label className="exchange-label">Exchange Rate</Label>
              <input
                className="exchange-input"
                type="text"
                name="exchange_rate"
                value={filterState.exchange_rate || ""}
                onChange={handleChangeFilters}
              />
              <span className="exchange-icon">= 1 USD</span>
            </div>
            <Button
              className={
                filterState.exchange_rate && filterState.dld_fee
                  ? "fee-exchange-button"
                  : "fee-exchange-disabled"
              }
              clickHandler={onSaveFilters}
            >
              <span className="text-fee-button">Save Changes</span>
            </Button>
          </div>
        </div>
        <Properties />
      </Layout>
    </>
  );
};
