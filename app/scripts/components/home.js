/**
 * This file will hold the Main content that lives in the main body of the site
 *
 */
import React from "react";

const Home = () => {
  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof Home
   */
  return (
    <>
      <section id="home">
        <div className="content">
          <p>This demo is for the searching products.<br/>
          <br/>
            You can search the products in searchbar it will show the live products result. Ex: search "oil" or "ojon" in searchbar<br/>
            <br/>
            If you want to go and see all products of the same name you can press the Enter or click on the "SEE ALL RESULTS."
          </p>

        </div>
      </section>
    </>
  );
};

export default Home;
