const PreviewItem = ({ podcast }) => {
  const { image, title, author } = podcast;
  const [mainTitle] = title.split("-"); // Obtiene el título principal del podcast

  return (
    <li className="w-64 h-fit flex flex-col justify-end gap-2 items-center shadow-md relative rounded-md pb-4">
      <div className="bg-brown h-fit w-fit rounded-full relative transform translate-y-[-50%] mb-[-30%] overflow-hidden">
        {/* Renderiza la imagen del podcast */}
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={`${mainTitle} cover by ${author}`}
          title={`${mainTitle} cover by ${author}`}
        />
      </div>

      {/* Renderiza el título principal del podcast */}
      <h2 className="text-uppercase font-bold text-center w-4/5 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {mainTitle}
      </h2>

      {/* Renderiza el autor del podcast */}
      <p className="text-gray-500 font-semibold text-center w-1/2 overflow-hidden whitespace-nowrap overflow-ellipsis">
        Author: {author}
      </p>
    </li>
  );
};

export default PreviewItem;
