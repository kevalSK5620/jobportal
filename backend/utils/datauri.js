const getDataUri = (file) => {
  if (!file) return null;
  const dataUri = {
    content: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
    filename: file.originalname
  };
  return dataUri;
};

export default getDataUri;