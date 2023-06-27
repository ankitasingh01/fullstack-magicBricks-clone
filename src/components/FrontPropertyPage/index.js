import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBasedProperty from "./SearchBasedProperty";
import FeaturedProjects from "./FeaturedProjects";
import { fetchPosts } from "../reduxState/ListedPropertiesReducer";

const FrontPropertyPage = () => {
  const { updatePostData } = useSelector((state) => state.updateProperty);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  console.log("updatePostData", updatePostData);
  return (
    <Fragment>
      <SearchBasedProperty />
      <FeaturedProjects updatePostData={updatePostData} />
    </Fragment>
  );
};

export default FrontPropertyPage;
