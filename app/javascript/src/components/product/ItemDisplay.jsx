//here is partly of the component for displaying product, the layout of the listing product
import React, { useState, useEffect } from "react";
import { Card, Image, Container } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const src = "https://react.semantic-ui.com/images/avatar/large/daniel.jpg";

const ItemDisplay = (props) => {
  const { sortingType } = props;
  const { pathname } = useLocation();
  const path = pathname.substring(1);
  const [code, setCode] = useState("");
  const [CodeID, setCodeID] = useState("");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/codes/${path}`);
        let { ...code } = result.data.code;
        setCodeID(code.code_id);
        setCode(code.code);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/products/${CodeID}/cat?page=1`);
        //cat is needed. pls refer to route
        setProducts(result.data.products);
        setTotalPages(result.data.total_pages);
        setNextPage(result.data.next_page);
        console.log(result.data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [code]);

  const sortingProduct = () => {
    let sortedProducts = products;

    if (sortingType === "asce") {
      sortedProducts = sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sortingType === "desc") {
      sortedProducts = sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    return sortedProducts;
  };

  const items = sortingProduct().map((product, index) => {
    return (
      <Card key={index}>
        <Image src={src} as={Link} to={"/product/" + product.sku} />
        <Card.Content>
          <Card.Header>{product.title}</Card.Header>
          <Card.Description textAlign="right">
            ${product.price}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  });

  return (
    <Container style={{ marginTop: 20 }}>
      <Card.Group itemsPerRow={3}>
        {items}
        {/* <Loader active inline='centered' /> */}
      </Card.Group>
    </Container>
  );
};

export default ItemDisplay;
