import { isAfter, sub } from "date-fns";
import { Task } from "../services/task.service";

export const priorityCalculate = ({
  description,
  title,
  priority,
  id,
}: Task & { id?: string }): Task & { id?: string } => {
  const isWithinLast24Hours = isAfter(
    new Date(),
    sub(new Date(), { hours: 24 })
  );

  console.log(id);

  const descriptionLength = description.length;
  const titleLength = title.length;

  //description score can be max of 3 , so i devide the score i get from the length by the max score i can get and i multiple it by 0.3 to get 30% of the score.
  const descriptionRatio =
    ((descriptionLength < 10 ? 1 : descriptionLength <= 20 ? 2 : 3) / 3) * 0.3;

  //title score can be max of 1.5 , so i devide the score i get from the length by the max score i can get and i multiple it by 0.2 to get 20% of the score.
  const titleRatio =
    ((titleLength < 5 ? 0.5 : titleLength <= 15 ? 1 : 1.5) / 1.5) * 0.2;

  const dateRatio = isWithinLast24Hours ? 0.2 : 0;

  const keyWordsRatio =
    ((description.includes("urgent")
      ? 2
      : description.includes("important")
      ? 1.5
      : description.includes("low-priority")
      ? -1
      : 0) /
      2) *
    0.3;
  priority = descriptionRatio + titleRatio + dateRatio + keyWordsRatio;

  return { id, description, title, priority };
};
