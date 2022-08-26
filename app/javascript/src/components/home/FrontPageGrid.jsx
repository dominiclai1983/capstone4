import React from "react";
import { Grid, Image } from "semantic-ui-react";

import "@src/css/utils.scss";

const FrontPageGrid = () => {
  return (
    <Grid columns={3} divided>
      <Grid.Row className="mt-4">
        <Grid.Column>
          <Image src="https://via.placeholder.com/429x164.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="https://via.placeholder.com/429x164.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="https://via.placeholder.com/429x164.png" />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Image src="https://via.placeholder.com/429x164.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="https://via.placeholder.com/429x164.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="https://via.placeholder.com/429x164.png" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FrontPageGrid;
