import React from "react";
import { Grid, Icon, List } from "semantic-ui-react";

const ProductIconGroup = () => {
  return (
    <>
      <List celled horizontal>
        <List.Item>
          <Icon name="redo alternate" color="orange" size="small" />
          something
        </List.Item>
        <List.Item>
          <Icon name="redo alternate" color="orange" size="small" />
          something
        </List.Item>
        <List.Item>
          <Icon name="redo alternate" color="orange" size="small" />
          something
        </List.Item>
      </List>
    </>
  );
};

export default ProductIconGroup;
