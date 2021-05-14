import React, { FC, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Grid, Paper, Typography, } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";

interface individual {
  name: string;
  id: number;
}

const data: individual[] = [
  { name: "Cyprien Huet", id: 1 },
  { name: "Bob California", id: 2 },
  { name: "Mick Truy", id: 3 },
  { name: "FX Jone", id: 4 },
  { name: "Popey Tole", id: 5 },
  { name: "Tom Jersey", id: 6 },
];

export const Home: FC = () => {
  const [indiv, setIndiv] = useState<individual[]>(data);
  const [searched, setSearched] = useState<string>("");

  useEffect(() => {
    document.title = "Home";
  });

  const requestSearch = (searchedVal: string) => {
    console.log(searchedVal);
    const filteredIndiv = data.filter((indiv) => indiv.name.toLowerCase().includes(searchedVal.toLowerCase()));
    setIndiv(filteredIndiv);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };


  const listIndiv = indiv.map((indiv) => (
    <Grid item>
      <Card variant="outlined">
        <CardHeader title={indiv.name} />
        <CardContent>
          <Typography component="h1" variant="h5">
            <em>Information</em>
          </Typography>
        </CardContent>
      </Card>
    </Grid>));

  return (
    <>
      <Grid container spacing={5} >
        <Grid container item justify="center" direction="column" alignItems="center">
          <Grid item>
            <h1>Hello</h1>
          </Grid>
          <Grid item>
            <p>You are on the homepage of your project. Present it here !</p>
          </Grid>
        </Grid >

        <Grid container item justify="center">
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            style={{ width: 600 }}
          />
        </Grid>

        <Grid container item justify="space-evenly" spacing={2} >
          {listIndiv}
        </Grid>
      </Grid>
    </>
  );
};
