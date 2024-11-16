import React from "react";
import styles from "./style.module.css";
import articleImg from "../../assets/images/articles.webp";
import userImg from "../../assets/images/profile.png";
import SvgIcon from "../SvgIcon/SvgIcon";
import TextHead from "../TextHead/TextHead";

const ArticleItem = () => {
  return (
    <article className={styles.article}>
      <div className={styles.articleHead}>
        <img src={articleImg} alt="article" />
        <div className={styles.articleMesTime}>
          <div className={styles.articleIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M6.9 18C8.80858 18.9791 11.0041 19.2443 13.0909 18.7478C15.1777 18.2514 17.0186 17.0259 18.2818 15.2922C19.545 13.5586 20.1474 11.4308 19.9806 9.29221C19.8137 7.15366 18.8886 5.14502 17.3718 3.62824C15.855 2.11146 13.8464 1.1863 11.7078 1.01946C9.56929 0.852628 7.44147 1.45509 5.70782 2.71829C3.97417 3.98149 2.74869 5.82236 2.25222 7.90916C1.75575 9.99596 2.02094 12.1915 3 14.1L1 20L6.9 18Z"
                stroke="#D9D9D9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
            0
          </div>
          <div className={styles.articleIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2ZM10 4C10.2449 4.00003 10.4813 4.08996 10.6644 4.25272C10.8474 4.41547 10.9643 4.63975 10.993 4.883L11 5V9.586L13.707 12.293C13.8863 12.473 13.9905 12.7144 13.9982 12.9684C14.006 13.2223 13.9168 13.4697 13.7488 13.6603C13.5807 13.8508 13.3464 13.9703 13.0935 13.9944C12.8406 14.0185 12.588 13.9454 12.387 13.79L12.293 13.707L9.293 10.707C9.13758 10.5514 9.03776 10.349 9.009 10.131L9 10V5C9 4.73478 9.10536 4.48043 9.29289 4.29289C9.48043 4.10536 9.73478 4 10 4Z"
                fill="#D9D9D9"
              />
            </svg>{" "}
            4 min
          </div>
        </div>
      </div>
      <div className={styles.articleBody}>
        <h2>ARTICLE, REVIEWS</h2>
        <p>Best Mystery & Thriller series 2023.</p>
      </div>
      <div className={styles.articleFooter}>
        <h3>Mysteries, and dark atmosphere - here they are, genre gems!</h3>
        <div className={styles.articleNav}>
          <div className={styles.articleUser}>
            <img src={userImg} alt="user" />
            <div>
              <h6>Ralph Finger</h6>
              <p>March 4, 2024</p>
            </div>
          </div>
          <button>Read More</button>
        </div>
      </div>
    </article>
  );
};

const ArticleBox = () => {
  return (
    <section className="mainn-container">
      {/* <TextHead desc="Articles" btnName="SEE ALL" btnUrl="#"/> */}
        <div className={styles.articles}>
        <p style={{color: "#f5f5f5", fontSize: 'var(--m-size)', fontFamily: 'var(--font-family)'}}>Articles</p>
          {/* <span>SEE ALL</span> */}
        </div>
      <div className={styles.articleWrap}>
        {[...Array(3)].map((_) => {
          return <ArticleItem />;
        })}
      </div>
    </section>
  );
};

export default ArticleBox;