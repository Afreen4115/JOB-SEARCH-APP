import DataURIParser from "datauri/parser.js";
import path from "path";

const getBuffer = (file: any) => {
  const parser = new DataURIParser();

  if (!file || !file.originalname || !file.buffer) {
    throw new Error("Invalid file object received");
  }

  const extName = path.extname(file.originalname);

  return parser.format(extName, file.buffer);
};

export default getBuffer;
