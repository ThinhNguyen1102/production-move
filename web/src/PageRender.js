import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "./components/NotFound";
import navbarMenuItems from "./components/NavbarMenu/navbarMenuItems";

const generatePage = (pageName) => {
  const component = () => require(`./pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);
  const navbarMenuItemsByRole = navbarMenuItems[auth.user?.role - 1];

  const isCheck = navbarMenuItemsByRole?.some(
    (item) => `/${page}` === item.pageLink
  );
  if (!isCheck) {
    return <NotFound />;
  }

  let pageName = "";
  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }

  return generatePage(pageName);
};

export default PageRender;
