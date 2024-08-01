// import React, { useEffect, useState } from "react";

// const SearchBox = ({data, onSearch}) => {
//     const [searchValue, setSearchValue] = useState("");

//     useEffect(() => {
//         if (onSearch) {
//             onSearch(searchValue);
//       }
//   }, [searchValue, onsubmit])

//   return (
//     <div>
//       <input
//         className="border-2 border-gray-600 rounded h-10"
//         type="text"
//         onChange={(e) => setSearchValue(e.target.value)}
//         value={searchValue}
//         placeholder="Search by name"
//       />
//     </div>
//   );
// };

// export default SearchBox;

import React, { useEffect, useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (onSearch) {
      onSearch(searchValue);
    }
  }, [searchValue, onSearch]);

  return (
    <div>
      <input
        className="border-2 border-gray-600 rounded h-10"
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        placeholder="Search by name"
      />
    </div>
  );
};

export default SearchBox;
