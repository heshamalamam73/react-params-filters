import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetchData from "../shared/useFetchData";
import { filters } from "../shared/seedDB";
import Flex from "../components/Flex";
import Item from "./Item";
type MainContainerProps = {
  sidebar: React.ReactNode | React.ReactNode[];
  children: React.ReactNode | React.ReactNode[];
};

const MainContainer: React.FC<MainContainerProps> = ({ sidebar, children }) => {
  const renderSidebar = useMemo(
    () =>
      sidebar ? (
        <div style={{ width: 300, borderRight: "1px solid #eee" }}>
          {sidebar}
        </div>
      ) : null,
    [sidebar]
  );

  return (
    <Flex
      style={{
        width: "100vw",
        maxWidth: "100%",
        maxHeight: "100%",
        height: "100vh",

        position: "fixed",
        overflow: "hidden"
      }}
    >
      {renderSidebar}
      {children}
    </Flex>
  );
};
const Products = () => {
  const [page, setPage] = useState<number>(1);

  const { execute, loading, hasMore, error, books, success } = useFetchData();

  const [searchParams, setSearchParams] = useSearchParams();
  const filterQuery = searchParams.get("filterQuery");
  useEffect(() => {
    execute(page, filterQuery);
  }, [filterQuery, page, execute]);

  const clearFilter = (key: string) => () => {};
  const renderSidebar = useMemo(() => {
    return filters?.length
      ? filters.map((filter) => {
          return (
            <div style={{ margin: "10px" }}>
              <Flex
                style={{
                  justifyContent: "space-between",
                  marginBottom: "10px"
                }}
              >
                <span style={{ fontWeight: "bold" }}>{filter.name}</span>
                <span onClick={clearFilter(filter.name)}>clear</span>
              </Flex>
              {filter.type === "checkbox" ? (
                filter.options.map((option) => (
                  <div onClick={() => setSearchParams({ size: option })}>
                    <input
                      type="checkbox"
                      checked={searchParams.get("size") === option}
                    />
                    <span style={{ paddingLeft: 10 }}>{option}</span>
                  </div>
                ))
              ) : filter.type === "colorBox" ? (
                <Flex style={{ flexWrap: "wrap" }}>
                  {filter.options.map((option) => (
                    <div
                      style={{
                        marginRight: "5px",
                        width: "25px",
                        height: "25px",
                        marginBottom: "5px",
                        borderRadius: "5px",
                        border: "1px solid #737373",
                        backgroundColor: option
                      }}
                    ></div>
                  ))}
                </Flex>
              ) : filter.type === "select" ? (
                <div>
                  <select
                    onChange={(e) => setSearchParams({ marka: e.target.value })}
                    style={{ width: "100%", padding: "5px" }}
                  >
                    {filter.options.map((option) => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ) : filter.type === "range" ? (
                <div>
                  <input
                    type="range"
                    defaultValue="40"
                    min={filter?.options[0]}
                    max={filter?.options[1]}
                    onChange={(e) => setSearchParams({ price: e.target.value })}
                  />
                </div>
              ) : null}
            </div>
          );
        })
      : null;
  }, [filters, searchParams]);
  return (
    <MainContainer sidebar={renderSidebar}>
      <Flex
        style={{
          maxWidth: "100%",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          flexShrink: 0,
          margin: "auto"
        }}
      >
        <div
          style={{
            position: "absolute",
            flexWrap: "wrap",
            width: "100%",
            height: "100%",
            display: "flex",
            overflow: "auto",
            flexShrink: 0,
            justifyContent: "center"
          }}
        >
          {loading ? (
            <div>loading .....</div>
          ) : (
            books?.map((item) => (
              <Item
                title={item.title}
                img={item.thumbnailUrl}
                id={item.title}
              />
            ))
          )}
        </div>
      </Flex>
    </MainContainer>
  );
};
export default Products;
