const { InvalidParamException } = require("../exceptions");
const AbsenceManagerService = require("../services/AbsenceManager.service");

class AbsenceManagerBiz {
  constructor() {
    this.absenceManagerService = new AbsenceManagerService();
  }

  getAbsencesList() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.absenceManagerService.getAbsencesList();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

   
  getListFromType(type) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.absenceManagerService.getListFromType(type);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

 
  getUserFromList(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.absenceManagerService.getUserFromList(user_id);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  
  getUserFromDateRange(startDate, endDate) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.absenceManagerService.getUserFromDateRange(startDate, endDate);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = AbsenceManagerBiz;
