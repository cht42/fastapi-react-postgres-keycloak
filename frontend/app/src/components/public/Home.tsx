import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { Link } from "react-router-dom";

interface target {
  first_name: string;
  last_name: string;
  id: number;
}

const loadAllTargets = async () => {
  return fetch("/api/targets", {
    method: "GET",
  });
};

export const Home: FC = () => {
  const [targets, setTargets] = useState<target[]>([]);
  const [targetsDefault, setTargetsDefault] = useState<target[]>([]);
  const [searched, setSearched] = useState<string>("");

  useEffect(() => {
    document.title = "Home";
    loadAllTargets()
      .then((res) => res.json())
      .then((data) => {
        setTargetsDefault(data);
        setTargets(data);
      })
      .catch(console.error);
  }, []);

  const requestSearch = (searchedVal: string) => {
    const filteredTargets = targetsDefault.filter((target) => {
      const name =
        target.first_name.toLowerCase() + target.last_name.toLowerCase();
      return name.includes(searchedVal.toLowerCase());
    });
    setTargets(filteredTargets);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const listIndiv = targets.map((target) => (
    <Grid item key={target.id}>
      <Card variant="outlined" style={{ maxWidth: 345 }}>
        <Link to={"/targets/" + target.id} component={CardActionArea}>
          <CardMedia style={{ height: 150 }} image="./avatar.jpeg" />
          <CardContent>
            <Typography variant="h5" component="h2">
              {target.first_name + " " + target.last_name}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  ));

  return (
    <>
      <Grid container spacing={5}>
        <Grid
          container
          item
          justify="center"
          direction="column"
          alignItems="center"
        >
          <Grid item>
            <h1>Hello</h1>
          </Grid>
          <Grid item>
            <p>You are on the homepage of your project. Present it here !</p>
          </Grid>
        </Grid>

        <Grid container item justify="center">
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            style={{ width: 600 }}
          />
        </Grid>

        <Grid container item justify="space-evenly" spacing={2}>
          {listIndiv}
        </Grid>
      </Grid>
    </>
  );
};
