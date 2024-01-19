import { useEffect, useState } from "react";
import { IMusician } from "../../models/musician/IMusician";
import MusicianService from "../../services/MusicianService";
import { Pie } from "@ant-design/plots";
import Box from "@mui/joy/Box";
import Container from "@mui/joy/Container";
import { typographyClasses } from "@mui/joy/Typography";
import Typography from "@mui/joy/Typography";

interface GenresCount {
  genre: string;
  amount: number;
}

interface RolesCount {
  role: string;
  amount: number;
}

export default function ChartsAbout() {
  const [pieChartData, setPieChartData] = useState<GenresCount[]>([]);
  const [pieChartRoles, setPieChartRoles] = useState<RolesCount[]>([]);

  function calculateGenresCount(musicians: IMusician[]) {
    const genreCounts = musicians.reduce<Record<string, number>>(
      (counts, item) => {
        item.genres.forEach((genre) => {
          counts[genre] = (counts[genre] || 0) + 1;
        });
        return counts;
      },
      {}
    );

    console.log(genreCounts);
    return Object.entries(genreCounts).map(([genre, amount]) => ({
      genre,
      amount,
    }));
  }

  function calculateRolesCount(musicians: IMusician[]) {
    const rolesCountObj = musicians.reduce<Record<string, number>>(
      (counts, musician) => {
        const role = musician.mainRole;

        counts[role] = (counts[role] || 0) + 1;

        return counts;
      },
      {}
    );

    return Object.entries(rolesCountObj).map(([role, amount]) => ({
      role,
      amount,
    }));
  }

  useEffect(() => {
    async function fetchData() {
      const { data } = await MusicianService.getAllMusicians();
      setPieChartData(calculateGenresCount(data));

      setPieChartRoles(calculateRolesCount(data));
    }
    fetchData().catch(console.error);
  }, []);

  const pieChartConfig2 = {
    appendPadding: 0,
    data: pieChartRoles,
    angleField: "amount",
    colorField: "role",
    radius: 0.8,
    style: {
      height: 500,
    },
    legend: true,
  };

  const pieChartConfig = {
    appendPadding: 0,
    data: pieChartData,
    angleField: "amount",
    colorField: "genre",
    radius: 0.8,
    style: {
      height: 500,
    },
    legend: true,
  };

  return (
    <Container
      sx={(theme) => ({
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 20,
        gap: 4,
        [theme.breakpoints.up(834)]: {
          flexDirection: "row",
          gap: 6,
        },
        [theme.breakpoints.up(1199)]: {
          gap: 12,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "50ch",
          textAlign: "center",
          flexShrink: 999,
          [theme.breakpoints.up(834)]: {
            minWidth: 440,
            alignItems: "flex-start",
            textAlign: "initial",
          },
          [`& .${typographyClasses.root}`]: {
            textWrap: "balance",
          },
        })}
      >
        <Pie {...pieChartConfig} />
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          maxWidth: "50ch",
          textAlign: "center",
          flexShrink: 999,
          [theme.breakpoints.up(834)]: {
            minWidth: 440,
            alignItems: "flex-start",
            textAlign: "initial",
          },
          [`& .${typographyClasses.root}`]: {
            textWrap: "balance",
          },
        })}
      >
        <Pie {...pieChartConfig2} />
      </Box>
      <Typography
        level="title-lg"
        sx={{
          position: "absolute",
          top: "6rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <b>Cамые популярные жанры и роли среди музыкантов платформы</b>
      </Typography>
    </Container>
  );
}
