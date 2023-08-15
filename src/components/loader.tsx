//src/components/loader.tsx
import React from "react";
import styles from "../styles/Main.module.css";

const BouncingDotsLoader = () => {
  return (
    <>
      <div className={`${styles["bouncing-loader"]} ${styles["styled-card"]}`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default BouncingDotsLoader;
