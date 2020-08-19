const expect = require("expect");
const AbsenceManagerBiz = require("../AbsenceManager.biz");

describe("AbsenceManager biz test", () => {
  test("get a list of absences including the names of the employee", async () => {
    const absensemManager = new AbsenceManagerBiz();
    const result = await absensemManager.getAbsencesList();
    //to check if return is a array or not
    let containArrays = true;
    if (result.length == 0) {
      containArrays = false;
    }
    expect(containArrays).toBeTruthy();
  });

  test("get a list from type", async () => {
    const absensemManager = new AbsenceManagerBiz();
    const result = await absensemManager.getListFromType("sickness");
    //to check if return is a array or not
    let containArrays = true;
    if (result.length == 0) {
      containArrays = false;
    }
    expect(containArrays).toBeTruthy();
  });

  test("get a user details from list", async () => {
    const absensemManager = new AbsenceManagerBiz();
    const result = await absensemManager.getUserFromList("2664");
    //to check if return is a array or not
    let containArrays = true;
    if (result.length == 0) {
      containArrays = false;
    }
    expect(containArrays).toBeTruthy();
  });

  test("get a user details from date range", async () => {
    const absensemManager = new AbsenceManagerBiz();
    const result = await absensemManager.getUserFromDateRange(
      "2017-01-01",
      "2017-02-01"
    );
    //to check if return is a array or not
    let containArrays = true;
    if (result.length == 0) {
      containArrays = false;
    }
    expect(containArrays).toBeTruthy();
  });
});
