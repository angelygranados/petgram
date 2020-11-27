import React, { useState, useEffect } from "react";
import { Category } from "../Category";
import { List, Item } from "./styles";

function useCategoriesData() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(function () {
    setLoading(true);
    fetch("https://petgram-server-sandy.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);
  return { categories, loading };
}

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData();
  const [showFixed, setShowFixed] = useState(false);

  useEffect(
    function () {
      const onScroll = (e) => {
        const newShowFixed = window.scrollY > 200;
        showFixed != newShowFixed && setShowFixed(newShowFixed);
      };
      document.addEventListener("scroll", onScroll);
      return () => document.removeEventListener("scroll", onScroll);
    },
    [showFixed]
  );
  const renderList = (fixed) => (
    <List fixed={fixed}>
      {loading ? (
        <Item key="loading">
          <Category />
        </Item>
      ) : (
        categories.map((category) => (
          <Item key={category.id}>
            <Category {...category} path={`/pet/${category.id}`} />
          </Item>
        ))
      )}
    </List>
  );
  return (
    <>
      {renderList()}
      {showFixed && renderList(true)}
    </>
  );
};
