import uuid from "uuid/v4";

export default map => {
  let id;
  do {
    id = uuid();
  } while (map[id]);
  return id;
};
