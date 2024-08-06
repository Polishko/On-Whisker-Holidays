import { render } from "@testing-library/react";
import Spinner from "../../src/components/common/Spinner";
import styles from "../../src/components/common/Spinner.module.css";

describe("Spinner component", () => {
  it("renders without crashing", () => {
    //usually skipped
    const { container } = render(<Spinner />);
    expect(container).toBeInTheDocument();
  });

  it("applies correct class names", () => {
    const { container } = render(<Spinner />);

    const spinnerContainer = container.querySelector(
      `.${styles.spinnerContainer}`
    );
    const spinner = container.querySelector(`.${styles.spinner}`);

    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveClass(styles.spinnerContainer);
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(styles.spinner);
  });
});
