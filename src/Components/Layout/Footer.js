import Card from "../UI/Card";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <section className={classes.footer}>
      <Card>
        <div>Made by Alen Bašić</div>
      </Card>
    </section>
  );
};

export default Footer;
