import React, { FC, useEffect, useState } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router";
import { Folder } from "@material-ui/icons";

const loadTarget = async (id: string) => {
  return fetch("/api/targets/" + id, {
    method: "GET",
  });
};

type picture = {
  id: number;
  path: string;
};

interface target {
  first_name: string;
  last_name: string;
  id: number;
  pictures: picture[];
}

export const Target: FC = () => {
  const { id }: { id: string } = useParams();
  const [target, setTarget] = useState<target | null>(null);

  useEffect(() => {
    loadTarget(id)
      .then((res) => res.json())
      .then((data) => setTarget(data))
      .catch(console.error);
  }, [id]);

  const listPaths =
    target &&
    target.pictures.map((picture) => (
      <ListItem>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText
          primary={picture.path.split("/").pop()}
          secondary={picture.path}
        />
      </ListItem>
    ));

  const listAttributes =
    target &&
    Object.entries(target)
      .filter(([key, value]) => key !== "pictures")
      .map(([key, value]) => (
        <ListItem>
          <ListItemText>
            <b>{key}</b> {value}
          </ListItemText>
        </ListItem>
      ));

  return (
    <Grid container spacing={5}>
      <Grid item>
        <Paper>
          <List>{listAttributes}</List>
        </Paper>
      </Grid>
      <Grid item>
        <Paper>
          <List>{listPaths}</List>
        </Paper>
      </Grid>
    </Grid>
  );
};
