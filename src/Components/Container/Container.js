import "../../Components/Container/Container.scss";

const Container = (props) => {
  const { children } = props;

  if (!children) {
    return;
  }

  return <div className="container">{children}</div>;
};

export default Container;
