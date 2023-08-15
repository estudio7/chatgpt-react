import React, { useState, useEffect, useCallback } from "react";
import { fetchWithToken } from "../utils/fetchWithToken";
import LinearBuffer from "../components/LinearBuffer";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { NextPage } from "next";
import NavBar from "../components/NavBar";
import StyledButton from "../components/Myprofile";
import { getToken } from "../services/auth";
import CloseIcon from "@mui/icons-material/Close"; // Updated import statement

interface FormData {
  [key: string]: string;
  latestGPA: string;
  latestACT: string;
  latestSAT: string;
  colleges: string;
  apClasses: string;
  ap_classes_list: string;
  extracurriculars: string;
  interestedIndustries: string;
  financialContribution: string;
}

const Profile: NextPage = () => {
  const token = getToken();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    latestGPA: "",
    latestACT: "",
    latestSAT: "",
    colleges: "",
    apClasses: "",
    ap_classes_list: "",
    extracurriculars: "",
    interestedIndustries: "",
    financialContribution: "",
  });

  const removeItem = useCallback(
    (fieldName: string, index: number) => {
      const fieldData = formData[fieldName as keyof FormData]
        .split(",")
        .map((item) => item.trim());
      fieldData.splice(index, 1);
      setFormData({
        ...formData,
        [fieldName]: fieldData.join(", "),
      });
    },
    [formData]
  );

  const getUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/getUserInfo`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setFormData({
        latestGPA: data.gpa_score !== null ? data.gpa_score.toString() : "",
        latestACT: data.act_score !== null ? data.act_score.toString() : "",
        latestSAT: data.sat_score !== null ? data.sat_score.toString() : "",
        colleges: data.university !== null ? data.university : "",
        apClasses: data.ap_classes !== null ? data.ap_classes.toString() : "",
        ap_classes_list:
          data.ap_classes_list !== null ? data.ap_classes_list.toString() : "",
        extracurriculars: data.ext_act !== null ? data.ext_act : "",
        interestedIndustries: data.carrer !== null ? data.carrer : "",
        financialContribution: data.f_contri !== null ? data.f_contri : "",
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user info:", error);
      setIsLoading(false);
    }
  }, [token]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/updateUserInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      // Handle response if needed

      setIsLoading(false);
    } catch (error) {
      console.error("Error updating user info:", error);
      setIsLoading(false);
    }
  }, [formData, token]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <NavBar progress={1}>
      {isLoading ? (
        <LinearBuffer />
      ) : (
        <Container>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              style={{ paddingTop: "50px", paddingBottom: "50px" }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#190755",
                  }}
                >
                  My Profile
                </Typography>
              </Box>
              <Typography
                variant="h2"
                style={{
                  color: "var(--kaplan-deep-purle, #190755)",
                  fontFamily: "Open Sans",
                  fontSize: "1.2rem",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "1.2rem" /* 0.825rem */,
                }}
              >
                This is your personalized profile page. You can always update
                your information here, or add additional facts about yourself
                that you’d like me to remember. The more information you give
                me, the better I can get to know you and provide you with the
                most personalized experience possible. I’m always happy to hear
                from you.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                component="h2"
                style={{
                  color: "#211069",
                  fontFamily: "Open Sans",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "160%" /* 1.4rem */,
                }}
              >
                Latest GPA
              </Typography>
              <TextField
                variant="outlined"
                value={formData.latestGPA}
                onChange={(e) =>
                  setFormData({ ...formData, latestGPA: e.target.value })
                }
                InputProps={{
                  style: {
                    borderRadius: "3.125rem",
                    border: "1px solid var(--kaplan-deep-purle, #190755)",
                    textDecoration: "none",
                    width: "60px",
                  },
                  inputProps: {
                    // Use 'inputProps' instead of '& input'
                    style: {
                      padding: "5px 10px",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h2"
                style={{
                  color: "#211069",
                  fontFamily: "Open Sans",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "160%" /* 1.4rem */,
                }}
              >
                Latest ACT
              </Typography>
              <TextField
                variant="outlined"
                value={formData.latestACT}
                onChange={(e) =>
                  setFormData({ ...formData, latestACT: e.target.value })
                }
                InputProps={{
                  style: {
                    borderRadius: "3.125rem",
                    border: "1px solid var(--kaplan-deep-purle, #190755)",
                    textDecoration: "none",
                    width: "60px",
                  },
                  inputProps: {
                    // Use 'inputProps' instead of '& input'
                    style: {
                      padding: "5px 10px",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h2"
                style={{
                  color: "#211069",
                  fontFamily: "Open Sans",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "160%" /* 1.4rem */,
                }}
              >
                Latest SAT
              </Typography>
              <TextField
                variant="outlined"
                value={formData.latestSAT}
                onChange={(e) =>
                  setFormData({ ...formData, latestSAT: e.target.value })
                }
                InputProps={{
                  style: {
                    borderRadius: "3.125rem",
                    border: "1px solid var(--kaplan-deep-purle, #190755)",
                    textDecoration: "none",
                    width: "60px",
                  },
                  inputProps: {
                    // Use 'inputProps' instead of '& input'
                    style: {
                      padding: "5px 10px",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h2"
                style={{
                  color: "#211069",
                  fontFamily: "Open Sans",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "160%",
                }}
              >
                Colleges I am considering to apply
              </Typography>
              {formData.colleges.split(",").map((college, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: "3.125rem",
                    border: "1px solid var(--kaplan-deep-purle, #190755)",
                    background: "var(--kaplan-deep-purle, #190755)",
                    color: "#FFF",
                    padding: "0px 10px",
                    margin: "5px",
                    display: "inline-block",
                  }}
                >
                  {college.trim()}
                  <IconButton
                    size="small"
                    onClick={() => removeItem("colleges", index)}
                    style={{ marginLeft: "5px" }}
                  >
                    <CloseIcon style={{ color: "#FFF" }} />
                  </IconButton>
                </div>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h2"
                style={{
                  color: "#211069",
                  fontFamily: "Open Sans",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "160%",
                }}
              >
                AP Classes I am taking
              </Typography>
              {formData.ap_classes_list.split(",").map((apClass, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: "3.125rem",
                    border: "1px solid var(--kaplan-deep-purle, #190755)",
                    background: "var(--kaplan-deep-purle, #190755)",
                    color: "#FFF",
                    padding: "0px 10px",
                    margin: "5px",
                    display: "inline-block",
                  }}
                >
                  {apClass.trim()}
                  <IconButton
                    size="small"
                    onClick={() => removeItem("ap_classes_list", index)}
                    style={{ marginLeft: "5px" }}
                  >
                    <CloseIcon style={{ color: "#FFF" }} />
                  </IconButton>
                </div>
              ))}
            </Grid>

            <Grid item xs={12}>
              <Typography
                component="h2"
                style={{
                  color: "#211069",
                  fontFamily: "Open Sans",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "160%",
                }}
              >
                Extracurriculars
              </Typography>
              {formData.extracurriculars
                .split(",")
                .map((extracurricular, index) => (
                  <div
                    key={index}
                    style={{
                      borderRadius: "3.125rem",
                      border: "1px solid var(--kaplan-deep-purle, #190755)",
                      background: "var(--kaplan-deep-purle, #190755)",
                      color: "#FFF",
                      padding: "0px 10px",
                      margin: "5px",
                      display: "inline-block",
                    }}
                  >
                    {extracurricular.trim()}
                    <IconButton
                      size="small"
                      onClick={() => removeItem("extracurricular", index)}
                      style={{ marginLeft: "5px" }}
                    >
                      <CloseIcon style={{ color: "#FFF" }} />
                    </IconButton>
                  </div>
                ))}
            </Grid>

            <Grid item xs={12}>
              <Typography
                component="h2"
                style={{
                  color: "#211069",
                  fontFamily: "Open Sans",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "160%",
                }}
              >
                Interested Industries
              </Typography>
              {formData.interestedIndustries
                .split(",")
                .map((industry, index) => (
                  <div
                    key={index}
                    style={{
                      borderRadius: "3.125rem",
                      border: "1px solid var(--kaplan-deep-purle, #190755)",
                      background: "var(--kaplan-deep-purle, #190755)",
                      color: "#FFF",
                      padding: "0px 10px",
                      margin: "5px",
                      display: "inline-block",
                    }}
                  >
                    {industry.trim()}
                    <IconButton
                      size="small"
                      onClick={() => removeItem("industry", index)}
                      style={{ marginLeft: "5px" }}
                    >
                      <CloseIcon style={{ color: "#FFF" }} />
                    </IconButton>
                  </div>
                ))}
            </Grid>

            <Grid item xs={12}>
              <Typography
                component="h2"
                style={{
                  color: "#211069",
                  fontFamily: "Open Sans",
                  fontSize: "0.875rem",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "160%",
                }}
              >
                Financial Contribution Level
              </Typography>
              <div
                style={{
                  borderRadius: "3.125rem",
                  border: "1px solid var(--kaplan-deep-purle, #190755)",
                  background: "var(--kaplan-deep-purle, #190755)",
                  color: "#FFF",
                  padding: "5px 10px",
                  margin: "5px",
                  display: "inline-block",
                }}
              >
                {formData.financialContribution}
              </div>
            </Grid>
            <Grid item xs={12}>
              <StyledButton text="Update Profile" onClick={handleSubmit} />
            </Grid>
          </Grid>
        </Container>
      )}
    </NavBar>
  );
};

export default Profile;
