function Message({ children, type }) {
  const style = {
    primary: "text-center text-primary_light  mt-48 text-3xl uppercase tracking-widest",
    secondary: "text-center pt-10 text-primary_light text-3xl uppercase tracking-widest",
  };
  return <div className={style[type]}>{children}</div>;
}

export default Message;
