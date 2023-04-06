import { spanish } from "./spanish";
import { russian } from "./russian";

export const dataProvider = {
  data: [],
  initialized: false,
  init: function () {
    this.data["spanish"] = spanish;
    this.data["russian"] = russian;
  },
  getByUid: function (uid) {
    !!!this.initialized && this.init();
    return !!this.data[uid] ? this.data[uid] : {};
  },
};
