import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <h2>Welcome on Board!</h2>
      <br />
      <h2>This is authentication web app</h2>
      <br />
      <h3>When you sign up, you can sign in </h3>
      <br />
      <h3>When you login you can change your password if you want to</h3>
    </section>
  );
};

export default StartingPageContent;
