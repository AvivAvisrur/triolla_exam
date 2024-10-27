import { CreateTask } from "../controllers/task.controller";

export const descriptionPriority = ({
  description,
  title,
}: CreateTask): number => {
  const descriptionLength = description.length;
  const titleLength = title.length;

  //description score can be max of 3 , so i devide the score i get from the length by the max score i can get and i multiple it by 0.3 to get 30% of the score.
  let descriptionRatio =
    ((descriptionLength < 10 ? 1 : descriptionLength <= 20 ? 2 : 3) / 3) * 0.3;

  let titleRatio =
    ((titleLength < 5 ? 0.5 : titleLength <= 15 ? 1 : 1.5) / 1.5) * 0.2;


  return titleRatio + descriptionRatio;
};
