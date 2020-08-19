const { InvalidParamException } = require("../exceptions");
const ical = require('ical-generator');
const AbsenceManagerBiz = require("../biz/AbsenceManager.biz");
const moment = require('moment')

const cal = ical({domain: 'github.com', name: 'my first iCal'});

class AbsenceManagerController {
  register(app) {
    app.route("/").get(async (req, res, next) => {
      if(!req.query.userId && !req.query.startDate && !req.query.endDate){
      try {
        // overwrite domain
        cal.domain('sebbo.net');
        const absenceManagerBiz = new AbsenceManagerBiz();
        const result = await absenceManagerBiz.getAbsencesList();
        cal.createEvent({
            start: moment(),
            end: moment().add(1, 'hour'),
            summary: 'iCal File for Clients',
            description: JSON.stringify(result),
            location: 'CrewMeister',
        });
        cal.serve(res);
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error,
        });
      }
    }else{
      next();
    }
    });
    app.route("/").get(async (req, res, next) => {
      if(req.query.userId){
        try {
          const { userId } = req.query;
          if (!userId) throw new InvalidParamException("user_id");
  
          const absenceManagerBiz = new AbsenceManagerBiz();
          const result = await absenceManagerBiz.getUserFromList(userId);
  
          return res.status(200).json({
            success: true,
            payload: result,
            message: "User Details Fetched",
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error,
          });
        }
      }else{
        next()
      }
    });
    
    app.route("/").get(async (req, res, next) => {
      try {
        const { startDate, endDate } = req.query;
        if (!startDate) throw new InvalidParamException("startDate");
        if (!endDate) throw new InvalidParamException("endDate");

        const absenceManagerBiz = new AbsenceManagerBiz();
        const result = await absenceManagerBiz.getUserFromDateRange(
          startDate,
          endDate
        );

        return res.status(200).json({
          success: true,
          payload: result,
          message: "Date Fetched",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error,
        });
      }
    });
  }
}

module.exports = AbsenceManagerController;