import { MdOutlineWbCloudy } from "react-icons/md";
import { BsFillCloudRainFill, BsFillCloudSnowFill } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";

function WeatherIco({ type }) {
  const iconClass = "text-[10rem] text-stone-300";
  if (type === "Clouds") {
    return (
      <div>
        <MdOutlineWbCloudy className={iconClass} />
      </div>
    );
  }
  if (type === "Rain") {
    return <BsFillCloudRainFill className={iconClass} />;
  }
  if (type === "Sun") {
    return <MdOutlineWbSunny className={iconClass} />;
  }
  if (type === "Clear") {
    return <BsFillMoonFill className={iconClass} />;
  }
}

export default WeatherIco;
