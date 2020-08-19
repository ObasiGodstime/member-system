const { InvalidParamException } = require("../exceptions");
const membersModule = require("../api");
const absencesModule = require("../api");
class AbsenceManagerService {
  constructor() {}

 
  getAbsencesList() {
    return new Promise(async (resolve, reject) => {
      try {
        const memberList = await Promise.all([
          membersModule.members(),
          absencesModule.absences(),
        ]);
        memberList[1].forEach((element) => {
          memberList[0].forEach((member) => {
            if (element.userId == member.userId) {
              element.name = member.name;
            }
          });
        });
        resolve(memberList[1]);
      } catch (error) {
        reject(error);
      }
    });
  }

  
  getListFromType(leaveType) {
    return new Promise(async (resolve, reject) => {
      try {
        const memberList = await Promise.all([
          membersModule.members(),
          absencesModule.absences(),
        ]);
        const listType = memberList[1].filter(
          (type) => type.type.toLowerCase() === leaveType
        );
        if (listType.length <= 0) {
          return resolve({ message: "No such Type" });
        }
        listType.forEach((element) => {
          memberList[0].forEach((member) => {
            if (element.userId == member.userId) {
              element.name = member.name;
              const label =
                element.type == "sickness"
                  ? "is sick"
                  : `is on ${element.type}`;
              element.message = `${element.name} ${label}`;
            }
          });
        });
        resolve(listType);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

 
  getUserFromList(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const absencesList = await absencesModule.absences();
        const user = absencesList.filter(
          (type) => type.userId === parseInt(user_id)
        );
        if (user.length <= 0) {
          return resolve({ message: "user id not present in absense list" });
        }

        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

 
  getUserFromDateRange(startDate, endDate) {
    return new Promise(async (resolve, reject) => {
      try {
        const absencesList = await absencesModule.absences();
        const ed = new Date(endDate).getTime();
        const sd = new Date(startDate).getTime();

        const user = absencesList.filter((type) => {
          let time = new Date(type.startDate).getTime();
          return sd < time && time < ed;
        });
        
        if (user.length <= 0) {
          return resolve({ message: "user not present in given date range" });
        }
        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}

module.exports = AbsenceManagerService;
