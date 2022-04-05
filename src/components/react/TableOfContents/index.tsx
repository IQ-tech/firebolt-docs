import useTableOfContents from "./hook";

const TableOfContents = ({ headers = [] }) => {
  const { activeId } = useTableOfContents();
  return (
    <div>
      <h2 className="heading">On this page</h2>
      <ul>
        <li
          className={`header-link depth-2 ${
            activeId === "overview" ? "active" : ""
          }`.trim()}
        >
          <a href="#overview">Overview</a>
        </li>
        {headers
          .filter(({ depth }) => depth > 1 && depth < 4)
          .map((header) => (
            <li
              key={`${header.slug}-item`}
              className={`header-link depth-${header.depth} ${
                activeId === header.slug ? "active" : ""
              }`.trim()}
            >
              <a href={`#${header.slug}`}>{header.text}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
