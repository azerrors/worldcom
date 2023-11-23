function Button({ type, style, children, onClick }) {
  const styles = {
    weather: `border p-2.5 ${style} rounded-lg hover:bg-primary_light hover:text-secondary_light hover:dark:text-primary_light hover:dark:bg-primary_dark uppercase font-semibold hover:active:translate-y-2 hover:-translate-y-1 hover:scale-[1.01] tracking-wider cursor-pointer transition-all duration-350 hover:bg-sky-400`,
    position:
      "p-2 rounded-md bg-secondary_light text-primary_light  dark:bg-secondary_dark  hover:active:translate-y-2 hover:-translate-y-1 hover:scale-[1.01] tracking-wider cursor-pointer transition-all duration-350 hover:bg-sky-400  uppercase font-semibold border bg-slate-400 absolute bottom-28 left-[50%] translate-x-[-50%] z-[1000]",
  };
  return (
    <button onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
