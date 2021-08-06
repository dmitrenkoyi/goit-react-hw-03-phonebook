import styles from './Section.module.scss';

const Section = ({ title, children }) => (
  <section className={styles.Section}>
    <h2>{title}</h2>
    {children}
  </section>
);

export default Section;
