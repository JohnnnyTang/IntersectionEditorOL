import axios from "axios";
import request from "./request";
import { resolveBbox2Array } from "../utils/common";

export default class BackAPI {
  static async request4CrossTable(tableFilter) {
    try {
      const res = await request.get(
        encodeURI(`/proxy/list_tables?filter=${tableFilter}`)
      );
      return res.data;
    } catch (err) {
      console.log("request for cross tables' meta info failed.");
      console.log(err);
      return null;
    }
  }

  static async request4CrossNumber(crossTableList) {
    try {
      const reqests = crossTableList.map((curVal, index, arr) => {
        return request.get(
          `/proxy/query/${curVal.table_name}?columns=count(*)`
        );
      });
      const resList = (await axios.all(reqests)).map((curVal, index, arr) => {
        return curVal.data[0].count;
      });
      //   console.log(resList);
      return resList;
    } catch (err) {
      console.log("request for cross number failed.");
      console.log(err);
      return null;
    }
  }

  static async request4TablesSingleQuery(
    crossTableList,
    tableNameProp,
    queryText,
    paramName
  ) {
    try {
      const reqests = crossTableList.map((curVal, index, arr) => {
        return request.get(
          `/proxy/query/${curVal[tableNameProp]}?columns=${queryText}`
        );
      });
      const resList = (await axios.all(reqests)).map((curVal, index, arr) => {
        return curVal.data[0][paramName];
      });
      //   console.log(resList);
      return resList;
    } catch (err) {
      console.log(`request for ${paramName} failed.`);
      console.log(err);
      return null;
    }
  }

  static async request4SingleTableQueryMultiFilter(
    tableName,
    queryText,
    filterTextList
  ) {
    try {
      const reqests = filterTextList.map((curVal, index, arr) => {
        return request.get(
          `/proxy/query/${tableName}?columns=${
            queryText + " as a"
          }&filter=${curVal}`
        );
      });
      const resList = (await axios.all(reqests)).map((curVal, index, arr) => {
        return curVal.data[0]["a"];
      });
      // console.log(resList);
      return resList;
    } catch (err) {
      console.log(`request for ${queryText} for ${filterTextList} failed.`);
      console.log(err);
      return null;
    }
  }

  static async request4CityDataBbox(tableName, filter = null) {
    try {
      const bboxRes = (
        await request.get(
          `/proxy/bbox/${tableName}?geom_column=geom&srid=4326${
            filter ? "&filter=" + filter : ""
          }`
        )
      ).data[0]["bbox"];
      return resolveBbox2Array(bboxRes);
    } catch (err) {
      console.log(`request bbox for ${tableName} failed.`);
      console.log(err);
      return null;
    }
  }
}
