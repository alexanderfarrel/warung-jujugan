import FormatMonth from "./FormatMonth";

export default function FormatDate(time: any) {
  const date = new Date(time);
  const dateFormated = date.toLocaleDateString("id-ID").split("/");
  dateFormated[1] = FormatMonth(parseInt(dateFormated[1]));
  return dateFormated.join(" - ");
}
