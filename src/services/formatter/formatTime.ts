export default function FormatTime(time: any) {
  const date = new Date(time);
  const dateFormated = date.toLocaleTimeString("id-ID").split(".");
  let dayTime;
  if (parseInt(dateFormated[0]) > 12) {
    dayTime = "PM";
  } else {
    dayTime = "AM";
  }
  return dateFormated.slice(0, 2).join(" : ") + " " + dayTime;
}
