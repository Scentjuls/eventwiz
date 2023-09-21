import React, {
  useState,
  useEffect,
  ReactElement,
  PropsWithChildren,
} from "react";
import errorImage from "../../assets/error.jpeg";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export const ErrorBoundary = (
  props: PropsWithChildren<ErrorBoundaryProps>
): ReactElement => {
  const { children } = props;
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("error", error);
      setHasError(true);
    };

    // Add an error event listener to the window
    window.addEventListener("error", errorHandler);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="">
        <img src={errorImage} alt="" />
      </div>
    );
  }

  return <>{children}</>;
};
