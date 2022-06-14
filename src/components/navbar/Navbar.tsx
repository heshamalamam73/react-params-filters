import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Flex from "../Flex";
import Spacer from "../Spacer";
import StyledForm from "../StyledForm";
import StyledInput from "../StyledInput";

export const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const links = useMemo(
    () => [
      { url: "/profile", label: "Profile" },
      { url: "/search", label: "Shop" },
      { url: "/cart", label: "Cart" }
    ],
    []
  );

  const navbarLinks = useMemo(
    () =>
      links.map((link) => {
        return (
          <Link style={{ padding: "0px 10px" }} to={link.url}>
            {link.label}
          </Link>
        );
      }),
    [links]
  );

  const [inputValue, setInputValue] = useState<string>("");
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const SearchWithFilterQuery = (e: any) => {
    e.preventDefault();
    if (inputValue) {
      setSearchParams({ filterQuery: inputValue });
    } else {
      setSearchParams({});
    }
  };
  return (
    <Flex style={{ flexDirection: "column" }}>
      <Flex
        style={{
          position: "sticky",
          bottom: "0",
          padding: "10px",
          width: "100%",
          alignItems: "center",
          height: 80
        }}
      >
        <div style={{ flex: 1 }}>
          <span className="logo">Logo</span>
        </div>

        <Flex
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <StyledForm onSubmit={SearchWithFilterQuery} style={{ flex: 1 }}>
            <StyledInput
              style={{ maxWidth: 700 }}
              value={inputValue}
              placeholder="Search"
              onChange={handleChange}
            />
          </StyledForm>
          <Flex style={{ justifyContent: "flex-end" }}>{navbarLinks}</Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
