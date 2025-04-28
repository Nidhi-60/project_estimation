import moment from "moment";

const parseRequest = (url, filter) => {
  const queryParts = [];

  // if (filter.status?.length > 0) {
  //   queryParts.push(`status=${filter.status.join(",")}`);
  // }

  if (filter?.createdAt) {
    queryParts.push(`createdAt=${moment(new Date()).format("DD-MM-YYYY")}`);
  }

  if (queryParts.length > 0) {
    url += `?${queryParts.join("&")}`;
  }

  return url;
};

export default parseRequest;
