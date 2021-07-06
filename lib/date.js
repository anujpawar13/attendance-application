
 function getDate(req){
const date = req.body.entered_date;
    const time = req.body.entered_time;
    const day = (Number)(date.substring(8,10));
    const month = (Number)(date.substring(5,7))-1;
    const year = (Number)(date.substring(0, 4));
    const hours = (Number)(time.substring(0,2));
    const min = (Number)(time.substring(3, 5));
  //  console.log("Year = "+ year + " Month = "+month+" Day = "+day+" Hours = "+hours+" Minutes =  "+min);
    const Date_obj = new Date(year, month, day, hours, min);
    return Date_obj;
}
module.exports={
    getDate:getDate
}