import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

export default function ImageDetails() {
  return (
    <Card style={{ height: 445 }}>
      <CardContent>
        <Typography
          sx={{ width: "100%" }}
          align="center"
          variant="h5"
          component="div"
        >
          Imagedetails
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="green iguana"
        align="center"
        sx={{
          maxHeight: "70%",
          maxWidth: "80%",
          margin: "auto",
          objectFit: "contain"
        }}
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Fwww.leroyryser.ch%2Fwp-content%2Fuploads%2F2016%2F09%2F1RYL_5414_2.jpg%3Ffit%3D2463%252C1639%26ssl%3D1&f=1&nofb=1&ipt=0af5b2dfb00889c1edf72e9df706e23b0712903722a2a941891b3b751be16cb4&ipo=images"
      />
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs>
              <Chip
                label={"Height: " + 1}
                sx={{ width: "100%", fontSize: 16, borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs>
              <Chip
                label={"Width: " + 1}
                sx={{ width: "100%", fontSize: 16, borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs>
              <Chip
                label={"Channels: " + 1}
                sx={{ width: "100%", fontSize: 16, borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
