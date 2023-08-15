// src/components/onboarding/components/MainContent.tsx
import { Container, Box } from "@mui/material";
import styles from "../../../styles/Main.module.css";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import Sidebar from "../../Sidebar";

const MainContent = () => {
  return (
    <Container className="styled-container" maxWidth={false}>
      <Box justifyContent="left">
        <div className={styles.mainContent}>
          <p className={styles.paragraph}>Keep it Up!</p>
          <p className={styles.paragraph}>
            Check back on your plan at any time, we’re constantly updating it
            with current information, news on your colleges and recommendations
            on admissions, timing and other tips you’ll find useful.
          </p>
          <p className={styles.paragraph}>
            Also feel free to chat at any time about your journey by just
            continuing our discussion below.
          </p>

          <div
            className={`${styles.buttonGroup} ${styles.alignLeft} ${styles.hidden}`}
          >
            {" "}
            {/* Add .hidden class */}
            <button className={styles.secondaryButton}>
              <Link href="/myplan">Check out My Plan!</Link>
            </button>
            <button className={styles.secondaryButton}>
              <Link href="/questionday">Question of the day!</Link>
            </button>
            <button className={styles.secondaryButton}>
              <Link href="/colleges">Search Colleges</Link>
            </button>
          </div>
          <div className={styles.inputGroup}>
            <EmojiPeopleIcon
              className={styles.icon}
              style={{ color: "#190755" }}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Chat with KapAdvisor "
              style={{
                color: "#190755",
                fontSize: "1.25rem",
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 400,
              }}
            />
            <NavigateNextIcon
              className={styles.icon}
              style={{ color: "#190755" }}
            />
          </div>
        </div>
      </Box>
      <Sidebar />
    </Container>
  );
};

export default MainContent;
